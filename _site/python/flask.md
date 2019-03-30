# flask

[官方文档](http://docs.jinkan.org/docs/flask/)

导入 flask 函数

    from flask import (
        Flask,
        render_template,
        request,
        redirect,
        url_for,
        Blueprint,
    )
    
Flask 用来生成 Flask 实例

render_template 用来渲染模板

request 提供请求相关数据

redirect 重定向

url_for 方便导向某个路由


### 初始化一个 Flask 实例
    
    app = Flask(__name__)as
    
### 使用蓝图

todo.py (在 routes 模块下) 创建一个蓝图对象

    main = Blueprint('todo', __name__) 

app.py  使用创建的蓝图对象注册蓝图

    from routes.todo import main as todo_routes

    app.register_blueprint(todo_routes, url_prefix='/todo')
   
    
    
### 声明路由
 
    @app.route(path, methods=["GET", "POST"])
    def index(param):
        pass
        
使用 @ 装饰器声明路由，第一个参数是路由的路径，第二个参数是这个路由接受的请求方法

装饰器下面定义处理这个路由的函数，函数的参数是路由里面动态的部分

### 渲染模板

render_template 渲染模板，使用 [jinja2](http://jinja.pocoo.org/2/documentation/) 引擎 项目目录下 templates 的模板。 

### 请求

request 对象，form属性以 MultiDict 形式存储请求中的 body 部分，args属性以 MultiDict 形式存储请求 URL 问号后面的部分。

### 重定向

redirect 重定向函数，重定向到某个路由。

### 动态路由

使用 url_for('path', param) 可以动态生成路由

    url_for("todo.update", todo_id=t.id)
    
上面代码中， 导向 todo（Blueprint 蓝图的名字）下update路由，动态部分是 todo_id,
如果 todo.update 代表 /todo/update, id 是 1，则实际导向的是 /todo/update/1

    @main.route('/update/<int:todo_id>/', methods=['POST'])
    def update(todo_id):
        """
            更新TODO
        """
        Todo.update(todo_id, request.form)
        return redirect(url_for('.index'))
        
上面代码负责接收 update 路由，def update(todo_id) 中 todo_id, flask 会根据请求动态传进来，
如果是请求是上面 url_for 的情况，todo_id 则是 1


 


        
        