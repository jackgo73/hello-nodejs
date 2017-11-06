---
title: PowerDesign逆向工程oracle11g
date: 2017-10-31 11:15:55
categories: Work
tags: pd
---

转：http://blog.csdn.net/makang110/article/details/74451934

# 利用Powerdesigner16.5(64位)连接64位oracle逆向工程数据库

## 原料

1、oracle odbc驱动（64位 现在没几个用32位的了）

2、Powerdesigner16.5 sp05 （很大800多M）

  ## 步骤：

1 安装odbc驱动

​      我下载的base包：instantclient-basic-windows.x64-11.2.0.3.0.zip

　　ODBC包：instantclient-odbc-windows.x64-11.2.0.3.0.zip

　　两个包的版本必须要一致才行。http://www.oracle.com/technetwork/topics/winx64soft-089540.html去下载适合自己的版本。

![](/images/2017-10-31-Work-PDReverse-0.jpg)

![](/images/2017-10-31-Work-PDReverse-1.jpg)



2 解压安装

　　解压上面两个包，把解压后的文件放在同一个目录（合并），注意2个包解压后的所有文件必须放在一个目录下，假设是D:\\instantclient_11_2(odbc)

　　使用管理员权限打开CMD，进入该目录，运行odbc_install.exe进行安装（可以看到安装的信息）

​     或者直接双击odbc_install.exe一闪而过。  

​     装没装成功要到控制面板里看。

![](/images/2017-10-31-Work-PDReverse-2.jpg)

有这个表示驱动安装成功。

然后就是配置odbc数据源了

![](/images/2017-10-31-Work-PDReverse-3.jpg)

![](/images/2017-10-31-Work-PDReverse-4.png)

测试一下配置显示成功就大功告成



3 安装Powerdesigner16.5 sp05简单一阵next点击  就安装好了。

   64位版的使用很简单不会出现啥odbc驱动找不到了。

   从File选择

![](/images/2017-10-31-Work-PDReverse-5.png)

这种开始建立的odbc数据源,输入密码就可以了 

![](/images/2017-10-31-Work-PDReverse-6.jpg)

 再选相应的表导入就搞定了 。