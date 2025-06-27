import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {store} from "./store";
import {observer} from "mobx-react-lite";

export const TopBar = observer(() => {
    useEffect(() => {
        store.generate_costumer_style();
    }, []);

    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div>
            <div
                className="flex fixed top-0 left-0 right-0 z-10 justify-between items-center p-4 bg-black text-white text-lg h-16">
                <div className="flex justify-start items-center h-16 w-fit">
                    <div className="relative group mr-5 ml-5 cursor-default">
                        <Link to="/hubPage">
                            HubPage
                        </Link>
                        <span
                            className="absolute -bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                    </div>
                    <div className="relative group mr-5 ml-5 cursor-default">
                        <Link to="/chatPage">
                            ChatPage
                        </Link>
                        <span
                            className="absolute -bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                    </div>
                    <div className="relative group mr-5 ml-5 cursor-default">
                        <span className="text-[#94a4b5]">
                            Statistik
                        </span>
                    </div>
                </div>
                <div className="flex items-center w-fit">
                    <div className="relative group mr-5 ml-5 justify-end">
                        <div className={'text-white p-1 cursor-pointer items-center w-12 h-12 text-center rounded-full text-4xl'}
                             onClick={() => toggleDropdown()}
                             style={{ backgroundColor: `${store.costumerStyle.color}`}}
                        >
                            <div>{store.costumerStyle.name}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="relative group h-16 p-4 cursor-default">
                    {showDropdown && (
                        <div className="absolute right-0 mt-14 mr-2 w-48 bg-white rounded-md shadow-lg py-2">
                            <a href="/profilePage"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profilseite</a>
                            <a href="/logout"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ausloggen</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
