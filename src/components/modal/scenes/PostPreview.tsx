import placeholder from "../../../../public/image-placeholder.png";
import logo from "../../../../public/Vektrus_wh.svg";
import React, {useRef, useState} from "react";
import DatePicker from "../pickers/DatePicker";
import TimePicker from "../pickers/TimePicker";
import StatusAndPlatform from "../StatusAndPlatform";
import {usePostContext} from "../../../context/PostContext";

type Props = {
    formData: any;
    setFormData: (data: any) => void;
    setStep: (step: number) => void;
    onClose: () => void;
}

const PostPreview = ({formData, setFormData, setStep, onClose}:Props) => {

    const [isEditingText, setIsEditingText] = useState(false);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const {addPost} = usePostContext()

    const handleImageClick = () => {
        if (formData.image) {
            setShowImagePreview(true);
        }
    };

    const handleTextClick = () => {
        setIsEditingText(true);
        setTimeout(() => {
            textRef.current?.focus();
        }, 0);
    };

    const handleTextBlur = () => {
        setIsEditingText(false);
    };

    const handleConfirmation = () => {
        addPost(formData);
        onClose()
    }


    return (
        <>
            <div className="border-b py-4">
                    <div className={"grid grid-cols-12 gap-4"}>
                        <div className={'col-span-4'}>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="Titel eingeben"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-button focus:border-transparent"
                            />
                        </div>
                        <div className={'col-span-5'}>
                            <DatePicker
                                value={formData.date}
                                selected={formData.date}
                                onChange={(date) => setFormData({...formData, date})}
                                required
                            />
                        </div>
                        <div className={'col-span-3'}>
                            <TimePicker
                                value={formData.time}
                                selected={formData.time}
                                onChange={(time) => setFormData({...formData, time})}
                                required
                            />
                        </div>
                    </div>
            </div>
            <StatusAndPlatform formData={formData}/>
            <div className={"p-6"}>
                <div className={"px-8"}>
                    <img
                        src={formData.image || placeholder}
                        alt="Bild"
                        className="w-full h-72 object-cover rounded-lg mb-4"
                        onClick={handleImageClick}
                    />
                    <div class={"flex justify-end z-20 -mt-14 mb-14 pr-2"}>
                        <button onClick={() => setStep(4)}
                                className={"h-8 w-8 rounded-full bg-vektrus-button flex items-center justify-center"}>
                            <img src={logo} alt={"vektrus-logo"} className={"w-6 h-6"}/>
                        </button>
                    </div>
                    <div className="cursor-pointer border-b pb-6 mb-6">
                        {isEditingText ? (
                            <textarea
                                ref={textRef}
                                value={formData.text}
                                onChange={(e) => setFormData({...formData, text: e.target.value})}
                                onBlur={handleTextBlur}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-button focus:border-transparent resize-none h-60"
                            />
                        ) : (
                            <p className="text-gray-700 whitespace-pre-line mt-2 max-h-80 overflow-auto">
                                {formData.text || 'Beispieltext hinzufügen (Klick zum Bearbeiten)'}
                            </p>
                        )}
                    </div>
                    {isEditingText ? null : (
                        <div class={"flex justify-end z-20 -mt-20 mb-12 pr-2"}>
                            <button onClick={handleTextClick}
                                    className={"h-8 w-8 rounded-full bg-vektrus-button flex items-center justify-center"}>
                                <img src={logo} alt={"vektrus-logo"} className={"w-6 h-6"}/>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center px-8">
                    <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        zurück
                    </button>
                    <button
                        onClick={handleConfirmation}
                        className="px-4 py-1 w-40 bg-vektrus-button rounded-lg hover:bg-vektrus-blue-light/80 transition-colors"
                    >
                        abschicken
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostPreview;