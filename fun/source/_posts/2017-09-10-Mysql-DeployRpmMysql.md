---
title: RPM安装Mysql
date: 2017-09-10 12:44:03
categories: Mysql
tags: 
    - mysql
    - deploy
    - centos
---


# 环境检查
   ```
   [root@localhost mysql]# rpm -qa | grep mysql
   [root@localhost mysql]# rpm -qa | grep mariadb
   mariadb-libs-5.5.56-2.el7.x86_64
   
   [root@localhost mysql]# yum remove mariadb-libs-5.5.56-2.el7.x86_64
   ```
# 下载[mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar](https://dev.mysql.com/downloads/file/?id=471503)

# 上传Linux服务器
   ```shell
   [root@localhost stage]# pwd
   /stage
   [root@localhost stage]# ll mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar 
   -rw-r--r--. 1 root root 592865280 Sep 29 10:41 mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar
   ```
# 解压缩
   ```
   tar xvf mysql-5.7.19-1.el7.x86_64.rpm-bundle.tar -C /stage/mysql/

   [root@localhost stage]# ll mysql/
   total 578984
   -rw-r--r--. 1 7155 31415  25085192 Jun 24 08:08 mysql-community-client-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415    278292 Jun 24 08:08 mysql-community-common-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415   3778852 Jun 24 08:08 mysql-community-devel-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415  46236988 Jun 24 08:08 mysql-community-embedded-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415  24077820 Jun 24 08:08 mysql-community-embedded-compat-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415 128296360 Jun 24 08:09 mysql-community-embedded-devel-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415   2238032 Jun 24 08:09 mysql-community-libs-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415   2115696 Jun 24 08:09 mysql-community-libs-compat-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415  55456196 Jun 24 08:09 mysql-community-minimal-debuginfo-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415 171537176 Jun 24 08:09 mysql-community-server-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415  15258732 Jun 24 08:09 mysql-community-server-minimal-5.7.19-1.el7.x86_64.rpm
   -rw-r--r--. 1 7155 31415 118490200 Jun 24 08:10 mysql-community-test-5.7.19-1.el7.x86_64.rpm
   ```
# 安装mysql
   ```
   rpm -ivh mysql-community-server-5.7.19-1.el7.x86_64.rpm --nodeps
   rpm -ivh mysql-community-client-5.7.19-1.el7.x86_64.rpm --nodeps
   rpm -ivh mysql-community-common-5.7.19-1.el7.x86_64.rpm
   rpm -ivh mysql-community-libs-5.7.19-1.el7.x86_64.rpm
   rpm -ivh mysql-community-libs-compat-5.7.19-1.el7.x86_64.rpm
   
   ```
# 启动mysql
   ```
   /bin/systemctl start mysqld.service
   ```
   
   启动脚本已经安装了，位置在：
   ```
   /usr/lib/systemd/system/mysqld.service
   ```
   
   脚本内容
   ```
   [Unit]
   Description=MySQL Server
   Documentation=man:mysqld(8)
   Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
   After=network.target
   After=syslog.target

   [Install]
   WantedBy=multi-user.target

   [Service]
   User=mysql
   Group=mysql

   Type=forking

   PIDFile=/var/run/mysqld/mysqld.pid
   
   # Disable service start and stop timeout logic of systemd for mysqld service.
   TimeoutSec=0

   # Execute pre and post scripts as root
   PermissionsStartOnly=true
   
   # Needed to create system tables
   ExecStartPre=/usr/bin/mysqld_pre_systemd

   # Start main service
   ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid $MYSQLD_OPTS

   # Use this to switch malloc implementation
   EnvironmentFile=-/etc/sysconfig/mysql

   # Sets open_files_limit
   LimitNOFILE = 5000

   Restart=on-failure

   RestartPreventExitStatus=1

   PrivateTmp=false
   ```
# 找到初始密码
   ```
   [root@localhost ~]# cat /etc/my.cnf | grep log-error
   log-error=/var/log/mysqld.log

   [root@localhost system]# cat /var/log/mysqld.log | grep password
   2017-09-29T15:01:26.846762Z 1 [Note] A temporary password is generated for root@localhost: tX(a<)SYu3JG
   ```
   
# 安全初始化mysql
   ```
   /usr/bin/mysql_secure_installation
   
   
   
   Server@234
   ```
   
# 连接测试
   ```
   mysql -uroot -p
   mysql> show databases;
   +--------------------+
   | Database           |
   +--------------------+
   | information_schema |
   | mysql              |
   | performance_schema |
   | sys                |
   +--------------------+
   4 rows in set (0.00 sec)
   ```

---

done!

