---
title: CentOS 7 安装 Oracle 数据库 11g
date: 2017-08-06 13:12:02
categories: Oracle
tags: 
     - oracle
     - deploy
     - centos
---

## 1. 引言

本指南介绍如何在 CentOS 7.1（64 位）上利用快速安装的功能部署 Oracle 数据库 linux.x64_11gR2_database


## 2. 先决条件

### 内存
```shell
grep MemTotal /proc/meminfo
```
Harware | Minimum | Recommended
---|---|---
Memory | 1 GB of RAM | 2 GB of RAM or more



swap建议

RAM | Swap Space
---|---|---
Between 1 GB and 2 GB | 1.5 times the size of the RAM
Between 2 GB and 16 GB | Equal to the size of the RAM
More than 16 GB | 16 GB

### 系统架构
```shell
uname -a
Linux localhost.localdomain 4.1.12-61.1.18.el7uek.x86_64 #2 SMP Fri Nov 4 15:48:30 PDT 2016 x86_64 x86_64 x86_64 GNU/Linux
```

### 硬盘空间

- 1 GB of space in the /tmp directory `df -h /tmp`
- 足够空间安装，请保留5GB以上空间 `df -h`

### 操作系统、内核版本、编译器支持

- 操作系统`cat /proc/version`

  Oracle Linux / Oracle Linux / SUSE Linux Enterprise 等等

- 内核版本`uname -r`

  For Linux x86-64 : On Oracle Linux 7 3.8.13-33.el7uek.x86_64 or later

- 编译器

  For Linux x86 and Linux x86-64, Intel C++ Compiler 10.1 or later and the version of GNU C and C++ compilers

### 依赖包
```
binutils-2.19
gcc-4.3
gcc-c++-4.3
glibc-2.9
glibc-devel-2.9
ksh-93t
libstdc++33-3.3.3
libstdc++43-4.3.3_20081022
libstdc++43-devel-4.3.3_20081022
libaio-0.3.104
libaio-devel-0.3.104
libgcc43-4.3.3_20081022
libstdc++-devel-4.3
make-3.81
sysstat-8.1.5
```

检查依赖包
```shell
rpm -q binutils gcc gcc-c++ glibc glibc-devel ksh libstdc++33 libstdc++43 libstdc++43-devel libaio libaio-devel libgcc43 libstdc++-devel make sysstat unixODBC-32bit unixODBC-devel-32bit gcc-32bit libaio-devel-32bit libstdc++43-devel-32bit
```

```shell
zypper install gcc gcc-c++ libstdc++43-devel libaio-devel libstdc++-devel sysstat unixODBC-32bit unixODBC-devel-32bit gcc-32bit libaio-devel-32bit libstdc++43-devel-32bit
```

安装完成后检查
```
rpm -q binutils gcc gcc-c++ glibc glibc-devel ksh libstdc++33 libstdc++43 libstdc++43-devel libaio libaio-devel libgcc43 libstdc++-devel make sysstat unixODBC-32bit unixODBC-devel-32bit gcc-32bit libaio-devel-32bit libstdc++43-devel-32bit
binutils-2.23.1-0.17.18
gcc-4.3-62.198
gcc-c++-4.3-62.198
glibc-2.11.3-17.54.1
glibc-devel-2.11.3-17.54.1
ksh-93u-0.18.1
libstdc++33-3.3.3-11.9
libstdc++43-4.6.9-0.11.38
libstdc++43-devel-4.3.4_20091019-0.37.30
libaio-0.3.109-0.1.46
libaio-devel-0.3.109-0.1.46
libgcc43-4.6.9-0.11.38
libstdc++-devel-4.3-62.198
make-3.81-128.20
sysstat-8.1.5-7.45.24
unixODBC-32bit-2.2.12-198.17
unixODBC-devel-32bit-2.2.12-198.17
gcc-32bit-4.3-62.198
libaio-devel-32bit-0.3.109-0.1.46
libstdc++43-devel-32bit-4.3.4_20091019-0.37.30
```


## 3. 安装步骤

为 Oracle 数据库创建所须的操作系统用户及群组。

```
groupadd oinstall
groupadd -g 502 dba
/usr/sbin/useradd -u 502 -g oinstall -m -d /opt/oracle -G dba oracle 
passwd oracle
```

在 */etc/sysctl.conf* 加入下列内核参数

```
fs.file-max = 6815744 
kernel.sem = 250 32000 100 128
kernel.shmmni = 4096
kernel.shmall = 1073741824 
kernel.shmmax = 4398046511104
kernel.panic_on_oops = 1 
net.core.rmem_default = 262144
net.core.rmem_max = 4194304 
net.core.wmem_default = 262144
net.core.wmem_max = 1048576
net.ipv4.conf.all.rp_filter = 2 
net.ipv4.conf.default.rp_filter = 2
fs.aio-max-nr = 1048576
net.ipv4.ip_local_port_range = 9000 65500
```

检查并运用新的数值。

```
sysctl -p
sysctl -a
```

For SUSE
```
/sbin/chkconfig boot.sysctl on
```

在 `/etc/security/limits.conf` 为 oracle 用户设置上限

```
指令：ulimit -Sn:The maximum number of open file descriptors
文件：oracle soft nofile 1024
数值：1024
指令：ulimit -Hn:The maximum number of open file descriptors
文件：oracle hard nofile 65536
数值：65536

指令：ulimit -Su:The maximum number of processes available to a single user
文件：oracle soft nproc 2047
数值：2047
指令：ulimit -Hu:The maximum number of processes available to a single user
文件：oracle hard nproc 16384
数值：16384


指令：ulimit -Ss:The maximum stack size
文件：oracle soft stack 10240
数值：10240
指令：ulimit -Hs:The maximum stack size
文件：oracle soft stack 32768
数值：32768
```

在文件中写入：
```
oracle soft nproc 2047
oracle hard nproc 16384
oracle soft nofile 1024
oracle hard nofile 65536
oracle soft stack 10240
oracle soft stack 32768
```

将 Oracle 数据库软件的 zip 文件（linuxamd64_12102_database_1of2.zip, linuxamd64_12102_database_2of2.zip）解压至 */stage* 目录。

```
[root@centos7 ~]# yum install -y zip unzip
[root@centos7 ~]# unzip linuxamd64_12102_database_1of2.zip -d /stage/
[root@centos7 ~]# unzip linuxamd64_12102_database_2of2.zip -d /stage/
```

修改　*/stage* 的权限

```
mkdir /stage
chown -R oracle:oinstall /stage/
```

为 Oracle 软件创建 */u01* 目录，及为数据库文件创建 */u02* 目录。

```
mkdir /u01
mkdir /u02
chown -R oracle:oinstall /u01
chown -R oracle:oinstall /u02
chmod -R 775 /u01
chmod -R 775 /u02
chmod g+s /u01
chmod g+s /u02
```


还有安装 *X Window System* 组件群组。

```
[root@centos7 ~]# yum groupinstall -y "X Window System"

```

由于 Oracle 的安装采用图像界面，你可通过以下三个简单的方法进行。

- 方案 1

  通过 SSH 从一台图像化 Linux 计算机远程登录。

  ```
  ssh -X oracle@centos7.example.com
  ```

- 方案 2 

  利用一台拥有 SSH 客户端（PuTTY）及 X-Windows 终端機仿真器（Xming）的微软 Windows 桌面。

  以下文档描述如何在 Windows 系统上安装 Xming。

  [Xming —— 微软 Windows 计算机下的 X-Windows 终端機仿真器](https://wiki.centos.org/zh/HowTos/Xming)

  请采用上述的方案登录为 oracle 用户，然后执行 Oracle 安装程序：

  ```
  [oracle@centos7 ~]$ /stage/database/runInstaller
  Starting Oracle Universal Installer...
  ```

- 方案3

  请安装xshell + xmanager

  在xshell连接--属性--SSH--隧道中，勾选转发X11连接到xmanager



请采用上述的方案登录为 oracle 用户，然后执行 Oracle 安装程序：

```
[oracle@centos7 ~]$ export DISPLAY=XMANAGER_WINDOWS_IP:0.0
[oracle@centos7 ~]$ /stage/database/runInstaller
Starting Oracle Universal Installer...
```
## 4. Oracle 安装程序画面

`第一步 安全性更新`

假若你不想接收来自 Oracle 支持部的电邮，请取消勾选该项目并按 **Next**。

在新打开的窗口按 YES。

`第二步 安装选项`

选择 **Create and configure a database** 并按 **Next**

`第三步 系统级别`

选择 **Desktop Class** 进行缺省的简便 Oracle 数据库安装。

`第四步 典型安装`

在 Typical Install Configuration 画面，设置以下功能。

| 参数                   | 值                                      |
| ---------------------- | --------------------------------------- |
| Oracle base            | /u01/app/oracle                         |
| Software location      | /u01/app/oracle/product/12.1.0/dbhome_1 |
| Database file location | /u02                                    |
| Global database name   | orcl.example.com                        |

另外请设置合适的 **Database edition（数据库版本）**及 **Character set（符集）**。请为数据库的管理订立一个安全的**口令**，最后请取消勾选 **Create as Container database** 项目。

`第五步 创建库存`

接纳缺省的 **/u01/app/oraInventory** 并按 **Next**。

`第六步 检查先决条件`

安装程序会自动检查所有必须的操作系统组件及内核设置。

`第七部 摘要`

这是编辑安装特点的最后机会。请按 **Install**。

 `第八步 执行设置脚本`

当询问窗口出现时，请登录成为 root 并执行两个脚本：

```
/u01/app/oraInventory/orainstRoot.sh
```

```
/u01/app/oracle/product/12.1.0/dbhome_1/root.sh

```

这两个脚本都必须以 root 的身份来执行。

`第九步 安装进度`

一个显示安装进度的窗口将会出现。请勿关闭这个窗口。

`第十步 顺利完成安装`

最后一个画面将会通知你安装已经完成并显示 Oracle 企业级管理员的 URL。

[https://localhost:1158/em](https://localhost:1158/em)

请按 OK 来关闭安装程序。



## 5. 安装后的任务

### 5.1. 防火墙

请登录成为 root 并检查已引导的本地

```
[root@centos7 ~]# firewall-cmd --get-active-zones
public
  interfaces: eth0

```


### 5.2. Oracle 工作环境

请登录为 oracle 用户并在 */home/oracle/.bash_profile* 内加入下列数值

```
TMPDIR=$TMP; export TMPDIR
ORACLE_BASE=/u01/app/oracle; export ORACLE_BASE
ORACLE_HOME=$ORACLE_BASE/product/11.2.0/dbhome_2; export ORACLE_HOME
ORACLE_SID=orcl; export ORACLE_SID
PATH=$ORACLE_HOME/bin:$PATH; export PATH
LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib:/usr/lib64; export LD_LIBRARY_PATH
CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib; export CLASSPATH

```

重新装入 bash_profile 来运用新设置值：

```
[oracle@centos7 ~]$ . .bash_profile

```

### 5.3. 登录数据库

最后请登录数据库：

```
. /usr/local/bin/oraenv

sqlplus system@orcl
... output omitted ...
Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production
With the Partitioning, OLAP, Advanced Analytics and Real Application Testing options
SQL>
```

请利用 Oracle 企业级管理员来管理数据库：

`https://<主机名称>:5500/em`

### 5.4. 远程登录数据库（hostname能正常识别可以省略这步）

```
vim  $ORACLE_HOME/network/admin/listener.ora

LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = IP or Hostname)(PORT = 1521))
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )

SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (ORACLE_HOME =/u01/app/oracle/product/12.1.0/dbhome_1)
      (SID_NAME = orcl)
     )
  )
```
远程连接调试方法
```shell
# get yourself ip
hostname | xargs ping
# windows
telnet ip 1521
```

关闭suse11防火墙
```
图形化界面的external中的advance中空格分开写入端口号1521等
```

