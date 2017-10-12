/*
	main 包为正则表达式实现了一个简单的库。

*/
package main

import (
	"fmt"
	"log"
	"net/http"
)

type Hello struct{}

func (h Hello) ServeHTTP(
	w http.ResponseWriter,
	r *http.Request) {
	fmt.Fprint(w, "Hello!")
}

func main() {
	var h Hello
	err := http.ListenAndServe("localhost:4010", h)
	if err != nil {
		log.Fatal(err)
	}
}
