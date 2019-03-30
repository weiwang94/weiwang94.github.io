

参考书籍： Python参考手册

### 格式化输出

%3d 输出整数部分，占3位，右对齐；%0.2f 小数部分保留2位

    print('%3d  %0.2f' % (1, 5.567))
    
      1 5.57
    
format

    print('{0:3d}  {1:0.2f}'.format(1, 5.567))
    
      1 5.57
      
### if else
 
一个 if else
 
    if 2 > 1:
        print('yes') 
    else:
        print('no')
 
多个条件判断 elif
        
    a = 'red'
    if a == 'red':
        print('OK')
    elif a == 'orange':
        print('Warn')
    else a == 'black':
        print('NO')   

### 字符串

单引号或双引号用来创建单行字符串，三引号用来创建多行字符串

    a = 'wang' 
    b = "wang"
    c = """ 
         wang
         wang
        """
        
    # wang wang  
    #      wang
    #      wang
   
字符串可用下标访问；可用[i:j]类似的切片函数访问下标范围的字符串

    a = "Hello World"
    a[6] # W 
    a[6:] # World
    a[0:5] # Hello
    
转换字符串 str(), repr(), format()
 
    str() 生成让人看的字符串
    repr() 生成让机器看的字符串，
    format() 把数字生成格式化的字符串
    
### 列表(list)

创建列表

    l = []
    l = list()
    l = [1, 2, 3, 4, 5]
    
追加列表

    l.append(1)
   
插入列表

    l.insert(10, 2)  # 当插入的位置超过 list 长度时等同于 append
    # 为负数时按倒数第几个算
    l.insert(-1, 4) # 倒数第一个的前面插入
    
切片运算符
    
    l[0:2] # 1, 2; 从 0 位置开始，在 1 位置结束
    l[2:] # 3, 4, 5; 从 2 位置开始，在末尾结束
    l[0:2] = [6, 7] # 6, 7, 3, 4, 5
    
+运算符
    
    l = [1, 2, 3] + [4 ,5]  # [1, 2, 3 ,4, 5]


### 元组

元组和列表很相似，支持索引，切片，相加；它们的不同在于元组中的值不能被修改，
即不能被替换，删除或插入新的元素。由于元组不能被更改，导致了他的内存占用比列
表要少，所以在小于 12 个值的情况下尽量使用元组

    t = 1, 2 # (1, 2)
    t[0] = 1
    t1 = 1, # 创建单个元组
    

### 集合

集合是无序的, 和数学中集合的概念相同。

    s = set([1, 2, 3]) # 创建集合的参数必须是可遍历的，这里是数组
    ss = set([3, 4, 5]) # {3, 4, 5}
    
    s | ss # 并集 {1, 2, 3 ,4, 5}
    s & ss # 交集 {3}
    s - ss # {1, 2}; 差集 在 s 中但不在 ss 中
    ss - s # {4, 5}; 差集 在 ss 中但不在 s 中
    s ^ ss # {1, 2, 4, 5} 差集之和
    
    s.add(4) # 添加一个元素
    s.update([4, 5]) # 添加多个元素
    s.remove(4) # 删除一个元素
    
### 字典

字典由键和值组成，键可以是字符串，数值和元组；不可以是列表或字典之类的对象，
因为它们是可变的；

    country = {
        "east": {'China', 'Janpan'},
        "west": {'Amarica', 'Britain'}
    }
    
    # 判断键值是否存在
    'east' in country # True
    
    # 获取键值及默认值
     country.get('europe', {'China'}) 
     
     # 把键值转换成列表
     list(country) # ['east', 'west']
     
     # 删除键值
     del country['east'] # {"west": {'Amarica', 'Britain'}}


### 循环

循环一连串数字

    print('rang(3): ')
    for n in range(3):
        print(format(n, '3d'))

    print('range(1, 3)')
    for n in range(1, 3):
        print(format(n, '3d'))

    print('range(1, 5, 2)')
    for n in range(1, 5, 2):
        print(format(n, '3d'))
        
循环数据类型

    print('cycle 字符串')
    s = 'Hello, World'
    for n in s:
        print(n)

    print('cycle 列表')
    l = [1, 2, 3, 4, 5]
    for n in l:
        print(n)

    print('cycle 字典')
    d = {'Xi\'An': 100, 'HanZhong': 101}
    for k in d:
        print(k, d[k])
        
### 函数
    
    定义一个函数
    def f(host, port = 80):
        pass
     
    调用函数 port 是默认值
    f(g.cn)
    
    也可使用变量名赋值调用，这时可以改变参数的位置
    f(port=8080, host=g.cn)    
    
    
 ### 生成器
 
 在函数中，使用 yield 生成一个可迭代的序列；
 
    # 生成器
    def countdown(n):
        print('countdown')
        while n > 0:
            yield n
            n -= 1
    
    
    def cycle_countdown():
        for n in countdown(5):
            print(n)
            
            
### 协程


### 异常


### 模块