import React, { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { ChatHistory } from './chatHistory';
import { Chat } from './chat';
import { store } from './store';
import { WebSocketService } from './WebSocketService';

const ChatPage: React.FC = () => {
    const [webSocketService, setWebSocketService] = useState<WebSocketService | null>(null);
    const [messageBuffer, setMessageBuffer] = useState<string>(''); // Puffer für den Nachrichten-Stream

    useEffect(() => {
        const wsService = new WebSocketService(`wss://${window.location.hostname}`, handleMessage);
        setWebSocketService(wsService);

        function handleMessage(raw_message: string) {
            const message = JSON.parse(raw_message);
            if (message.done || message.text === undefined) {
                setMessageBuffer('');
                store.isLoading = false; // Laden stoppen
            } else {

                setMessageBuffer(prevBuffer => {
                    const updatedBuffer = prevBuffer + message.text;

                    store.messages[store.messages.length - 1] = {
                        id: store.messages.length,
                        text: updatedBuffer,
                        sender: 'bot',
                    };

                    return updatedBuffer;
                });
            }
        }

        return () => {
            wsService.close();
        };
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-white to-[#B4D6DD]">
            <div className="flex row h-full">
                <Sidebar />
                <ChatHistory />
                {webSocketService && <Chat webSocketService={webSocketService} />}
            </div>
        </div>
    );
}

export default ChatPage;
