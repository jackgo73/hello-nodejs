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

	for i := 0; i < len(p); i++ {
		fmt.Println(i, p[i])
	}
}
