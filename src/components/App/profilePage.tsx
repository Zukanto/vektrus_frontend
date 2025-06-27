import React, { useState, useEffect } from "react";
import { TopBar } from "./topBar";
import { store } from "./store";

const ProfilePage: React.FC = () => {
    const [customerData, setCustomerData] = useState<any>(null);
    const [licenses, setLicenses] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        surname: "",
        lastname: "",
        company: "",
        password: "",
        password_confirm: ""
    });

    useEffect(() => {
        async function fetchData() {
            const data = await store.get_customer_data();
            setCustomerData(data);
            setFormData({
                surname: data.surname,
                lastname: data.lastname,
                company: data.companyname,
                password: "",
                password_confirm: ""
            });

            const licenseData = await store.get_customer_licenses();
            setLicenses(licenseData);
        }
        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        await store.put_customer_data(formData);
        setShowPopup(false);
        const data = await store.get_customer_data();
        setCustomerData(data);
    };

    return (
        <>
            <TopBar />
            <div className="flex flex-col pt-16 min-h-screen overflow-hidden bg-gradient-to-br from-white to-[#B4D6DD]">
                <div className="flex flex-col items-center h-full">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mt-11">
                        <div className="flex items-start justify-stretch">
                            <div className="flex items-center mr-6">
                                <div className={`text-white p-2 mt-2 rounded-full w-24 h-24 flex justify-center items-center text-5xl cursor-pointer`} style={{backgroundColor: `${store.costumerStyle.color}`}}>
                                    <>{store.costumerStyle.name}</>
                                </div>
                            </div>
                            <div className={'w-1/3'}>
                                <div className={'flex justify-between items-center'}>
                                    <h1 className="text-2xl w-2/3">{customerData?.surname} {customerData?.lastname}</h1>
                                    <button onClick={() => setShowPopup(true)}
                                            data-itype="edit">
                                        <img src="/edit_s.svg" alt="edit" className="h-4 w-4 cursor-pointer mt-2"/>
                                    </button>
                                </div>
                                <div className={'bg-black mt-1 mb-1'} style={{height: 1}}></div>
                                <p>{customerData?.email}</p>
                                <p>{customerData?.companyname}</p>
                            </div>
                            <div className={'w-24'}></div>
                            <div className={'w-2/5'}>
                                <h1 className="text-2xl">Lizenz</h1>
                                <div className={'bg-black mt-1 mb-1'} style={{height: 1}}></div>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'w-2/3'}>
                                        <p>Gültig bis: {licenses[0]?((((licenses[0]?.expirationdate+'').split('T')[0]).split('-')).reverse()).join('/'):''}</p>
                                        <p>Nächste Zahlung: {licenses[0]?((((licenses[0]?.nextpayment+'').split('T')[0]).split('-')).reverse()).join('/'):''}</p>
                                    </div>
                                    {/*
                                    <div>
                                        <button className="bg-[#DAEAED] text-black px-4 py-2 rounded">Verlängern</button>
                                    </div>
                                    */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-20">
                            <h2 className="text-xl">Lizenz Zahlungen</h2>
                            <div className={'bg-black mt-1 mb-1'} style={{height: 1}}></div>
                            <table className="min-w-full mt-4">
                                <tbody>
                                {licenses.map((license, index) => (
                                    <tr key={index} className={index % 2 == 0? 'bg-[#DAEAED]':''} style={{clipPath:"xywh(0 0 100% 100% round 0.5em)"}}>
                                        <td className="py-4 text-center">ID: {String(license.id).padStart(6,'0')}</td>
                                        <td className="py-4 text-center">Start: {((((license.startdate).split('T')[0]).split('-')).reverse()).join('/')}</td>
                                        <td className="py-4 text-center">Ende: {((((license.expirationdate).split('T')[0]).split('-')).reverse()).join('/')}</td>
                                        <td className="py-4 text-center">Zahlung: {((((license.nextpayment).split('T')[0]).split('-')).reverse()).join('/')}</td>
                                        <td className="py-4 text-center">
                                            <button className={index % 2 == 0? 'bg-white px-4 py-1 rounded':'bg-[#DAEAED] px-4 py-1 rounded'}>Rechnungen
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <span className="absolute inset-x-0 bottom-0 text-xs text-center">
                © 2024 Vektrus. Alle Rechte vorbehalten. | <a href="/datenschutz" className="hover:underline">Datenschutz</a> | <a href="/impressum" className="hover:underline">Impressum</a>
            </span>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Profil bearbeiten</h2>
                        <label className="block mb-2">
                            Vorname
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="block h-11 w-full mt-8 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                        <label className="block mb-2">
                            Nachname
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className="block h-11 w-full mt-8 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                        <label className="block mb-2">
                            Unternehmen
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="block h-11 w-full mt-8 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                        <label className="block mb-2">
                            Passwort
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="block h-11 w-full mt-8 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                        <label className="block mb-4">
                            Passwort bestätigen
                            <input
                                type="password"
                                name="password_confirm"
                                value={formData.password_confirm}
                                onChange={handleInputChange}
                                className="block h-11 w-full mt-8 login border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                        <div className="flex justify-end">
                            <button className="bg-[#DAEAED] text-black px-4 py-2 rounded mr-2 w-1/3" onClick={handleSave}>Speichern</button>
                            <button className="bg-white text-black px-4 py-2 rounded border-2 w-1/3" onClick={() => setShowPopup(false)}>Abbrechen</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
