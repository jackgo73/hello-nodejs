/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import (
	"fmt"
)


func main() {
	var z []int
	fmt.Println(z, len(z), cap(z))
	if z == nil {
		fmt.Println("nil!")
	}
}
