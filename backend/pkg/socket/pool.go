package socket

import "fmt"

type Pool struct {
	Register chan *Client
	UnRegister chan *Client
	Clients map[*Client]bool
	Broadcast chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register: make(chan *Client),
		UnRegister: make(chan *Client),
		Clients: make(map[*Client]bool),
		Broadcast: make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <- pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of connection pool:", len(pool.Clients))
			for client := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{ Type: 1, Body: "New user joined..." })
			}
		case client := <- pool.UnRegister:
			delete(pool.Clients, client)
			fmt.Println("Size of connection pool: ", len(pool.Clients))
			for client := range pool.Clients {
				client.Conn.WriteJSON(Message{ Type: 1, Body: "User disconnected..." })
			}	
		case message := <- pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}