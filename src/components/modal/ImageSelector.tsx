import placeholder from "../../../public/image-placeholder.png";
import React from "react";

type Props= {
    setStep: (step: number) => void;
}


const ImageSelector = ({setStep}: Props) => {
    return (
        <div>
            <div className="p-4 border-b">
                <div className={"flex justify-between px-2"}>
                    <h2 className="text-xl font-semibold text-vektrus-gray-dark">Bild wählen</h2>
                    <h2 className="text-xl font-semibold text-vektrus-gray-dark">Vektrus V1</h2>
                </div>
            </div>
            <div className={"p-6"}>
                <div className={"flex justify-end -mt-4 mb-4"}>
                    <button
                        type="button"
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Modell ändern
                    </button>
                </div>
                <div className={"grid grid-cols-2 gap-6 mb-12"}>
                    <div onClick={() => setStep(3)} className={"cursor-pointer hover:shadow-md hover-transition"}>
                        <img
                            src={placeholder}
                            alt="Bild"
                            className="w-full object-cover rounded-lg"
                        />
                    </div>
                    <div onClick={() => setStep(3)} className={"cursor-pointer hover:shadow-md hover-transition"}>
                        <img
                            src={placeholder}
                            alt="Bild"
                            className="w-full object-cover rounded-lg"
                        />
                    </div>
                    <div onClick={() => setStep(3)} className={"cursor-pointer hover:shadow-md hover-transition"}>
                        <img
                            src={placeholder}
                            alt="Bild"
                            className="w-full object-cover rounded-lg"
                        />
                    </div>
                    <div onClick={() => setStep(3)} className={"cursor-pointer hover:shadow-md hover-transition"}>
                        <img
                            src={placeholder}
                            alt="Bild"
                            className="w-full object-cover rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center px-8">
                    <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        zurück
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageSelector;