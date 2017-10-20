---
title: Latex-MathJax
date: 2017-10-19 17:16:48
categories: Latex
tags:
    - latex
    - hexo
---

# 插入公式

- 如果是在文本中插入公式，则用`$...$`。
- 如果公式自成段落，则使用`$$...$$`。

# 多行公式

如果要写出多行公式，就使用

```l
\begin{equation}\begin{split} 
end{split}\end{equation}
```

`\\` 符号表示换行，再使用`&`符号表示要对齐的位置，例子如下

```
\begin{equation}\begin{split}
H(Y|X)&=\sum_{x\in X} p(x)H(Y|X)\\
&=-\sum_{x\in X} p(x)\sum_{y\in Y}p(y|x)\log p(y|x)\\
&=-\sum_{x\in X} \sum_{y\in Y}p(y,x)\log p(y|x)
\end{split}\end{equation}
```

$$
\begin{equation}\begin{split}
H(Y|X)&=\sum_{x\in X} p(x)H(Y|X)\\
&=-\sum_{x\in X} p(x)\sum_{y\in Y}p(y|x)\log p(y|x)\\
&=-\sum_{x\in X} \sum_{y\in Y}p(y,x)\log p(y|x)
\end{split}\end{equation}
$$

# 字体

使用`\mathbb`或`\Bbb`来显示黑板粗体字，$\Bbb A\Bbb B\Bbb C\Bbb D\Bbb a\Bbb b\Bbb c\Bbb d$

使用`\mathbf`来显示粗体字，$\mathbf A \mathbf B \mathbf C \mathbf D\mathbf a\mathbf b\mathbf c\mathbf d$

使用`\mathtt`来显示打印式字体，$\mathtt A\mathtt B\mathtt C\mathtt D\mathtt a\mathtt b\mathtt c\mathtt d$

使用`\mathrm`来显示罗马字体，$\mathrm A\mathrm B\mathrm C\mathrm D\mathrm a\mathrm b\mathrm c\mathrm d$

使用`\mathcal`来显示手写字体，$\mathcal A\mathcal B\mathcal C\mathcal D\mathcal a\mathcal b\mathcal c\mathcal d$

使用`\mathscr`来显示剧本字体，$\mathscr A\mathscr B\mathscr C\mathscr D\mathscr a\mathscr b\mathscr c\mathscr d$

使用`\mathfrak`来显示Fraktur字母(一种旧的德国字体)，$\mathfrak A\mathfrak B\mathfrak C\mathfrak D\mathfrak a\mathfrak b\mathfrak c\mathfrak d$

 # 分组

通过大括号`{}`将操作数与符号分割开，消除二义性。例如，若使用`x^10`，其效果为$x^10$，这里就要用到大括号，`x^{10}`，最终效果为$x^{10}$。

# 空间

MathJax 通常用自己的一套复杂策略来决定公式的空间距离。直接在两个元素之间加入空格是毫无用处的。因此为了增加空间距离，使用`\,`可以增加稍许空间；使用`\;`可以增加更多的空间；`\quad`和`\qquad`分别对应更大的空间。

# 希腊字母

| 大写字母       | 实现         | 小写字母       | 实现         |
| ---------- | ---------- | ---------- | ---------- |
| $A$        | `A`        | $\alpha$   | `\alpha`   |
| $B$        | `B`        | $\beta$    | `\beta`    |
| $\Gamma$   | `\Gamma`   | $\gamma$   | `\gamma`   |
| $\Delta$   | `\Delta`   | $\delta$   | `\delta`   |
| $E$        | `E`        | $\epsilon$ | `\epsilon` |
| $z$        | `Z`        | $\zeta$    | `\zeta`    |
| $H$        | `H`        | $\eta$     | `\eta`     |
| $\Theta$   | `\Theta`   | $\theta$   | `\theta`   |
| $\Lambda$  | `\Lambda`  | $\lambda$  | `\lambda`  |
| $M$        | `M`        | $\mu$      | `\mu`      |
| $N$        | `N`        | $\nu$      | `\nu`      |
| $\Xi$      | `\Xi`      | $\xi$      | `\xi`      |
| $O$        | `O`        | $\omicron$ | `\omicron` |
| $\Pi$      | `\Pi`      | $pi$       | `\pi`      |
| $P$        | `P`        | $\rho$     | `\rho`     |
| $\Sigma$   | `\Sigma`   | $\sigma$   | `\sigma`   |
| $T$        | `T`        | $\tau$     | `\tau`     |
| $\Upsilon$ | `\Upsilon` | $\upsilon$ | `\upsilon` |
| $\Phi$     | `\Phi`     | $\phi$     | `\phi`     |
| $x$        | `X`        | $\chi$     | `\chi`     |
| $\Psi$     | `\Psi`     | $$\psi$$   | `\psi`     |
| $\Omega$   | `\Omega`   | $\omega$   | `\omega`   |

# 数学符号

## 上标与下标

上标或小标只需在后面加上`^ 或 _`。另外需要注意的是，如果上下标不止一个字符，就需要用大括号括起来，表示是一个整体，`{...}`。

## 分式

有两种方式做到这个效果。 

1. 使用`\frac ab`。如`\frac {1+a}{4+b}`，效果为$\frac {1+a}{4+b}$; 

2. 使用`a \over b`。如`{1+a} \over {4+b}`，效果为${1+a} \over {4+b}$。 

**一般推荐使用第二种**

## 根式

平方根： 
`\sqrt{x^3}`，效果为$\sqrt{x^3}$；

其余： 
`\sqrt[4]{\frac xy}`，效果为$\sqrt[4]{\frac xy}$。

## 关系比较符号

| 符号     | 表示     |
| ------ | ------ |
| $\lt$  | `\lt`  |
| $\gt$  | `\gt`  |
| $\le$  | `\le`  |
| $\ge$  | `\ge`  |
| $\neq$ | `\neq` |

## 运算符号

| 运算符      | 表示       |
| -------- | -------- |
| $+$      | `+`      |
| $-$      | `-`      |
| $\times$ | `\times` |
| $\div$   | `\div`   |
| $\pm$    | `\pm`    |
| $\mp$    | `\mp`    |
| $\cdot$  | `\cdot`  |

## 集合符号

| 符号            | 表示            |
| ------------- | ------------- |
| $\cup$        | `\cup`        |
| $\cap$        | `\cap`        |
| $\setminus$   | `\setminus`   |
| $\subset$     | `\subset`     |
| $\subseteq$   | `\subseteq`   |
| $\subsetneq$  | `\subsetneq`  |
| $\supset$     | `\supset`     |
| $\in$         | `\in`         |
| $\notin$      | `\notin`      |
| $\emptyset$   | `\emptyset`   |
| $\varnothing$ | `\varnothing` |

## 箭头符号

| 符号            | 表示            |
| ------------- | ------------- |
| $\to$         | `\to`         |
| $\rightarrow$ | `\rightarrow` |
| $\leftarrow$  | `\leftarrow`  |
| $\Rightarrow$ | `\Rightarrow` |
| $\Leftarrow$  | `\Leftarrow`  |
| $\mapsto$     | `\mapsto`     |
| $\Uparrow$    | `\Uparrow`    |
| $\uparrow$    | `\uparrow`    |
| $\Downarrow$  | `\Downarrow`  |
| $\downarrow$  | `\downarrow`  |

## 特殊符号

| 符号                | 表示                                     |
| ----------------- | -------------------------------------- |
| $\infty$          | `\infty`                               |
| $\nabla$          | `\nabla`                               |
| $\partial$        | `\partial`                             |
| $\approx$         | `\approx`                              |
| $\sim$            | `\sim`                                 |
| $\simeq$          | `\simeq`                               |
| $\cong$           | `\cong`                                |
| $\equiv$          | `\equiv`                               |
| $\prec$           | `\prec`                                |
| $\binom{n+1}{2k}$ | `{n+1 \choose 2k}` 或 `\binom{n+1}{2k}` |
| $\land$           | `\land`                                |
| $\lor$            | `\lor`                                 |
| $\lnot$           | `\lnot`                                |
| $\forall$         | `\forall`                              |
| $\exists$         | `\exists`                              |
| $\top$            | `\top`                                 |
| $\bot$            | `\bot`                                 |
| $\vdash$          | `\vdash`                               |
| $\vDash$          | `\vDash`                               |
| $\star$           | `\star`                                |
| $\ast$            | `\ast`                                 |
| $\oplus$          | `\oplus`                               |
| $\circ$           | `\circ`                                |
| $\bullet$∙        | `\bullet`                              |

## 括号

| 符号                  | 表示                  |
| ------------------- | ------------------- |
| $()$                | `()`                |
| $[]$                | `[]`                |
| $\{\}$              | `\{ \}`             |
| $\langle$           | `\langle`           |
| $\rangle$           | `\rangle`           |
| $\lceil x \rceil$   | `\lceil x \rceil`   |
| $\lfloor x \rfloor$ | `\lfloor x \rfloor` |

**原始括号不会自适应算式的大小，需要在括号外面加上\left(…\right)**

## 求和、积分、极限与连乘

| 运算符  | 表示      | 示例                                    | 表示                                    |
| ---- | ------- | ------------------------------------- | ------------------------------------- |
| ∑    | `\sum`  | $\sum_{k=-\infty}^{\infty}X(k\Omega)$ | `\sum_{k=-\infty}^{\infty}X(k\Omega)` |
| ∫    | `\int`  | $\int_{-T/ 2}^{T/2}x(t)dt$            | `\int_{-T/ 2}^{T/2}x(t)dt`            |
| ∬    | `\iint` |                                       |                                       |
| ∏    | `\prod` | $\prod_{i=1}^{n}i$                    | `\prod_{i=1}^{n}i`                    |
| lim  | `\lim`  | $\lim\limits_{n \to \infty}$          | `\lim\limits_{n \to \infty}`          |

## 顶部符号

| 符号                       | 表示                       |
| ------------------------ | ------------------------ |
| $\hat x$                 | `\hat x`(单符号)            |
| $\widehat {xy}$          | `\widehat {xy}`          |
| $\overline {xyz}$        | `\overline {xyz}`        |
| $\vec {ab}$              | `\vec {ab}`(最多两个符号)      |
| $\overrightarrow {abcd}$ | `\overrightarrow {abcd}` |
| $\dot a$                 | `\dot a`                 |
| $\ddot a$                | `\ddot a`                |

# 表格

在MathJax中插入表格需要`$$\begin{array}{列格式}…\end{array}$$`，在`\begin{array}`后需要表明每列的格式：`c`表示居中；`l`表示左对齐；`r`表示右对齐；`|`表示列分割线。每一行末用`\\`结束，用`&`分隔矩阵元素。用`\hline`表示行分割线。 

如：

```
$$
\begin{array}{c|lcr}
n & \text{Left} & \text{Center} & \text{Right} \\
\hline
1 & 0.24 & 1 & 125 \\
2 & -1 & 189 & -8 \\
3 & -20 & 2000 & 1+10i
\end{array}
$$
```

$$
\begin{array}{c|lc|r|}
n & \text{Left} & \text{Center} & \text{Right} \\
\hline
1 & 0.24 & 1 & 125 \\
2 & -1 & 189 & -8 \\
\hline
3 & -20 & 2000 & 1+10i
\end{array}
$$

# 矩阵

- 使用`$$\begin{matrix}…\end{matrix}$$`，每一行末用`\\`结束，用`&`分隔矩阵元素。 

   ```
   $$
     \begin{matrix}
     1 & 0 & 0 \\
     0 & 1 & 0 \\
     0 & 0 & 1 \\
     \end{matrix}
   $$
   ```
   $$
   \begin{matrix}
     1 & 0 & 0 \\
     0 & 1 & 0 \\
     0 & 0 & 1 \\
   \end{matrix}
   $$

- 如果要加括号，可以使用上面的括号符号。除此之外，还可以直接将`matrix`替换为`pmatrix`:
   $$
   \begin{pmatrix}
     1 & 0 & 0 \\
     0 & 1 & 0 \\
     0 & 0 & 1 \\
     \end{pmatrix}
   $$

- 其他括号`bmatrix` `Bmatrix` `vmatrix` `Vmatrix`

- 如果你想省略一些项，可以使用`\cdots` : $\cdots$    `\ddots` : $\ddots$    `\vdots` : $\vdots$

   ```
   $$
     \begin{pmatrix}
     1 & a_1 & a_1^2 & \cdots & a_1^n\\
     1 & a_2 & a_2^2 & \cdots & a_2^n \\
     \vdots & \vdots & \ddots & \vdots \\  
     1 & a_n & a_n^2 & \cdots & a_n^n  \\
     \end{pmatrix}
   $$
   ```

   $$
   \begin{pmatrix}
     1 & a_1 & a_1^2 & \cdots & a_1^n\\
     1 & a_2 & a_2^2 & \cdots & a_2^n \\
     \vdots & \vdots & \ddots & \vdots \\  
     1 & a_n & a_n^2 & \cdots & a_n^n  \\
     \end{pmatrix}
   $$

- 增广矩阵是使用前面的创建表格来实现

   ```
   $$ \left[
       \begin{array}{cc|c}
         1&2&3\\
         4&5&6
       \end{array}
   \right] $$
   ```
   $$
   \left[
       \begin{array}{cc|c}
         1&2&3\\
         4&5&6
       \end{array}
   \right]
   $$

- 文本段内使用矩阵，则需要用`\bigl(\begin{smallmatrix} ... \end{smallmatrix}\bigr)`    $\bigl( \begin{smallmatrix} a & b \\ c & d \end{smallmatrix} \bigr)$


## 分情况表达式

使用`\begin{cases}…\end{cases}`，每种情况开始前用`&`，用`\\`结束。 

```
$$
f(n) =
\begin{cases}
n/2,  & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd}
\end{cases}
$$
```

$$
f(n) =
\begin{cases}
n/2,  & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd}
\end{cases}
$$

如果想要更多的竖直空间，可以用`\\[2ex]`代替`\\`。

```
$$
f(n) =
\begin{cases}
\frac{n}{2},  & \text{if $n$ is even} \\[2ex]
3n+1, & \text{if $n$ is odd}
\end{cases}
$$
```

$$
f(n) =
\begin{cases}
\frac{n}{2},  & \text{if $n$ is even} \\[2ex]
3n+1, & \text{if $n$ is odd}
\end{cases}
$$

# 标记与引用

为了方便在文章中标记等式，通常使用`tag{yourtag}`,如果想在后面引用这个等式，就使用`\label{somelabel}` ，且放在tag的后面。(**引用的功能有问题**) 

例： `x=y+a\sin x \tag{*}`



$x=y+a\sin x \tag{*}$

为了在接下来引用这个式子，使用`\eqref{somelabel}` 

例： `x-\sin x \stackrel{\eqref{*}}=y`

$x-\sin x \stackrel{\eqref{*}}=y$

# 绝对值和模

绝对值可以使用`\lvert x\rvert` 表示∣x∣ ，对于向量的模长，则可以使用`\lVert v\rVert` ，$\lVert v\rVert$

# 高亮

为了显著表示某等式，可以使用`\bbox`

```
$$ \bbox[yellow]
{
e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n
\qquad (1)
}
$$
```

$$
\bbox[yellow]
{
e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n
\qquad (1)
}
$$

```
$$ \bbox[border:2px solid red]
{
e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n
\qquad (2) 
}
$$
```

$$
\bbox[border:2px solid red]
{
e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n
\qquad (2) 
}
$$

