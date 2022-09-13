import React from "react";
import "./Message.scss";

interface UserMessage {
    type: number,
    body: string
}

interface MessageProps {
    message: string
}

interface MessageState {
    message: UserMessage
}



class Message extends React.Component<MessageProps, MessageState> {

    constructor(props: MessageProps) {
        super(props);
        let temp = JSON.parse(this.props.message) as UserMessage;
        this.state = {
            message: temp
        };
    }

    render(): React.ReactNode {
        return (
            <div className="Message">
                {this.state.message.body}
            </div>
        )
    }
}

export default Message;