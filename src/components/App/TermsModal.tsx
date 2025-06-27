import React from 'react';

const TermsModal: React.FC = () => {
    return (
        <div className="overflow-y-scroll mb-4 text-cyan-800" style={{minHeight: 550, maxHeight: 700}}>
            {/*todo dummy AGB*/}
            <p className="text-2xl mt-6">Allgemeine Geschäftsbedingungen</p>
            <p>Willkommen zu unseren Allgemeinen Geschäftsbedingungen. Wenn Sie hier sind, sind Sie
                wahrscheinlich genauso verwirrt wie wir, aber keine Sorge, wir werden das gemeinsam
                durchstehen.</p>

            <p className="text-2xl mt-6">1. Einleitung</p>
            <p>Dieser Abschnitt dient dazu, Ihnen klarzumachen, dass wir wichtig sind und Sie diesen
                Text unbedingt lesen müssen, obwohl keiner von uns das wirklich will.</p>

            <p className="text-2xl mt-6">2. Vertragsgegenstand</p>
            <p>Hier geht es um das, was wir tun und was Sie von uns erwarten können. Genau genommen
                wissen wir das selbst nicht so genau, aber das klingt professionell.</p>

            <p className="text-2xl mt-6">3. Vertragsabschluss</p>
            <p>Sie klicken, wir liefern. Es ist so einfach. Warum machen wir das hier überhaupt
                kompliziert? Vielleicht, weil wir es müssen.</p>

            <p className="text-2xl mt-6">4. Preise und Zahlungsbedingungen</p>
            <p>Alles kostet Geld, selbst das Lesen dieser AGB kostet Sie wertvolle Zeit. Zahlen Sie
                einfach und beschweren Sie sich nicht.</p>

            <p className="text-2xl mt-6">5. Lieferung und Lieferzeit</p>
            <p>Wir versprechen, dass wir irgendwann liefern. Ob das in einer Stunde oder einem Jahr ist,
                hängt vom Wetter und unserer Laune ab.</p>

            <p className="text-2xl mt-6">6. Widerrufsrecht</p>
            <p>Wenn Sie es sich anders überlegen, können Sie uns das gerne mitteilen. Wir werden das
                wahrscheinlich ignorieren, aber fühlen Sie sich frei, es zu versuchen.</p>

            <p className="text-2xl mt-6">7. Gewährleistung und Haftung</p>
            <p>Wenn etwas schiefgeht, ist es wahrscheinlich nicht unsere Schuld. Selbst wenn es unsere
                Schuld ist, behaupten wir einfach das Gegenteil.</p>

            <p className="text-2xl mt-6">8. Datenschutz</p>
            <p>Ihre Daten sind bei uns sicher. Außer natürlich, wenn wir sie verlieren oder jemand sie
                hackt. Dann hatten Sie einfach Pech.</p>

            <p className="text-2xl mt-6">9. Schlussbestimmungen</p>
            <p>Dies ist der Abschnitt, den niemand liest. Es geht darum, dass alles, was oben steht,
                tatsächlich Sinn ergibt. Vertrauen Sie uns einfach.</p>

            <p className="text-2xl mt-6">10. Kontakt</p>
            <p>Wenn Sie uns erreichen möchten, schicken Sie uns eine E-Mail. Wir werden wahrscheinlich
                nicht antworten, aber wir freuen uns über die Post.</p>

        </div>
    );
};

export default TermsModal;
