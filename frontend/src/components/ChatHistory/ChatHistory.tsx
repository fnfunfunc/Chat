import React from "react";
import Message from "../Message";
import "./ChatHistory.scss";


interface ChatHistoryProps {
    chatHistory: MessageEvent<string>[]
}

class ChatHistory extends React.Component<ChatHistoryProps> {
    

    render(): React.ReactNode {
        const messages = this.props.chatHistory.map((msg, index) => (
            <Message message={msg.data}/>
        ));

        return (
            <div className="ChatHistory">
                <h2>Chat History</h2>
                {messages}
            </div>
        )
    }
}

export default ChatHistory;