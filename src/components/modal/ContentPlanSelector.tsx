import React, {useEffect, useState} from "react";

type Props = {
    setStep: (step: number) => void;
    formData: any
    contentPlans: []
}

const ContentPlanSelector = ({setStep, contentPlans, formData}: Props) => {

    const [selectedPlan, setSelectedPlan] = useState(null)

    useEffect(() => {
        if (formData.contentplan) {
            setSelectedPlan(contentPlans.find(plan => plan.id === formData.contentplan).title)
        }
    }, [formData])

    return (
        <div className={"mt-6 mb-40"}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Content-Plan*
            </label>
            <div className={"flex justify-between items-center gap-8 mt-2"}>

                <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="px-4 w-1/2 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Content-Plan wählen
                </button>
                <h2>{formData.contentplan ? selectedPlan : "Titel des Contentplans"}</h2>
            </div>
        </div>
    );
}

export default ContentPlanSelector;