import React, { KeyboardEvent } from "react";
import "./ChatInput.scss";


interface ChatInputProps {
    send: (_: KeyboardEvent<HTMLInputElement>) => void
}

class ChatInput extends React.Component<ChatInputProps> {

    render(): React.ReactNode {
        return (
            <div className="ChatInput">
                <input onKeyDown={this.props.send} />
            </div>
        )
    }
}

export default ChatInput;