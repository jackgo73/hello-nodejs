---
title: Postgresql Script
date: 2017-12-12 14:36:29
categories: Postgresql
tags: command
---

```shell
export PGHOME=$PG_DIR_PRE/pgsql$PGPORT
export LD_LIBRARY_PATH=$PGHOME/lib:/lib64:/usr/lib64:/usr/local/lib64:/lib:/usr/lib:/usr/local/lib:$LD_LIBRARY_PATH
export DATE=`date +"%Y%m%d%H%M"`
export PATH=$PGHOME/bin:$PATH:.
export MANPATH=$PGHOME/share/man:$MANPATH
#export PGHOST=$PGDATA
export PGUSER=postgres
export PGDATABASE=postgres

alias rm='rm -i'
alias ll='ls -lh'
alias ..='cd ..'


function help_pg()
{
cat << EOF
=====================================
yum -y install coreutils glib2 lrzsz sysstat e4fsprogs xfsprogs ntp readline-devel zlib zlib-devel openssl openssl-devel pam-devel libxml2-devel libxslt-devel python-devel tcl-devel gcc make smartmontools flex bison perl perl-devel perl-ExtUtils* openldap openldap-devel
=====================================
./configure --prefix=$HOME/app/pgsql8400 --with-openssl --enable-debug --enable-cassert --enable-thread-safety CFLAGS='-O0' --with-pgport=8400 --enable-depend;
make -sj12;
make install;
=====================================
initdb -D $PGDATA -E UTF8 --locale=C -U postgres -X $PGDATA/pg_xlog$PGPORT
=====================================
sed -ir "s/#*unix_socket_directories.*/unix_socket_directories = '.'/" $PGDATA/postgresql.conf
sed -ir "s/#*unix_socket_permissions.*/unix_socket_permissions = 0700/" $PGDATA/postgresql.conf
sed -ir "s/#*max_connections.*/max_connections = 800/" $PGDATA/postgresql.conf
sed -ir "s/#*superuser_reserved_connections.*/superuser_reserved_connections = 13/" $PGDATA/postgresql.conf
sed -ir "s/#*logging_collector.*/logging_collector= on/" $PGDATA/postgresql.conf
sed -ir "s/#*log_directory.*/log_directory = 'pg_log'/" $PGDATA/postgresql.conf
sed -ir "s/#*log_filename.*/log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'/" $PGDATA/postgresql.conf
sed -ir "s/#*log_rotation_size.*/log_rotation_size = 10MB/" $PGDATA/postgresql.conf
sed -ir "s/#*log_line_prefix.*/log_line_prefix='%p %r %u %d %t %e'/" $PGDATA/postgresql.conf
sed -ir "s/#*log_min_duration_statement.*/log_min_duration_statement= 1000/" $PGDATA/postgresql.conf
sed -ir "s/#*log_timezone.*/log_timezone = 'UTC'/" $PGDATA/postgresql.conf
sed -ir "s/#*log_truncate_on_rotation.*/log_truncate_on_rotation = on/" $PGDATA/postgresql.conf
sed -ir "s/#*log_rotation_age.*/log_rotation_age = 0/" $PGDATA/postgresql.conf
sed -ir "s/#*log_statement.*/log_statement= 'all'/" $PGDATA/postgresql.conf
sed -ir "s/#*max_prepared_transactions.*/max_prepared_transactions= 800/" $PGDATA/postgresql.conf
=====================================

EOF

}


```


