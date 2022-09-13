import React, { KeyboardEvent } from "react";
import Header from "./components/Header";
import { connect, sendMsg } from "./api";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput"


interface AppState {
    chatHistory: MessageEvent<string>[]
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { chatHistory: [] };
        this.send = this.send.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    componentDidMount(): void {
        connect(this.onMessage);   
    }

    send(event: KeyboardEvent) {
        if (event.key === "Enter") {
            let target = event.target as HTMLInputElement;
            sendMsg(target.value);
            target.value = "";
        }
    }

    onMessage(msg: MessageEvent<string>) {
        console.log("New message");
        this.setState((prevState) => ({
            chatHistory: [...prevState.chatHistory, msg]
        }))
        console.log(this.state);
    }

    render(): React.ReactNode {
        return (
            <div className="App">
                <Header />
                <ChatHistory chatHistory={this.state.chatHistory} />
                <ChatInput send={this.send} />
            </div>
        )
    }
}

export default App;