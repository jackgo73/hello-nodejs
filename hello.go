/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import (
	//"github.com/golang/tour/wc"
	"fmt"
)

func fibonacci() func() int {
	a := 0
	b := 1
	return func() int {
		c := a + b
		a = b
		b = c
		return c
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}