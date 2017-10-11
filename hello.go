/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import (
	"fmt"
)

type Vertex struct {
	X, Y int
}

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0],a[1])
	fmt.Println(a)
}
