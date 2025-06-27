import React, { useState } from 'react';

interface RegisterFormCompanyDataStepProps {
    nextRegisterStep: (companyData: any) => void;
}

export default function RegisterFormCompanyDataStep({ nextRegisterStep }: RegisterFormCompanyDataStepProps) {
    const [companyData, setCompanyData] = useState({
        company: '',
        industry: '',
        country: '',
        postcode: '',
        city: '',
        street: '',
        registernumber: '',
        ustid: ''
    });

    const [errors, setErrors] = useState<any>({});

    const validateCompanyData = () => {
        const newErrors: any = {};

        if (!companyData.company.trim()) {
            newErrors.company = 'Unternehmen ist erforderlich';
        }
        if (!companyData.country.trim()) {
            newErrors.country = 'Land ist erforderlich';
        }
        if (!companyData.postcode.trim() || !/^\d{5}$/.test(companyData.postcode)) {
            newErrors.postcode = 'Postleitzahl ist ungültig';
        }
        if (!companyData.city.trim()) {
            newErrors.city = 'Stadt ist erforderlich';
        }
        if (!companyData.street.trim()) {
            newErrors.street = 'Straße und Hausnummer sind erforderlich';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateCompanyData()) {
            nextRegisterStep(companyData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-2xl text-center mt-10">Unternehmensdaten</p>

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.company}
                onChange={(e) => setCompanyData({ ...companyData, company: e.target.value })}
                placeholder="* Unternehmen"
                required
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.industry}
                onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                placeholder="* Branche"
            />
            {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.country}
                onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                placeholder="* Land"
                required
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.postcode}
                onChange={(e) => setCompanyData({ ...companyData, postcode: e.target.value })}
                placeholder="* Postleitzahl"
                required
            />
            {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.city}
                onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                placeholder="* Stadt"
                required
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.street}
                onChange={(e) => setCompanyData({ ...companyData, street: e.target.value })}
                placeholder="* Straße und Hausnummer"
                required
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.registernumber}
                onChange={(e) => setCompanyData({ ...companyData, registernumber: e.target.value })}
                placeholder="Handelsregisternummer"
            />
            {errors.registernumber && <p className="text-red-500 text-sm mt-1">{errors.registernumber}</p>}

            <input
                type="text"
                className="h-11 w-full mt-8 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={companyData.ustid}
                onChange={(e) => setCompanyData({ ...companyData, ustid: e.target.value })}
                placeholder="USt-IdNr."
            />
            {errors.ustid && <p className="text-red-500 text-sm mt-1">{errors.ustid}</p>}

            <div className="flex justify-between mt-8">
                <button
                    type="submit"
                    className="bg-[#B4E8E5] hover:bg-[#56B6B1] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Weiter zu Zahlungsinformationen
                </button>
            </div>
        </form>
    );
}
