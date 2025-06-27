import PlatformSelector from "../PlatformSelector";
import React from "react";
import StatusAndPlatform from "../StatusAndPlatform";

type Props = {
    formData: any;
    setFormData: (data: any) => void;
    setStep: (step: number) => void;
    onClose: () => void;
}

const DescriptionAndPlatform = ({formData, setFormData, setStep, onClose}:Props) => {
    return (
        <>
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-vektrus-gray-dark px-2">Posting erstellen</h2>
            </div>
            <StatusAndPlatform formData={formData}/>
            <div className={"p-6"}>
                <PlatformSelector
                    selected={formData.platforms}
                    onChange={(platforms) => setFormData({...formData, platforms})}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Beschreibung*
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Beschreibe den Inhalt des Postings"
                        className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-button focus:border-transparent resize-none"
                        required
                    />
                </div>
                <div className="flex justify-between items-center px-8 mt-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        zurück
                    </button>
                    <button
                        onClick={() => setStep(2)}
                        className="px-4 py-1 w-40 bg-vektrus-button rounded-lg hover:bg-vektrus-blue-light/80 transition-colors"
                    >
                        weiter
                    </button>
                </div>
            </div>
        </>
    )
}

export default DescriptionAndPlatform;