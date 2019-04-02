# 数据结构

## 数组

平时最常使用的数据结构，以至于我们竟不知道它是数据结构。

查询, 修改 复杂度 O(1)

插入，删除 复杂度 O(n)

## 哈希表（子典， 对象， Map）

一种键值对映射关系。键对应一个数组的下标，存储有键和值。

现在只考虑键是字符串的情形

利用字符串的 ASCII 或 Unicode 码生成唯一码，唯一码和数组大小取模得到下标

        def _hash(self, s):
            """
            下划线开始的函数被我们视为私有函数
            但实际上还是可以在外部调用, 这只是一个给自己看的标记
            """
            n = 1
            f = 1
            for i in s:
                n += ord(i) * f
                f *= 10
            return n

        def _index(self, key):
            # 先计算出下标
            return self._hash(key) % self.table_size 
            
由于 数组大小的限制，哈希表总是会碰撞，出现两个字符串对应一个下标的情况

碰撞应对： 使用数组存储碰撞的结果，有几个键碰撞了就把几个键值存起来，取得时候遍历一下就行

        def get(self, key, default_value=None):
            index = self._index(key)
            # 取元素
            v = self.table[index]
            if isinstance(v, list):
                # 遍历检查 key
                for kv in v:
                    if kv[0] == key:
                        return kv[1]
            return default_value
    

## 链表

很基础的数据结构，是后面两个的基础

查询， 修改 复杂度 O(n)

插入，删除 复杂度 O(1)

### 遍历

从 head 节点开始遍历到 next 节点是 None

遍历输出

    class LinkedList(object):
        def __repr__(self):
            l = list()
            node = self.head
            while node is not None:
                l.append(node.element)
                node = node.next
            return str(l)

### 反转

设置一个节点存储反转后的链表，遍历每前进一步更新一下反转链表

        def reverse(self):
            node = self.head
            prev_node = None
            while node is not None:
                node_next = node.next
                node.next = prev_node
                prev_node = node
                node = node_next
            self.head = prev_node

## 二叉树

链表一个节点上有两个指向其他节点的节点是就是二叉树

### 遍历

分别递归左右分支完成遍历

    class Tree(object):
     def __init__(self, element=None):
        self.element = element
        self.left = None
        self.right = None
        
     def traversal(self):
        print(self.element)
        if self.left is not None:
            self.left.traversal()
        if self.right is not None:
            self.right.traversal()

### 反转

交换左右节点
分别递归左右分支完成遍历

    def reverse(self):
        print(self.element)
        self.left, self.right = self.right, self.left
        if self.left is not None:
            self.left.reverse()
        if self.right is not None:
            self.right.reverse()

## 图

一个节点连接了很多个其他节点，其他节点之间由相互连接。重要的是在这些连接中找到最短路径。
