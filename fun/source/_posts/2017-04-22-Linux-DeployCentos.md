---
title: VirtualBox安装Centos7
date: 2017-04-22 13:05:00
categories: Deploy
tags: 
    - linux
    - centos
    - deploy
---

# VirtualBox安装Centos7
## 安装之后调整分辨率的方法
```
vi /boot/grub2/grub.cfg
%s/UTF-8/UTF-8 vga=0x344
```

## 网卡设为桥接
```
vi /etc/sysconfig/network-scripts/ifcfg-enp0s3
```
将 ONBOOT=no 改为 ONBOOT=yes

保存后重启网卡： service network restart

## 在CentOS中开启sshd服务（桥接的话不需要转发）
```
chkconfig sshd on

service sshd start

yum install net-tools bzip2 vim
```
## 在VirtualBox中设置端口转发

(1) 通过管理》全局设定》网络来查看虚拟网关的IP： 192.168.56.1

(2) 通过设备》更改网络连接》网络》端口转发来设置端口转发规则：

22 -> 22

## 环境初始化

useradd -m -d /home/jackgo jackgo -p 333
useradd -m -d /home/pgdba pgdba -p 333
useradd -m -d /home/war war -p 333

mkdir packages tests projects app bin
mkdir projects/cprojs projects/pyprojs projects/shprojs

## SAMBA
```shell



yum install samba samba-client 

vim /etc/samba/smb.conf

[homes]

  comment = Home Directories

  browseable = Yes

  read only = No

  valid users = jackgo


smbpasswd -a jackgo

firewall-cmd --permanent --zone=public --add-service=samba
firewall-cmd --reload
setsebool -P samba_enable_home_dirs on
setsebool -P samba_export_all_rw on

#vi /etc/selinux/config
#SELINUX=disabled

# no need to "setenforce 0"
# no need to "systemctl stop firewalld.service"
# no need to "systemctl disable  firewalld.service     #开启不启动"

systemctl enable smb nmb
systemctl restart smb nmb
```

## yum
```
yum -y install readline-devel zlib-devel openssl-devel libxml2-devel bzip2
yum -y install coreutils glib2 lrzsz mpstat dstat sysstat e4fsprogs xfsprogs 
yum -y install ntp pam-devel libxslt-devel python-devel tcl-devel
yum -y install flex bsion 
yum -y install git
yum -y install gcc-c++
```

## 配置Github
```
git config --global core.autocrlf false

git config --global user.email "mutex73@gmail.com"
git config --global user.name "Jack Go"

ssh-keygen -t rsa -b 4096 -C "mutex73@gmail.com"

GIT shadowsockets
git config --global http.proxy 'socks5://127.0.0.1:1091' 
git config --global https.proxy 'socks5://127.0.0.1:1091'
```
## 安装VirtualBox增强功能
```
yum install gcc kernel-devel kernel-headers 
```
然后使用root用户登录执行增强包

ps. 分辨率调成1440 * 900 比较合适

## 盒盖不休眠

systemd 处理某些电源相关的 ACPI事件，可以通过从 /etc/system/logind.conf以下选项进行配置：

```
HandlePowerKey按下电源键后的行为，默认power off

HandleSleepKey 按下挂起键后的行为，默认suspend

HandleHibernateKey 按下休眠键后的行为，默认hibernate

HandleLidSwitch 合上笔记本盖后的行为，默认suspend
```

触发的行为可以有
```
ignore、power off、reboot、halt、suspend、hibernate、hybrid-sleep、lock、exec
```

如果要合盖不休眠只需要把HandleLidSwitch选项设置为如下即可：
```
HandleLidSwitch=lock
```

```
systemctl restart systemd-logind
```