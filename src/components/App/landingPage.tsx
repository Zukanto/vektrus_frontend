import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
// import RegisterFormUserDataStep from './RegisterFormUserDataStep';
// import RegisterFormCompanyDataStep from "./RegisterFormCompanyDataStep";
// import BillingForm from './BillingForm';
import {store} from "./store";
import Background from "./background";

export default function LandingPage() {
    const [loginModalVisible, setLoginModalVisible] = useState(true);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    // const [termsAccepted, setTermsAccepted] = useState(false);
    // const [registerStep, setRegisterStep] = useState(1); // Tracks which step the user is on
    // const [userData, setUserData] = useState<any>(null);
    // const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
    // const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null); // Track response status
    // const [redirectCredit, setRedirectCredit] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const toggleLoginModal = () => {
        closeModals();
        setLoginModalVisible(!loginModalVisible);
    };

    /*
    const toggleRegisterModal = () => {
        closeModals();
        setRegisterModalVisible(!registerModalVisible);
    };
    */

    const closeModals = () => {
        setRegisterModalVisible(false);
        setLoginModalVisible(false);
        setIsSubmitting(false);
    }
    /*
    const handleRegisterSubmit = (data: any) => {
        setUserData(data);
        setPaymentMethod(data.paymentMethod);
        setRegisterStep(2); // Move to company data step
    };

    const handleCompanyDataSubmit = (companyData: any) => {
        userData['companyData'] = companyData;
        // Move to next step based on payment method
        if (paymentMethod === 'Kreditkarte') {
            setRedirectCredit(true);
            setRegisterStep(3);
        } else if (paymentMethod === 'Rechnung') {
            setRegisterStep(3); // Skip credit card if payment by invoice
        }
    };

    const handleBillingSubmit = (billingData: any) => {
        userData['billingData'] = billingData;
        toggleRegisterModal();
        handleRegistrationConfirmation();

    };

    const handleRegistrationConfirmation = async () => {
        setIsSubmitting(true); // Show loading
        if(redirectCredit) window.open('https://buy.stripe.com/00gbKIcuN13leSk7ss');
        try {
            console.log(userData)
            const response = await store.post_customer_data(userData);
            if (response.ok) {
                setSubmissionSuccess(true);
            } else {
                setSubmissionSuccess(false);
            }
        } catch (error) {
            console.error("Registration failed:", error);
            setSubmissionSuccess(false);
        }
    };
    */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await store.post_login_data(email, password);

            if (response.status === 200) {
                // Erfolgreicher Login -> Weiterleitung zur HubPage
                navigate("/hubPage");
            } else if (response.status === 412) {
                setErrorMessage("E-Mail oder Passwort ist ungültig.");
            } else {
                setErrorMessage("Ein unerwarteter Fehler ist aufgetreten.");
            }
        } catch (error) {
            setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
            console.error("Login-Fehler:", error);
        }
    };
    /*onClick={toggleRegisterModal}*/
    return (
        <div className="App bg-black min-h-screen">
            <header className="App-header">
                <div
                    className="flex fixed top-0 left-0 right-0 z-10 justify-start items-center p-4 bg-black text-white text-lg h-16">
                    <div className="relative group mr-5 ml-5 cursor-default">
                        <span onClick={toggleLoginModal}>Login</span>
                        <span
                            className="absolute -bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                    </div>
                    <div className="relative group mr-5 ml-5 cursor-default text-gray-500">
                        <span>Registrieren</span>
                    </div>
                </div>
            </header>
            <div className="z-20">
                {/* Login Modal */}
                {loginModalVisible && (
                    <div className="min-h-screen flex justify-center items-center">
                        <div className="p-10 max-w-md bg-white shadow-xl rounded-md items-center z-20">
                            <form onSubmit={handleLogin}>
                                <p className="text-2xl text-center mt-6">
                                    <b>Anmelden</b>
                                </p>
                                <input
                                    type="text"
                                    className="h-11 w-full mt-10 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="E-Mail"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="h-11 w-full mt-8 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Passwort"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errorMessage && (
                                    <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
                                )}
                                <div className="text-cyan-800 mt-16">
                                    <a>Password vergessen?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-2 bg-[#B4E8E5] hover:bg-[#56B6B1] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Register Modal
                {registerModalVisible && (
                    <div className="min-h-screen flex justify-center items-center">
                        <div className="p-6 max-w-md w-full bg-white shadow-md rounded-md z-20">
                            {registerStep === 1 && (
                                <RegisterFormUserDataStep
                                    nextRegisterStep={handleRegisterSubmit}
                                    termsAccepted={termsAccepted}
                                    setTermsAccepted={setTermsAccepted}
                                />
                            )}
                            {registerStep === 2 && (
                                <RegisterFormCompanyDataStep nextRegisterStep={handleCompanyDataSubmit}/>
                            )}
                            {registerStep === 3 && (
                                <BillingForm nextStep={handleBillingSubmit}/>
                            )}
                        </div>
                    </div>
                )}

                {isSubmitting && (
                    <div className="min-h-screen flex justify-center items-center z-20">
                        <div className="flex p-10 max-w-md bg-white shadow-xl rounded-md items-center z-20">
                            {submissionSuccess == null ? (
                                <>
                                    <img
                                        src="/loader.svg"
                                        alt="Spinning"
                                        className="w-10 h-10 m-5 animate-spin text-center"
                                    />
                                    <p className="text-lg text-gray-700">Bitte warten Sie, Ihre Registrierung wird
                                        bearbeitet...</p>
                                </>
                            ) : submissionSuccess ? (
                                <>

                                    <img
                                        src="/success.svg"
                                        alt="success"
                                        className="w-16 h-16 mr-4 mt-5 ml-0 text-center"
                                    />
                                    <p className="text-lg mt-4 text-gray-700">
                                        Wir kümmern uns um den Rest. <br/> Sie erhalten eine E-Mail mit
                                        einem Link zu unserem Terminkalender.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg mt-4 text-gray-700">
                                        Es ist leider ein Fehler aufgetreten, versuchen sie es später erneut!
                                    </p>
                                </>
                            )}

                        </div>

                    </div>
                )}
                */}
            </div>
            <span className="absolute inset-x-0 bottom-0 text-xs text-center text-white z-10">
                © 2024 Vektrus. Alle Rechte vorbehalten. | <Link to="/datenschutz"
                                                                 className="hover:underline">Datenschutz</Link> | <Link
                to="/impressum" className="hover:underline">Impressum</Link>
            </span>
            <div style={{
                top: 0,
                left: 0,
                position: 'absolute',
                pointerEvents: 'none',
                width: '100vw',
                height: '100vh',
                zIndex: 0
            }}>
                <Background/>
            </div>
            {(isSubmitting || registerModalVisible || loginModalVisible) && (
                <div className="absolute z-0 backdrop-blur-md w-full h-full top-0 left-0"></div>
            )}
        </div>
    );
}
