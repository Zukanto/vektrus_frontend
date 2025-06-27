import React from 'react';
import { store } from './store';
import { observer } from 'mobx-react-lite';

// Chat history
export const ChatHistory = observer(() => {
    return (
        <div className={`flex flex-col ${store.isHovered ? 'w-0' : 'w-[350px]'} bg-gray-900 text-white overflow-auto shadow-[0_70px_120px_-30px_rgba(0,0,0,0.6)]`}>
            <h2 className="text-3xl p-4 ml-2">Chats</h2>
            <div className="flex justify-center p-4">
                <button onClick={() => store.createNewChat()}
                        className="text-gray-900 bg-[#91E0FE] hover:bg-opacity-50 text-lg py-1.5 px-4 mx-2 rounded-xl w-full">
                    Neuer Chat +
                </button>
            </div>
            {store.threads.map(thread => {
                return(
                <div key={thread.id}
                     onClick={() => store.thread_click(thread.id)}
                     className="flex justify-between items-center p-4 hover:bg-opacity-50 hover:bg-[#91E0FE] cursor-pointer"
                     data-itype="generate">
                    {thread.edit ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={thread.thread_name}
                                onChange={(event) => thread.thread_name = event.target.value}
                                className="border rounded p-1 mr-2 w-[165px] bg-transparent text-white"
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                maxLength={20}
                            />
                            <button onClick={(event) => {
                                event.stopPropagation();
                                store.editSummary(thread.id, thread.thread_name);
                                thread.edit = false;
                            }}
                                    className="text-white hover:text-green-700 font-bold py-1 px-2 rounded mr-2"
                                    data-itype="save">
                                <img src="/check.svg" alt="save" className="h-4 w-4 cursor-pointer"/>
                            </button>
                            <button onClick={(event) => {
                                event.stopPropagation();
                                store.generate_threads();
                                thread.edit = false;
                            }}
                                    className="text-white hover:text-red-700 font-bold py-1 px-2 rounded"
                                    data-itype="cancel">
                                <img src="/cancel.svg" alt="cancel" className="h-4 w-4 cursor-pointer"/>
                            </button>
                        </div>
                    ) : (
                        <>
                            <span>{thread.thread_name}</span>
                            <div className="flex">
                                <button onClick={(event) => {
                                    event.stopPropagation();
                                    thread.edit = true;
                                }}
                                        className="text-white hover:text-red-700 font-bold py-1 px-2 rounded"
                                        data-itype="edit">
                                    <img src="/edit.svg" alt="edit" className="h-4 w-4 cursor-pointer"/>
                                </button>
                                <button onClick={(event) => {
                                    event.stopPropagation();
                                    store.deleteChat(thread.id);
                                    store.generate_threads();
                                }}
                                        className="text-white hover:text-red-700 font-bold py-1 px-2 rounded ml-2"
                                        data-itype="delete">
                                    <img src="/trash.svg" alt="delete" className="h-4 w-4 cursor-pointer"/>
                                </button>
                            </div>
                        </>
                    )}
                </div>

            )})}
        </div>
    );
});
