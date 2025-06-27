import React from "react";

type Props = {
    formData: any
    setFormData: (data: any) => void;
    contentPlans: ContentPlan[];
    setStep: (step: number) => void;
    prevStep: number;
};

type ContentPlan = {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
};



const SelectContentPlan = ({contentPlans, formData, setFormData, setStep, prevStep}: Props) => {

    const setStepAndFormData = (step: number, id: number) => {
        setFormData({
            ...formData,
            contentplan: id
        });
        setStep(step)
    }

    return (
        <>
            <div className="p-4 border-b mb-0">
                <h2 className="text-xl font-semibold text-vektrus-gray-dark px-2">
                    Laufende Content-Pläne
                </h2>
            </div>
            <div class={"p-6"}>
                <div className={"mb-40"}>
                    {contentPlans.map((contentPlan) => (
                        <div key={contentPlan.id} onClick={() => setStepAndFormData(prevStep, contentPlan.id)} className="flex justify-between p-2 border-2 rounded-md mb-4 cursor-pointer">
                            <div>{contentPlan.title}</div>
                            <div>
                                {contentPlan.startDate.toLocaleDateString()} -{" "}
                                {contentPlan.endDate.toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center px-8 mt-8">
                    <button
                        type="button"
                        onClick={() => setStep(prevStep)}
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        zurück
                    </button>
                    <button
                        onClick={() => setStep(6)}
                        className="px-4 py-1 w-40 bg-vektrus-button rounded-lg hover:bg-vektrus-blue-light/80 transition-colors"
                    >
                        neu erstellen
                    </button>
                </div>
            </div>

        </>
    );
};

export default SelectContentPlan;
