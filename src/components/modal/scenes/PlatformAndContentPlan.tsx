import PlatformSelector from "../PlatformSelector";
import React from "react";
import ContentPlanSelector from "../ContentPlanSelector";

type Props = {
    contentPlans: []
    formData: any;
    setFormData: (data: any) => void;
    setStep: (step: number) => void;
    onClose: () => void;
}

const PlatformAndContentPlan = ({formData, setFormData, setStep, onClose, contentPlans}:Props) => {
    return (
        <>
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-vektrus-gray-dark px-2">Content-Planer</h2>
            </div>
            <div className={"p-6"}>
                <PlatformSelector
                    selected={formData.platforms}
                    onChange={(platforms) => setFormData({...formData, platforms})}
                />
                <ContentPlanSelector
                    contentPlans={contentPlans}
                    formData={formData}
                    setStep={setStep}
                />
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

export default PlatformAndContentPlan