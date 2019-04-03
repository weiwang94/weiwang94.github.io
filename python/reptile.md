# 爬虫

## 核心

1、导入库

    import requests
    from pyquery import PyQuery as pq

2、requests 发请求，获得页面

    r = requests.get(url)
    page = r.content
    
3、pyquery 解析页面，得到想要的数据

    # 解析的方法类似于 jquery
    e = pq(page)
    items = e('.item')
    ...
    
如果页面是下面的类型，要使用 items = e('.item', parser="html") 解析。
[pyquery 文档](https://pythonhosted.org/pyquery/index.html)

    <html xmlns="http://www.w3.org/1999/xhtml">' 
  
   

## 模拟浏览器

有时候页面是前端渲染的，要执行 JS 才能得到完整的页面。因此我们需要一个浏览器运行js，渲染页面。这时就需要导入一些库帮我们做这些事情。

导入库

    from selenium import webdriver
    
使用无头(headless)chrome 模拟浏览器

    import time
    
    # /Users/ww/Downloads/software 路径提前已经在环境变量里配了
    driver = webdriver.Chrome('/Users/ww/Downloads/software/chromedriver')
    driver.get(url)
    time.sleep(1)
    content = driver.page_source

[chromedriver 文档](https://sites.google.com/a/chromium.org/chromedriver/)

爬取 iFrame 标签页面，使用 switch_to.frame 

     driver.switch_to.frame('contentFrame')
   



    