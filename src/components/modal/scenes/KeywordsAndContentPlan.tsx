import React, {useState} from "react";
import { X } from 'lucide-react';
import StatusAndPlatform from "../StatusAndPlatform";
import ContentPlanSelector from "../ContentPlanSelector";

type Props = {
    formData: any;
    setFormData: (data: any) => void;
    setStep: (step: number) => void;
    contentPlans: []
}

const KeywordsAndContentPlan = ({formData, setFormData, setStep, contentPlans}:Props) => {

    const [keywordInput, setKeywordInput] = useState('');

    const handleKeywordInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') {
            e.preventDefault();
            const trimmed = keywordInput.trim();
            if (trimmed) {
                setFormData({
                    ...formData,
                    keywords: [...formData.keywords, trimmed]
                });
                setKeywordInput('');
            }
        }
    };

    return (
        <>
            <div className="p-4 border-b mb-0">
                <h2 className="text-xl font-semibold text-vektrus-gray-dark px-2">Posting erstellen</h2>
            </div>
            <StatusAndPlatform formData={formData}/>
            <div className={"p-6"}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Schlagwörter
                    </label>
                    {formData.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2 mb-4">
                            {formData.keywords.map((keyword, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-gray-200 px-2 py-1 rounded"
                                >
                                    <span>{keyword}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newKeywords = formData.keywords.filter((_, i) => i !== index);
                                            setFormData({ ...formData, keywords: newKeywords });
                                        }}
                                        className="ml-1"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={handleKeywordInputKeyDown}
                        placeholder="Schlagwörter eingeben"
                        className="px-3 py-2 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-button focus:border-transparent"
                    />
                </div>
                <ContentPlanSelector
                    contentPlans={contentPlans}
                    formData={formData}
                    setStep={setStep}
                />
                <div className="flex justify-between items-center px-8 mt-8">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 w-40 text-gray-700 border-4 border-vektrus-button hover:bg-vektrus-blue-light/80 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        zurück
                    </button>
                    <button
                        onClick={() => setStep(3)}
                        className="px-4 py-1 w-40 bg-vektrus-button rounded-lg hover:bg-vektrus-blue-light/80 transition-colors"
                    >
                        weiter
                    </button>
                </div>
            </div>
        </>
    )
}

export default KeywordsAndContentPlan;