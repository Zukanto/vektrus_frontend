import React, { useState } from 'react';
import TermsModal from './TermsModal';

interface RegisterFormStepProps {
    nextRegisterStep: (userData: any) => void;  // Allow passing user data back
    termsAccepted: boolean;
    setTermsAccepted: (value: boolean) => void;
}

export default function RegisterFormUserDataStep({nextRegisterStep, termsAccepted, setTermsAccepted}: RegisterFormStepProps) {
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [termsModalVisible, setTermsModalVisible] = useState(false);
    const [userData, setUserData] = useState({
        surname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirm: '',
    });

    const showTermsModal = () => setTermsModalVisible(true);
    const checkTermsModal = () => {
        setTermsAccepted(true);
        setTermsModalVisible(false);
    }

    const register = (event: React.FormEvent) => {
        event.preventDefault();

        if (!paymentMethod) {
            alert('Bitte wählen Sie eine Zahlungsmethode aus.');
            return;
        }

        if (!termsAccepted) {
            alert('Sie müssen die AGB akzeptieren!');
            return;
        }

        // Pass user data back to the parent
        nextRegisterStep({
            ...userData,
            paymentMethod,
            termsAccepted,
        });
    };

    return (
        <>
            {termsModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 max-w-3xl w-full shadow-md rounded-md">
                        <p className="text-2xl text-center mt-4">Allgemeine Geschäftsbedingungen (AGB)</p>
                        <hr className={"border-black mt-3 mb-2"}/>
                        <TermsModal/>
                        <button
                            type="button"
                            className="mt-2 w-full bg-[#B4E8E5] hover:bg-[#56B6B1] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={checkTermsModal}
                        >
                            Akzeptieren und weiter
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={register}>
                <p className="text-2xl text-center mt-6">Registrieren</p>

                <input
                    type="text"
                    className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                    value={userData.surname}
                    onChange={(e) => setUserData({...userData, surname: e.target.value})}
                    placeholder="Vorname"
                    required
                />
                <input
                    type="text"
                    className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                    value={userData.lastname}
                    onChange={(e) => setUserData({...userData, lastname: e.target.value})}
                    placeholder="Nachname"
                    required
                />
                <input
                    type="email"
                    className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    placeholder="Passwort"
                    required
                />
                <input
                    type="password"
                    className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                    value={userData.password_confirm}
                    onChange={(e) => setUserData({...userData, password_confirm: e.target.value})}
                    placeholder="Passwort Bestätigen"
                    required
                />

                {/* Payment method selection */}
                <div className="flex space-x-4 mt-9">
                    <div
                        className={`flex items-center p-4 border rounded-md cursor-pointer w-full 
                    ${paymentMethod === 'Kreditkarte' ? 'border-cyan-800 bg-[#B4E8E5]' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod('Kreditkarte')}
                    >
                        <img src="/credit.svg" alt="chat" className="h-7 w-7"/>
                        <span className="text-lg text-center w-full ml-2">Andere</span>
                    </div>
                    <div
                        className={`flex items-center p-4 border rounded-md cursor-pointer w-full 
                    ${paymentMethod === 'Rechnung' ? 'border-cyan-800 bg-[#B4E8E5]' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod('Rechnung')}
                    >
                        <img src="/invoice.svg" alt="chat" className="h-7 w-7"/>
                        <span className="text-lg text-center w-full ml-2">Rechnung</span>
                    </div>
                </div>

                <div className="text-cyan-800 mt-14">
                    <input
                        className="mr-2 accent-cyan-700"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <span>
                        Ich stimme den{' '}
                        <a
                            onClick={showTermsModal}
                            className="cursor-pointer text-cyan-800 font-bold hover:underline"
                        >
                            Geschäftsbedingungen
                        </a>{' '}
                        zu.
                    </span>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-[#B4E8E5] hover:bg-[#56B6B1] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Weiter zu Unternehmensinformationen
                    </button>
                </div>
            </form>
        </>
    );
}
