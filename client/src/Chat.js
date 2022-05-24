import React, {useState, useEffect} from 'react';
import {useQuery, useMutation, useSubscription} from "@apollo/react-hooks";
import {addMessageMutation, messageAddedSubscription} from './graphql/queries';
import {messagesQuery} from './graphql/queries'
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const useChatMessage = () => {
    //const [messages, setMessages] = useState([])

    const {data} = useQuery(messagesQuery);
    const messages = data ? data.messages : [];
    //useQuery(messagesQuery, {
    //    onCompleted: data => setMessages(data.messages),
    //});

    const [addMessage, {_loading, _error, _data, _called}] = useMutation(addMessageMutation)

    //const {data} = useSubscription(messageAddedSubscription)
    //useSubscription(messageAddedSubscription, {
    //    onSubscriptionData: result => {
    //        const {subscriptionData: {data: {messageAdded}}} = result;
    //        setMessages(messages.concat(messageAdded))
    //    }
    //});

    useSubscription(messageAddedSubscription, {
        onSubscriptionData: result => {
            const {subscriptionData, client} = result;
            client.writeQuery({
                query: messagesQuery,
                data: {
                    messages: messages.concat(subscriptionData.data.messageAdded)
                }
            })
        }
    });

    return {
        messages,
        addMessage: (text) => addMessage({variables: {input: {text}}}),
    }
}

const Chat = ({user}) => {
    const {messages, addMessage} = useChatMessage()


    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Chatting as {user}</h1>
                <MessageList user={user} messages={messages}/>
                <MessageInput onSend={addMessage}/>
            </div>
        </section>
    );
}

export default Chat;
