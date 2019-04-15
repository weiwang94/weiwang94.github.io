# 部署

[综述](https://www.jianshu.com/p/be9dd421fb8d)

[管理python环境](https://www.jianshu.com/p/08c657bd34f1)


## 前言

我们开发时用 python 启动我们的后端服务。

部署到生产环境时就额外需要考虑性能，使服务器能接受更多的请求。

于是我们需要 gunicorn 开启多个进程启动后端。接着又需要使用 supervisor 管理 gunicorn 开启的进程。

好的现在我们开启了多进程来处理请求，但是请求非常多时，多进程也是不够的，我们可能还需要多个 gunicorn。

有多个 gunicorn 时，就需要有个程序来做分发请求给某个 gunicorn 的事情。这个程序就是 nginx，反向代理，代理分发请求给处理请求的程序。

以下讨论的部署配置均为 Mac OS 环境。

## gunicorn

[官网](https://gunicorn.org/) [github](https://github.com/benoitc/gunicorn/tree/29f0394cdd381df176a3df3c25bb3fdd2486a173)

以下是官网介绍，翻译过来大概是，Gunicorn(Green Unicorn) 是为 Unix 操作系统设计的 Python WSGI HTTP Server。

    Gunicorn 'Green Unicorn' is a Python WSGI HTTP Server for UNIX

前言中我们知道通过 supervisord 管理 gunicorn 启动的进程。因此，需要在 supervisord 配置文件里面使用 gunicorn 启动的进程。

以下是 supervisord 配置文件里面的一句。通过 gunicorn 的配置文件启动进程。

    command=/usr/local/bin/gunicorn wsgi -c gunicorn.config.py
    
gunicorn.config.py 文件。为了简单，只配置了绑定的 ip 和端口，以及 pidfile。 pid(Process Identifier) 是进程的唯一识别ID。
    
    bind = '0.0.0.0:2001'
    pidfile = '/tmp/bbs.pid'
    
更多配置请参考[官方文档](http://docs.gunicorn.org/en/stable/settings.html)

## supervisor

[官网](http://supervisord.org/)
[参考教程](http://liyangliang.me/posts/2015/06/using-supervisor/)

以下是官网介绍，翻译过来大概是，Supervisor 是一个在类 UNIX 操作系统上，允许使用者监视和控制一定数量进程的客户端/服务器系统。

    Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems.
    
### 安装 supervisor

Mac OS 上要使用 python2 的 pip 安装。python3 无法安装。

使用 virtualenv 创建了一个 python2 环境。
    
    virtualenv -p /usr/bin/python2.7 ENV2.7
    
激活 环境

    source ./ENV2.7/bin/activate

安装 supervisor

    pip install supervisor
    
进入 ENV2.7/bin 目录，复制 supervisor 程序到 /usr/local/bin 目录

    # supervisord 程序
    cp supervisord /usr/local/bin
    # supervisorctl 带界面的 supervisord 控制程序
    cp supervisorctl /usr/local/bin
    # echo_supervisord_conf 输出 supervisord 默认控制文件
    cp echo_supervisord_conf /usr/local/bin

## nginx

维基百科定义：

    Nginx（发音同engine x）是异步框架的 Web服务器，也可以用作反向代理，负载平衡器 和 HTTP缓存
    
默认配置文件路径： /usr/local/etc/nginx/nginx.conf。 最后面有个 [include] 在下面添加自己的配置文件路径。   
    
最简单的配置文件

    server {
        listen 80;
        location / {
            proxy_pass http://localhost:2001;
        }
    }
    

启动， 输入 nginx 回车
