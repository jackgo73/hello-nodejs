/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import (
	"fmt"
)

func main() {
	p := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(p)

	fmt.Println(p[1:4])
	fmt.Println(p[:3])
	fmt.Println(p[4:])
}
