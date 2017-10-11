/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import (
	"fmt"
)

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1,2}
	v.X = 4

	p := &v

	fmt.Println(p.X)
}