---
title: MathJax公式语法
date: 2017-10-18 16:24:16
categories: Latex
tags:
    - latex
    - hexo
---

# 常用语法

![](/images/2017-10-19-Latex-HexoMathJax-0.jpg)

# 分段函数

分段函数格式为`f(x)=\begin{cases}语句1\\语句2\\...\end{cases}`

`\text{文字}`中仍可以使用`$公式$`去插入其他公式，所以可以将其结合分段函数一起使用。

**实例**
md文本

```
$$ 
f(n)=\begin{cases}
n/2, & \text{如果$ x<=2 $}\\
3n+1, & \text{如果$ x>2 $}
\end{cases}
$$
```

**最终效果**
$$
f(n)=\begin{cases}
n/2, & \text{如果$ x<=2 $}\\
3n+1, & \text{如果$ x>2 $}
\end{cases}
$$

# 大括号和小括号

`()、[]、{}`表示的即是符号本身，使用`\{\}`来表示`{}`。但是如果要显示大号的括号时，需要使用`\left`和`\right`命令。

**实例**

md文本

```
$$
f([\frac{1+\{x,y\}}{(\frac{x}{y}+\frac{y}{x})(u+1)}+a]^{3\2})
$$
```

**最终效果**
$$
f([\frac{1+\{x,y\}}{(\frac{x}{y}+\frac{y}{x})(u+1)}+a]^{3\2})
$$
md文本

```
$$
f\left(
    \left[
        \frac{
            1+\left\{x,y\right\}
        }{
        \left(
            \frac{x}{y}+\frac{y}{x}
        \right)
        \left(u+1\right)
        }+a
    \right]^{3\2}
\right)
$$
```

**最终效果**

(有问题)

# 添加删除线

使用删除线功能必须使用**行间公式**，删除线分为**片段删除线**和**整段删除线**，样式比较多，在这里我只列举一种比较常用的**水平删除线**，它属于整段删除线的一种。

**整段删除线**使用`\require{enclose}`来显示，声明整段删除线后，使用`\enclose{删除线效果}{字符}`来实现删除线效果，而**水平删除线**效果用关键字`horizontalstrike`。

**实例：**

md文本

```
$$
\require{enclose}\begin{array}{}
\enclose{horizontalstrike}{x+y}\\
\enclose{horizontalstrike}{x*y}\\
\end{array}
$$
```

**最终效果**
$$
\require{enclose}\begin{array}{}
\enclose{horizontalstrike}{x+y}\\
\enclose{horizontalstrike}{x*y}\\
\end{array}
$$
