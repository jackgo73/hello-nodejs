---
title: Oracle-Trace
date: 2017-11-01 11:22:10
categories:
tags:
---

# Oracle诊断案例 Sql_trace

## 1 检查并跟踪数据库进程

查询v$session视图,获取进程信息

```
SQL> select sid,serial#,username from v$session;

       SID    SERIAL# USERNAME
---------- ---------- ------------------------------
        18      19671 SCOTT
        20      43315 SYS
       247       5642 SYSTEM
```

## 2 启用相关进程sql_trace

```sql
SQL> exec dbms_system.set_sql_trace_in_session(18,19671,true);

PL/SQL procedure successfully completed.
```

如果使用其他用户执行，需要先授权

```sql
-- as SYS
grant execute on dbms_system to USER_NAME;
-- as USER_NAME, create a synonym: 
CREATE SYNONYM DBMS_SYSTEM FOR SYS.DBMS_SYSTEM;
```

## 3 等候一段时间,关闭sql_trace

```
SQL> exec dbms_system.set_sql_trace_in_session(18,19671,false);

PL/SQL procedure successfully completed.
```

## 4 根据spid找到trace文件

```
SQL> select s.sid,s.serial#,s.username,p.spid from v$session s,v$process p where s.paddr=p.ADDR;

       SID    SERIAL# USERNAME                       SPID
---------- ---------- ------------------------------ ------------------------
       247       5642 SYSTEM                         17527
        18      19671 SCOTT                          17948
        20      43315 SYS                            18925
```

## 5 使用tkproc分析trace文件

```
cd /u01/app/oracle/diag/rdbms/orcl/orcl/trace

ll | grep 17948
-rw-r-----. 1 oracle oinstall  620282 Oct 31 23:23 orcl_ora_17948.trc
-rw-r-----. 1 oracle oinstall    7654 Oct 31 23:23 orcl_ora_17948.trm

tkprof orcl_ora_17948.trc orcl_ora_17948.txt aggregate=yes sys=no waits=yes sort=fchela

TKPROF: Release 12.1.0.2.0 - Development on Tue Oct 31 23:39:29 2017
```

或使用sql developer直接打开trc文件，推荐。

![](/images/2017-11-01-Oracle-Trace-0.jpg)