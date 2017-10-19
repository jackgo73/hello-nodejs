---
title: 源码安装Mysql
date: 2017-09-11 13:02:15
categories: Mysql
tags: 
    - mysql
    - deploy
    - centos
---

# 引言

本指南介绍如何在 CentOS 7.1（64 位）上源码安装Mysql5.7.19。

## 参考系统
```
[root@centos7 ~]# hostnamectl
   Static hostname: centos7.example.com
         Icon name: computer
           Chassis: n/a
        Machine ID: 583b4d69eaea465ea4bb96ac3b891e15
           Boot ID: 931ed1af622046ebbde071a87844a7d5
    Virtualization: kvm
  Operating System: CentOS Linux 7 (Core)
       CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-229.11.1.el7.x86_64
      Architecture: x86_64
```
## 先决条件

成功安装操作系统后，请确认主机名称并在你的 DNS 上登记它。你也可选择在 /etc/hosts 内加入你的 IP 主机名。
```
[root@centos7 ~]# cat /etc/hostname
centos7.example.com
```
启用防火墙
```
[root@centos7 ~]# firewall-cmd --state
running
```
把 CentOS 系统更新至最新组件，安装依赖包
```
yum update -y
yum -y install gcc gcc-c++ ncurses ncurses-devel cmake
```
下载mysql-5.7.19.tar.gz版本
```
cd /root/
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.19.tar.gz
```
下载 Boost_1_59_0.tar.gz
```
cd /root/
wget https://ncu.dl.sourceforge.net/project/boost/boost/1.59.0/boost_1_59_0.tar.gz
tar xzvf boost_1_59_0.tar.gz
```
## 安装步骤

添加禁止登陆的mysql用户，创建安装目录
```
[root@centos7 ~]# groupadd -r mysql && useradd -r -g mysql -s /bin/false -M mysql
[root@centos7 ~]# mkdir -p /opt/mysql/app
[root@centos7 ~]# mkdir -p /opt/mysql/data
```
预编译Mysql（debug版）
```
[root@centos7 ~]# tar zxvf mysql-5.7.19.tar.gz
cd mysql-5.7.19
mkdir bld
cd bld
cmake .. -DCMAKE_INSTALL_PREFIX=/opt/mysql/app \
-DMYSQL_DATADIR=/opt/mysql/data \
-DCMAKE_BUILD_TYPE=Debug \
-DSYSCONFDIR=/etc \
-DWITH_BOOST=/root/boost_1_59_0 \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_PARTITION_STORAGE_ENGINE=1 \
-DWITH_FEDERATED_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_MYISAM_STORAGE_ENGINE=1 \
-DENABLED_LOCAL_INFILE=1 \
-DENABLE_DTRACE=0 \
-DDEFAULT_CHARSET=utf8mb4 \
-DDEFAULT_COLLATION=utf8mb4_general_ci \
-DWITH_EMBEDDED_SERVER=OFF
```
编译安装
```
[root@centos7 ~]# make -j `grep processor /proc/cpuinfo | wc -l` 
[root@centos7 ~]# make install
```
设置权限并初始化 MySQL 系统授权表
```
[root@centos7 ~]# cd /opt/mysql/
chown -R mysql:mysql .
mkdir temp
chmod 777 ./temp
./app/bin/mysqld --initialize-insecure --user=mysql --basedir=/opt/mysql/app --datadir=/opt/mysql/data
```
4. 安装后的任务
4.1.创建配置文件
```
[root@centos7 ~]# cat > /etc/my.cnf << EOF
[client]    
port=3306    
socket=/opt/mysql/temp/mysql.sock    
[mysqld]    
character-set-server=utf8    
collation-server=utf8_general_ci
skip-external-locking   
skip-name-resolve
user=mysql   
port=3306    
basedir=/opt/mysql/app    
datadir=/opt/mysql/data   
tmpdir=/opt/mysql/temp    
# server_id = .....    
socket=/opt/mysql/temp/mysql.sock  
log-error=/opt/mysql/logs/mysql_error.log    
pid-file=/opt/mysql/mysql.pid    
open_files_limit=10240    
back_log=600    
max_connections=500    
max_connect_errors=6000    
wait_timeout=605800    
#open_tables=600    
#table_cache = 650    
#opened_tables = 630
max_allowed_packet=32M   
sort_buffer_size=4M    
join_buffer_size=4M    
thread_cache_size=300    
query_cache_type=1    
query_cache_size=256M    
query_cache_limit=2M    
query_cache_min_res_unit=16k
tmp_table_size=256M   
max_heap_table_size=256M
key_buffer_size=256M   
read_buffer_size=1M    
read_rnd_buffer_size=16M    
bulk_insert_buffer_size=64M
lower_case_table_names=1
default-storage-engine=INNODB
innodb_buffer_pool_size=2G   
innodb_log_buffer_size=32M    
innodb_log_file_size=128M    
innodb_flush_method=O_DIRECT    
#####################    
long_query_time=2    
slow-query-log=on    
slow-query-log-file=/opt/mysql/logs/mysql-slow.log
[mysqldump]   
quick    
max_allowed_packet=32M
[mysqld_safe]   
log-error=/var/log/mysqld.log    
pid-file=/var/run/mysqld/mysqld.pid    
EOF
```
4.2.配置MySQL服务
```
[root@centos7 ~]# cp /opt/mysql/app/support-files/mysql.server /etc/init.d/mysqld
chkconfig --add mysqld
chkconfig mysqld on
```
4.3. 防火墙

请登录成为 root 并检查已引导的本地
```
[root@centos7 ~]# firewall-cmd --get-active-zones
public
  interfaces: eth0
```
打开相关的端口

[root@centos7 ~]# firewall-cmd --zone=public --add-port=3306/tcp --permanent
success

[root@centos7 ~]# firewall-cmd --reload
success

[root@centos7 ~]# firewall-cmd --list-ports
3306/tcp
```
4.4. 启动服务
```
service mysqld start
netstat -anpt | grep mysqld
```
4.5.配置MySQL环境变量
```
echo -e '\n\nexport PATH=/opt/mysql/app/bin:$PATH\n' >> /etc/profile && source /etc/profile
```
4.6.设置数据库root用户密码
```
mysql_secure_installation
```
4.7.创建其他MySQL数据库用户
```
mysql -uroot -p   
mysql> CREATE USER 'jackgo'@'localhost' IDENTIFIED BY 'server@123'; 
myqsl> exit
```