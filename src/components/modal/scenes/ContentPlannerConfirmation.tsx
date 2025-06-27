import placeholder from "../../../../public/image-placeholder.png";
import logo from "../../../../public/Vektrus_wh.svg";
import React, { useRef, useState } from "react";
import DatePicker from "../pickers/DatePicker";
import TimePicker from "../pickers/TimePicker";
import StatusAndPlatform from "../StatusAndPlatform";
import {usePostContext} from "../../../context/PostContext";

type Props = {
    postings: any;
    setPostings: (data: any) => void;
    stackCount: number;
    setStep: (step: number) => void;
    setStackCount: (count: number) => void;
    onClose: () => void;
};


const ContentPlannerConfirmation = ({ postings, setPostings, stackCount, setStep, setStackCount, onClose}:Props) => {
    const [isEditingText, setIsEditingText] = useState(false);
    const [currentPost, setCurrentPost] = useState(0);
    const { addPost } = usePostContext();
    const textRef = useRef(null);
    const [showImagePreview, setShowImagePreview] = useState(false);

    const handleImageClick = () => {
        if (postings[currentPost].image) {
            setShowImagePreview(true);
        }
    };

    const handleTextClick = () => {
        setIsEditingText(true);
        setTimeout(() => {
            textRef.current && textRef.current.focus();
        }, 0);
    };

    const handleTextBlur = () => {
        setIsEditingText(false);
    };

    const handlePlanning = () => {
        updateCurrentPost("status", "geplant")
        addPost(postings[currentPost]);
        if(currentPost === postings.length - 1) {
            onClose()
            return;
        }
        setCurrentPost(currentPost + 1);
        setStackCount(stackCount - 1);
    }

    const handleConfirmation = () => {
        addPost(postings[currentPost]);
        if(currentPost === postings.length - 1) {
            onClose()
            return;
        }
        setCurrentPost(currentPost + 1);
        setStackCount(stackCount - 1);
    }

    const updateCurrentPost = (field, value) => {
        const updatedPostings = [...postings];
        updatedPostings[currentPost] = {
            ...updatedPostings[currentPost],
            [field]: value,
        };
        setPostings(updatedPostings);
    };

    return (
        <>
            <div className="py-4 border-b">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <input
                            type="text"
                            value={postings[currentPost].title || ""}
                            onChange={(e) => updateCurrentPost("title", e.target.value)}
                            placeholder="Titel eingeben"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-button focus:border-transparent"
                        />
                    </div>
                    <div className="col-span-5">
                        <DatePicker
                            value={postings[currentPost].date}
                            selected={postings[currentPost].date}
                            onChange={(date) => updateCurrentPost("date", date)}
                            required
                        />
                    </div>
                    <div className="col-span-3">
                        <TimePicker
                            value={postings[currentPost].time}
                            selected={postings[currentPost].time}
                            onChange={(time) => updateCurrentPost("time", time)}
                            required
                        />
                    </div>
                </div>
            </div>
            <StatusAndPlatform formData={postings[currentPost]} />
            <div className="p-6">
                <div className="px-8">
                    <img
                        src={postings[currentPost].image || placeholder}
                        alt="Bild"
                        className="w-full h-72 object-cover rounded-lg mb-4"
                        onClick={handleImageClick}
                    />
                    <div className="flex justify-end z-20 -mt-14 mb-14 pr-2">
                        <button
                            onClick={() => setStep(4)}
                            className="h-8 w-8 rounded-full bg-vektrus-button flex items-center justify-center"
                        >
                            <img src={logo} alt="vektrus-logo" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="cursor-pointer border-b pb-6 mb-6">
                        {isEditingText ? (
                            <textarea
                                ref={textRef}
                                value={postings[currentPost].text || ""}
                                onChange={(e) => updateCurrentPost("text", e.target.value)}
                                onBlur={handleTextBlur}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-button focus:border-transparent resize-none h-60"
                            />
                        ) : (
                            <p className="text-gray-700 whitespace-pre-line mt-2 max-h-80 overflow-auto">
                                {postings[currentPost].text ||
                                    "Beispieltext hinzufügen (Klick zum Bearbeiten)"}
                            </p>
                        )}
                    </div>
                    {!isEditingText && (
                        <div className="flex justify-end z-20 -mt-20 mb-12 pr-2">
                            <button
                                onClick={handleTextClick}
                                className="h-8 w-8 rounded-full bg-vektrus-button flex items-center justify-center"
                            >
                                <img src={logo} alt="vektrus-logo" className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center px-8">
                    <button
                        type="button"
                        onClick={handleConfirmation}
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        mit Vorbehalt
                    </button>
                    <button
                        type="button"
                        onClick={handlePlanning}
                        className="px-4 py-1 w-40 bg-vektrus-button rounded-lg hover:bg-vektrus-blue-light/80 transition-colors"
                    >
                        planen
                    </button>
                </div>
            </div>
        </>
    );
};

export default ContentPlannerConfirmation;
