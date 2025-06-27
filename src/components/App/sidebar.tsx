import React, {useEffect, useState} from 'react';
import { store } from './store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {useCreatePostModal} from "../../hooks/useCreatePostModal";
import CreatePostModal from "../modal/CreatePostModal";
import CreatePostsFromContentPlanModal from "../modal/CreatePostsFromContentPlanModal";
import {useCreatePostsFromContentPlanModal} from "../../hooks/useCreatePostsFromContentPlanModal";

// Sidebar-Komponente innerhalb derselben Datei
export const Sidebar = observer(() => {
    useEffect(() => {
        store.generate_costumer_style();
    }, []);

    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const { isOpen, openModal, closeModal } = useCreatePostModal();
    const { isOpenPosts, openModalPosts, closeModalPosts } = useCreatePostsFromContentPlanModal();

    return (
        <div className={`flex flex-col bg-black py-2 shadow-[0_70px_120px_-30px_rgba(0,0,0,0.6)]`}>
            <div className={`${store.isHovered ? 'w-[450px]' : 'w-[100px]'}`}
                 onMouseEnter={() => store.isHovered = true}
                 onMouseLeave={() => store.isHovered = false}>
                <div className="flex justify-left items-center p-2">
                    <img src="/Vektrus_wh.svg" alt="logo" className="h-14 w-14 cursor-pointer ml-1"/>
                    <div className={`text-white text-5xl pl-14 ${store.isHovered ? '': 'hidden'}`}>Vektrus</div>
                </div>
                {/* Horizontale weiße Linie mit Abstand links und rechts */}
                <div className={`w-full my-4 px-8`}>
                    <div className={`border-t-2 ${store.isHovered ? 'border-white': 'border-black'}`}></div>
                </div>
                <div className="flex flex-col items-start p-2 mt-4 mb-6 space-y-6 ml-5 text-white text-xl">
                    <div className="flex min-h-8 cursor-pointer" onClick={openModalPosts}>
                        <img src="/home.svg" alt="home" className="h-7 w-7"/>
                        <div className={`ml-10 ${store.isHovered ? '': 'hidden'}`}>Content-Planer</div>
                    </div>
                    <div className="flex min-h-8 cursor-pointer" onClick={openModal}>
                        <img src="/home.svg" alt="home" className="h-7 w-7"/>
                        <div className={`ml-10 ${store.isHovered ? '': 'hidden'}`}>Post erstellen</div>
                    </div>
                </div>

                {/* Horizontale weiße Linie mit Abstand links und rechts */}
                <div className={`w-full px-8`}>
                    <div className={`border-t-2 ${store.isHovered ? 'border-white': 'border-black'}`}></div>
                </div>
                <div className="flex flex-col items-start p-2 mb-auto mt-8 space-y-6 ml-5 text-white text-xl">
                    <div className="flex min-h-8 cursor-pointer" onClick={() => navigateTo('/hubPage')}>
                        <img src="/home.svg" alt="home" className="h-7 w-7"/>
                        <div className={`ml-10 ${store.isHovered ? '': 'hidden'}`}>Home</div>
                    </div>
                    <div className="flex min-h-8 cursor-pointer">
                        <img src="/chat.svg" alt="chat" className="h-7 w-7"/>
                        <div className={`ml-10 font-bold ${store.isHovered ? '': 'hidden'}`}>Chat</div>
                    </div>
                    <div className="flex min-h-8 cursor-pointer">
                        <img src="/opus.svg" alt="chat" className="h-7 w-7"/>
                        <div className={`ml-10 ${store.isHovered ? '': 'hidden'}`}>Opus</div>
                    </div>
                    <div className="flex min-h-8 cursor-pointer">
                        <img src="/bilder.svg" alt="chat" className="h-7 w-7"/>
                        <div className={`ml-10 ${store.isHovered ? '': 'hidden'}`}>Bilder</div>
                    </div>
                </div>
                <div className="flex justify-left items-center p-2 mt-auto ml-2 cursor-pointer"
                     onClick={() => toggleDropdown()}>
                    <div
                        className={`text-white p-2 rounded-full w-12 h-12 flex justify-center items-center text-3xl`}
                        style={{ backgroundColor: `${store.costumerStyle.color}` }}
                    >
                        <>{store.costumerStyle.name}</>
                    </div>
                    <div className={`ml-10 text-white text-xl ${store.isHovered ? '': 'hidden'}`}>Mein Account</div>
                </div>
                {showDropdown && (
                    <div className="absolute left-6 bottom-24 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                        <a href="/profilePage"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profilseite</a>
                        <a href="/"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ausloggen</a>
                    </div>
                )}

            </div>
            {isOpen && <CreatePostModal isOpen={isOpen} onClose={closeModal} />}
            {isOpenPosts && <CreatePostsFromContentPlanModal isOpen={isOpenPosts} onClose={closeModalPosts} />}
        </div>
    );
});
