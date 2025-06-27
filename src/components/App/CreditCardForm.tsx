import React, { useState } from 'react';

interface CreditCardFormProps {
    nextStep: (creditCardData: any) => void;
}

export default function CreditCardForm({ nextStep }: CreditCardFormProps) {
    const [creditCardData, setCreditCardData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [errors, setErrors] = useState<any>({}); // Track errors

    // Validate the credit card data
    const validateCreditCardData = () => {
        const newErrors: any = {};

        // Card number validation (Luhn Algorithm)
        const luhnCheck = (num: string) => {
            let arr = (num + '')
                .split('')
                .reverse()
                .map((x) => parseInt(x));
            let sum = arr.reduce((acc, val, idx) =>
                idx % 2 === 0
                    ? acc + val
                    : acc + ((val * 2) > 9 ? val * 2 - 9 : val * 2), 0);
            return sum % 10 === 0;
        };

        if (!creditCardData.cardNumber || !luhnCheck(creditCardData.cardNumber)) {
            newErrors.cardNumber = 'Ungültige Kartennummer';
        }

        const [month, year] = creditCardData.expiry.split('/');
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of the year
        const currentMonth = new Date().getMonth() + 1; // Months are 0-based in JS

        if (!month || !year || isNaN(Number(month)) || isNaN(Number(year))) {
            newErrors.expiry = 'Ungültiges Ablaufdatum';
        } else if (Number(month) < 1 || Number(month) > 12) {
            newErrors.expiry = 'Ungültiger Monat';
        } else if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
            newErrors.expiry = 'Ablaufdatum liegt in der Vergangenheit';
        }

        // CVV validation (3 or 4 digits)
        if (!/^\d{3,4}$/.test(creditCardData.cvv)) {
            newErrors.cvv = 'Ungültiger CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate the credit card data before submitting
        if (validateCreditCardData()) {
            nextStep(creditCardData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-2xl text-center mt-6">Kreditkartendaten</p>

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={creditCardData.cardNumber}
                onChange={(e) => setCreditCardData({ ...creditCardData, cardNumber: e.target.value })}
                placeholder="Kartennummer"
                required
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={creditCardData.expiry}
                onChange={(e) => setCreditCardData({ ...creditCardData, expiry: e.target.value })}
                placeholder="Ablaufdatum (MM/YY)"
                required
            />
            {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}

            <input
                type="text"
                className="h-11 w-full mt-10 register border-b border-black appearance-none py-2 px-3 text-gray-700 text-xl leading-tight focus:outline-none focus:shadow-outline"
                value={creditCardData.cvv}
                onChange={(e) => setCreditCardData({ ...creditCardData, cvv: e.target.value })}
                placeholder="CVV"
                required
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}

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
