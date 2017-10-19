---
title: Postgresql-FuzzyMatching
date: 2017-05-17 11:37:08
categories: Postgresql
tags: 
    - postgresql
    - index
---

# 场景 `lower(name) like 'pf%'`


```sql
create table users (id int primary key, name varchar(255));

Create or replace function random_string(length integer) returns text as
$$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language plpgsql;

insert into users values(generate_series(1,50000), random_string(15));
```

## 普通bt：不走索引
>pg_trgm模块提供函数和操作符测定字母数字文本基于三元模型匹配的相似性，还有支持快速搜索相似字符串的索引操作符类。三元模型是一组从一个字符串中获得的三个连续的字符。我们可以通过计数两个字符串共享的三元模型的数量来测量它们的相似性。这个简单的想法证明在测量许多自然语言词汇的相似性时是非常有效的。


```
CREATE INDEX users_idx0 ON users (name);
```

## 全字匹配查询**（走索引）**
```
explain select * from users where name='pfDNQVmhqDrF1EY';
                               QUERY PLAN
-------------------------------------------------------------------------
 Index Scan using users_idx0 on users  (cost=0.29..8.31 rows=1 width=20)
   Index Cond: ((name)::text = 'pfDNQVmhqDrF1EY'::text)
(2 rows)
```

## 加函数全字匹配**（不走索引）**
```
explain select * from users where lower(name)='pfDNQVmhqDrF1EY';
                        QUERY PLAN
-----------------------------------------------------------
 Seq Scan on users  (cost=0.00..1069.00 rows=250 width=20)
   Filter: (lower((name)::text) = 'pfDNQVmhqDrF1EY'::text)
(2 rows)
```

## 模糊匹配**（不走索引）**
```
explain select * from users where name like 'pf%';
                       QUERY PLAN
--------------------------------------------------------
 Seq Scan on users  (cost=0.00..944.00 rows=5 width=20)
   Filter: ((name)::text ~~ 'pf%'::text)
```
```
explain select * from users where name like 'pf_';
                       QUERY PLAN
--------------------------------------------------------
 Seq Scan on users  (cost=0.00..944.00 rows=5 width=20)
   Filter: ((name)::text ~~ 'pf_'::text)
```

##  字段带函数的bt索引：函数走索引
```
drop index users_idx0;
CREATE INDEX users_dex1 ON users (lower(name));
```

## 加函数全字匹配**（走索引）**
```
explain select * from users where lower(name)='pfDNQVmhqDrF1EY';
                                QUERY PLAN
---------------------------------------------------------------------------
 Bitmap Heap Scan on users  (cost=6.23..324.34 rows=250 width=20)
   Recheck Cond: (lower((name)::text) = 'pfDNQVmhqDrF1EY'::text)
   ->  Bitmap Index Scan on users_dex1  (cost=0.00..6.17 rows=250 width=0)
         Index Cond: (lower((name)::text) = 'pfDNQVmhqDrF1EY'::text)
(4 rows)

```

## 模糊匹配**（不走索引）**
```
explain select * from users where lower(name) like 'pf%';
                        QUERY PLAN
-----------------------------------------------------------
 Seq Scan on users  (cost=0.00..1069.00 rows=250 width=20)
   Filter: (lower((name)::text) ~~ 'pf%'::text)
(2 rows)
```

## 声明操作符类的bt索引：like走索引
> 定义索引的同时可以为索引的每个字段声明一个操作符类。 
> CREATE INDEX name ON table (column opclass [sort options] [, ...]);
> 这个操作符类指明该索引用于该字段时要使用的操作符。
```
CREATE INDEX users_dex2 ON users (lower(name) varchar_pattern_ops);
```

## 模糊匹配**（走索引）**
```
explain select * from users where lower(name) like 'pf%';
                                              QUERY PLAN
------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on users  (cost=4.82..144.00 rows=5 width=20)
   Filter: (lower((name)::text) ~~ 'pf%'::text)
   ->  Bitmap Index Scan on users_dex2  (cost=0.00..4.82 rows=53 width=0)
         Index Cond: ((lower((name)::text) ~>=~ 'pf'::text) AND (lower((name)::text) ~<~ 'pg'::text))
(4 rows)
```

# 场景2 `name like '%pf%'`

```sql
Create or replace function random_string(length integer) returns text as
$$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language plpgsql;

create table users (id int primary key, name varchar(255));

insert into users values(generate_series(1,50000), random_string(15));
```



##  声明操作符bt：不走索引
```
CREATE INDEX idx_name ON users USING btree (lower(name) varchar_pattern_ops);
```

```
explain (analyze true,format yaml, verbose true, buffers true) select * from users where lower(name) like '%pf%';\
                        QUERY PLAN
-----------------------------------------------------------
 - Plan:                                                  +
     Node Type: "Seq Scan"                                +
     Parallel Aware: false                                +
     Relation Name: "users"                               +
     Schema: "public"                                     +
     Alias: "users"                                       +
     Startup Cost: 0.00                                   +
     Total Cost: 1069.00                                  +
     Plan Rows: 5                                         +
     Plan Width: 20                                       +
     Actual Startup Time: 0.320                           +
     Actual Total Time: 86.841                            +
     Actual Rows: 710                                     +
     Actual Loops: 1                                      +
     Output:                                              +
       - "id"                                             +
       - "name"                                           +
     Filter: "(lower((users.name)::text) ~~ '%pf%'::text)"+
     Rows Removed by Filter: 49290                        +
     Shared Hit Blocks: 319                               +
     Shared Read Blocks: 0                                +
     Shared Dirtied Blocks: 0                             +
     Shared Written Blocks: 0                             +
     Local Hit Blocks: 0                                  +
     Local Read Blocks: 0                                 +
     Local Dirtied Blocks: 0                              +
     Local Written Blocks: 0                              +
     Temp Read Blocks: 0                                  +
     Temp Written Blocks: 0                               +
   Planning Time: 0.188                                   +
   Triggers:                                              +
   Execution Time: 86.975
```


## 声明pg_trgm操作符bt：可以走索引
```
CREATE EXTENSION pg_trgm;

CREATE INDEX idx_users_name_trgm_gist ON users USING gist (name gist_trgm_ops);

```

```
explain (analyze true, verbose true, buffers true) select * from users where name like '%pf%';
                                                                QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on public.users  (cost=32.19..371.08 rows=505 width=20) (actual time=19.314..53.132 rows=193 loops=1)
   Output: id, name
   Recheck Cond: ((users.name)::text ~~ '%pf%'::text)
   Rows Removed by Index Recheck: 49807
   Heap Blocks: exact=319
   Buffers: shared hit=972
   ->  Bitmap Index Scan on idx_users_name_trgm_gist  (cost=0.00..32.06 rows=505 width=0) (actual time=19.175..19.175 rows=50000 loops=1)
         Index Cond: ((users.name)::text ~~ '%pf%'::text)
         Buffers: shared hit=653
 Planning time: 0.188 ms
 Execution time: 53.231 ms
(11 rows)

```


