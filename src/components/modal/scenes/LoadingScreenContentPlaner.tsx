import React, { useState, useEffect } from 'react';
import check from "../../../assets/check-gray.svg";

type Props = {
    setStep: (step: number) => void;
};

const LoadingScreenContentPlaner = ({ setStep }: Props) => {
    // Die vier Schritte
    const steps = [
        "Content-Plan analysieren",
        "Bilder generieren",
        "Trending-Hashtags recherchieren",
        "Texte verfassen"
    ];
    const totalSteps = steps.length; // 4 Schritte
    const totalDuration = totalSteps * 4; // Gesamtzeit in Sekunden (hier 16s)

    // currentStep: 0 bis 4 (bei 0 noch kein Schritt erreicht)
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Checkmarks werden alle 4 Sekunden aktualisiert
        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < totalSteps) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [totalSteps]);

    // Effekt: Wenn alle Schritte erreicht sind, nach 3 Sekunden zum nächsten Schritt wechseln
    useEffect(() => {
        if (currentStep === totalSteps) {
            const timeout = setTimeout(() => {
                setStep(3);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [currentStep, totalSteps, setStep]);

    return (
        <div>
            <div className="p-4 border-b flex items-center gap-4">
                <svg
                    className="animate-spin h-5 w-5 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
                <h2 className="text-xl font-semibold text-vektrus-gray-dark px-2">
                    Inhalte werden generiert...
                </h2>
            </div>

            <div className="p-6">
                <div className="w-full mt-4">
                    {/* Fortschrittsbalken */}
                    <div className="bg-gray-300 rounded h-4 overflow-hidden rounded-full">
                        <div
                            className="bg-vektrus-button h-full rounded"
                            style={{
                                animation: `progressAnimation ${totalDuration}s linear forwards`
                            }}
                        />
                    </div>

                    {/* CSS-Animation für den Fortschrittsbalken */}
                    <style>{`
                        @keyframes progressAnimation {
                            from { width: 0%; }
                            to { width: 100%; }
                        }
                    `}</style>

                    {/* Schritte-Anzeige */}
                    <div className="mt-8">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center mt-4">
                                {/* Kreis: ausgefüllt, wenn der Schritt bereits erreicht wurde */}
                                <div
                                    className={`w-6 h-6 mr-2 rounded-full flex justify-center items-center ${
                                        currentStep > index ? 'bg-vektrus-button' : 'bg-gray-300'
                                    }`}
                                >
                                    {currentStep > index && (
                                        <img className="h-4 w-4 text-gray-800" src={check} alt="Haken" />
                                    )}
                                </div>
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreenContentPlaner;
