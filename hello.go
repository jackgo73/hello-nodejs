/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell"] = Vertex{
		40, -74,
	}
	fmt.Println(m["Bell"])

	var n = map[string]Vertex{
		"Bell": Vertex{
			10, 20,
		},
		"Google": Vertex{
			20, 30,
		},
	}

	fmt.Println(n)

}
