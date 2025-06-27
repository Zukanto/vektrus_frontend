import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { store } from './store';
import { observer } from 'mobx-react-lite';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';
import style from './markdown.module.css';
import { WebSocketService } from "./WebSocketService";


interface ChatProps {
    webSocketService: WebSocketService;
}


export const Chat = observer(({ webSocketService }: ChatProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        store.generate_threads();
        store.generate_costumer_style();
    }, []);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const goToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [store.messages]);

    useEffect(() => {
        goToBottom();
    }, [store.isHovered]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [store.input]);

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <div className="flex-grow overflow-auto p-4 w-full flex justify-center max-w-7xl">
                <div className="space-y-12 w-10/12">
                    {store.messages.map((message, index) => (
                        <div key={index} className="flex justify-between items-start space-x-2">
                            <div className="flex items-center">
                                <div
                                    className={`text-white text-3xl p-2 rounded-full w-12 h-12 flex justify-center items-center ${message.sender !== 'user' ? 'bg-gradient-to-br from-cyan-500 via-cyan-500 to-purple-500' : ''}`}
                                    style={{ backgroundColor: `${store.costumerStyle.color}` }}>
                                    {message.sender === 'user' ? store.costumerStyle.name : <img src="/Vektrus_wh.svg" alt="logo"
                                                                                                 className="h-full w-full cursor-pointer" />}
                                </div>
                            </div>
                            <div
                                className={`flex-grow text-gray-800 pb-3 px-3 rounded-b-lg rounded-r-lg`}>
                                <span className="font-bold text-xl">
                                    {message.sender === 'user' ? 'Ich' : 'Vektrus'}
                                </span>
                                <div>
                                    <div className="border-b-[0.5px] border-black w-5/12 my-1" />
                                    <ReactMarkdown children={(message.text).replace('\n', '  \n &nbsp;  ')} remarkPlugins={[gfm, breaks]} className={style.reactMarkDown} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="border-b-[0.5px] border-black w-6/12"></div>
            <div className="w-full px-4 justify-center items-center">
                <div className="p-4 w-full max-w-2xl mx-auto flex flex-col items-center space-y-2">
                    <div className="flex items-center w-full mb-14">
                        <textarea
                            ref={textareaRef}
                            className="flex-1 p-3 text-2xl bg-transparent border-none rounded-l-md w-full placeholder-black focus:outline-none"
                            placeholder="Nachricht eingeben..."
                            value={store.input}
                            onChange={(e) => store.input = e.target.value}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey && !store.isLoading) {
                                    console.log('trigger!')
                                    store.sendMessage(webSocketService);
                                }
                            }}
                            disabled={store.isLoading}
                        />
                        <button type="submit" className="px-6 py-4 flex items-center justify-center">
                            {store.isLoading ? (
                                <div className="spinner text-gray-900"></div>
                            ) : (
                                <img onClick={() => store.sendMessage(webSocketService)} src="/send.svg" alt="logo"
                                     className="h-6 w-6 cursor-pointer" />
                            )}
                        </button>
                    </div>

                    <span className="text-xs text-center">
                        © 2024 Vektrus. Alle Rechte vorbehalten. | <a href="/datenschutz"
                                                                      className="hover:underline">Datenschutz</a> | <a
                        href="/impressum" className="hover:underline">Impressum</a>
                    </span>
                </div>
            </div>
        </div>
    );
});