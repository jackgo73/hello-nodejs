/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import "fmt"




func main() {
	m := make(map[string]int)
	m["A"] = 42
	fmt.Println(m["A"])

	m["B"] = 48
	fmt.Println(m["B"])

	delete(m,"A")
	fmt.Println(m["A"])

	v, ok := m["A"]
	fmt.Println(v,ok)

}
