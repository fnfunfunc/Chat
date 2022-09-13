let socket = new WebSocket("ws://localhost:8080/ws")

function connect(updatePage: (_: MessageEvent<string>) => void) {
    console.log("Attempting connection...");

    socket.onopen = () => {
        console.log("Successfully connected");
    };

    socket.onmessage = (msg: MessageEvent<string>) => {
        console.log(msg);
        updatePage(msg);
    };

    socket.onclose = (event: CloseEvent) => {
        console.log("Socket closed connection: ", event);
    };

    socket.onerror = (error: Event) => {
        console.log("Socket error: ", error)
    };
}

function sendMsg (msg: string) {
    console.log("Sending msg: ", msg);
    socket.send(msg);
}

export { connect, sendMsg }