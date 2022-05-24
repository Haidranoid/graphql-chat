import {gql} from '@apollo/client';
import client from './client';

export const messagesQuery = gql`
    query MessagesQuery {
        messages {
            id
            from
            text
        }
    }
`;

export const addMessageMutation = gql`
    mutation AddMessageMutation($input: MessageInput!) {
        message: addMessage(input: $input) {
            id
            from
            text
        }
    }
`;

export const messageAddedSubscription = gql`
    subscription {
        messageAdded {
            id
            from
            text
        }
    }
`

export const addMessage = async (text) => {
    const {data} = await client.mutate({
        mutation: addMessageMutation,
        variables: {input: {text}},
    });
    return data.message;
}

export const getMessages = async () => {
    const {data} = await client.query({query: messagesQuery});
    return data.messages;
}

export const onMessageAdded = handleMessageCb => {
    const observable = client.subscribe({query: messageAddedSubscription});

    return observable.subscribe(result => {
        handleMessageCb(result.data.messageAdded)
    })
}
