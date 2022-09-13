package main

import (
	"fmt"
	"log"
	"main/pkg/socket"
	"net/http"
)

// Define websocket service processing functions
func serveWs(pool *socket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	// Update to websocket connection
	conn, err := socket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}

	client := &socket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := socket.NewPool()
	go pool.Start()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if _, err := fmt.Fprintf(w, "Simple Server"); err != nil {
			log.Fatal(err)
		}
	})

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}