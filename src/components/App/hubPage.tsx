import React, { useState, useEffect } from "react";
import { TopBar } from "./topBar";
import {store} from './store';

const HubPage: React.FC = () => {
    const [news, setNews] = useState<any[]>([]);
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            //const newsData = await store.get_news();
            //console.log(newsData)
            setNews([{headline:'Vektrus Testversion', content:[{subline: 'Wilkommen bei Vektrus', text: 'Dies ist Vektrus testversion 0.1.1'}]}]);
            //setNews([...newsData]);
        }
        fetchNews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if(prev < 10)
                    setFade(true);
                if(prev >= 99)
                    setFade(false);
                if (prev >= 100) {
                    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % news.length);
                    return 0;
                }
                return prev + 1;
            });
        }, 500);
        return () => clearInterval(interval);
    }, [news.length]);

    const handleArticleChange = (index: number) => {
        setCurrentArticleIndex(index);
        setProgress(0); // Reset progress when manually changing article
    };

    const generateArticleContent = (contentObject: {headline:string, content:[{subline? : string, text: string}]}) => {
        const content = [];
        content.push(<h1 className="text-2xl mb-5">{contentObject.headline}</h1>)
        for (const contentElement of contentObject.content){
            contentElement.subline?
                content.push(<div className="mt-4"><h3 className="text-xl mb-1">{contentElement.subline}</h3><p>{contentElement.text}</p></div>):
                content.push(<div className="mt-2"><p>{contentElement.text}</p></div>);
        }
        return content;
    }

    return (
        <div className="h-screen overflow-hidden">
            <TopBar />
            <div className="flex flex-col pt-16 h-full bg-gradient-to-br from-white to-[#B4D6DD]">
                <div className="flex flex-col items-center h-full">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mt-11">
                        <div className="flex items-start justify-stretch transition-all">
                            {news.length > 0 && (
                                <div className={`w-full transition-all duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
                                    {generateArticleContent(news[currentArticleIndex])}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center mt-4">
                            {news.map((_, index) => (
                                <div key={index} className="relative mx-1">
                                    <button
                                        className={`w-3 h-3 rounded-full ${index === currentArticleIndex ? 'bg-[#5f96a1]' : 'bg-gray-200'}`}
                                        onClick={() => handleArticleChange(index)}
                                    ></button>
                                    {index === currentArticleIndex && (
                                        // todo Holy shit thats shit
                                        <div className="absolute w-5 h-5" style={{marginLeft:'-4px', marginTop:'-16px'}}>
                                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                                <path
                                                    className="circle-bg"
                                                    d="M18 2.0845
                                                       a 15.9155 15.9155 0 0 1 0 31.831
                                                       a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <path
                                                    className="circle"
                                                    strokeDasharray={`${progress}, 100`}
                                                    d="M18 2.0845
                                                       a 15.9155 15.9155 0 0 1 0 31.831
                                                       a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <span className="absolute inset-x-0 bottom-0 text-xs text-center">
                © 2024 Vektrus. Alle Rechte vorbehalten. | <a href="/datenschutz" className="hover:underline">Datenschutz</a> | <a href="/impressum" className="hover:underline">Impressum</a>
            </span>
        </div>
    );
};

export default HubPage;
