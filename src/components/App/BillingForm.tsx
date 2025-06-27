import React, { useState } from 'react';

interface BillingFormProps {
    nextStep: (billingData: any) => void;  // Callback to pass billing data to the parent
}

export default function BillingForm({ nextStep }: BillingFormProps) {
    const [billingData, setBillingData] = useState({
        surname: '',
        lastname: '',
        companyName: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [errors, setErrors] = useState<any>({}); // Track errors

    // Validate the billing data
    const validateBillingData = () => {
        const newErrors: any = {};

        if (!billingData.surname.trim()) {
            newErrors.surname = 'Vorname ist erforderlich';
        }

        if (!billingData.lastname.trim()) {
            newErrors.lastname = 'Nachname ist erforderlich';
        }

        if (!billingData.street.trim()) {
            newErrors.street = 'Straße und Hausnummer sind erforderlich';
        }

        if (!billingData.city.trim()) {
            newErrors.city = 'Stadt ist erforderlich';
        }

        if (!billingData.postalCode.trim() || !/^\d{5}$/.test(billingData.postalCode)) {
            newErrors.postalCode = 'Postleitzahl ist ungültig';
        }

        if (!billingData.country.trim()) {
            newErrors.country = 'Land ist erforderlich';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Validate the billing data before submitting
        if (validateBillingData()) {
            nextStep(billingData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-2xl text-center mt-6">Rechnungsadresse</p>

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.companyName}
                onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
                placeholder="Firmenname"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-2">{errors.companyName}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.surname}
                onChange={(e) => setBillingData({ ...billingData, surname: e.target.value })}
                placeholder="* Vorname"
                required
            />
            {errors.surname && <p className="text-red-500 text-sm mt-2">{errors.surname}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.lastname}
                onChange={(e) => setBillingData({ ...billingData, lastname: e.target.value })}
                placeholder="* Nachname"
                required
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-2">{errors.lastname}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.street}
                onChange={(e) => setBillingData({ ...billingData, street: e.target.value })}
                placeholder="* Straße und Hausnummer"
                required
            />
            {errors.street && <p className="text-red-500 text-sm mt-2">{errors.street}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.city}
                onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                placeholder="* Stadt"
                required
            />
            {errors.city && <p className="text-red-500 text-sm mt-2">{errors.city}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.postalCode}
                onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
                placeholder="* Postleitzahl"
                required
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-2">{errors.postalCode}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={billingData.country}
                onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
                placeholder="* Land"
                required
            />
            {errors.country && <p className="text-red-500 text-sm mt-2">{errors.country}</p>}

            <div className="flex justify-between mt-16">
                <button
                    type="submit"
                    className="bg-[#B4E8E5] hover:bg-[#56B6B1] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Weiter
                </button>
            </div>
        </form>
    );
}
