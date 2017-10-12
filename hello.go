/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import "fmt"

func main() {
	c := make(chan int, 2)
	c <- 1
	c <- 2

	fmt.Println(<-c)
	fmt.Println(<-c)
}

