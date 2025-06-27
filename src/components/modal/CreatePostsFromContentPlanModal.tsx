import React, {useState, useEffect, FormEvent} from 'react';
import Modal from './Modal';
import ImagePreview from './ImagePreview';
import {useModalContext} from '../../context/ModalContext';
import {usePostContext} from '../../context/PostContext';
import {formatPostDate} from '../../utils/dateUtils';
import type {PlatformType} from '../../types/platform';
import ImageSelector from "./ImageSelector";
import DescriptionAndPlatform from "./scenes/DescriptionAndPlatform";
import KeywordsAndContentPlan from "./scenes/KeywordsAndContentPlan";
import PostPreview from "./scenes/PostPreview";
import SelectContentPlan from "./scenes/SelectContentPlan";
import PlatformAndContentPlan from "./scenes/PlatformAndContentPlan";
import LoadingScreenContentPlaner from "./scenes/LoadingScreenContentPlaner";
import ContentPlannerConfirmation from "./scenes/ContentPlannerConfirmation";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ContentPlan = {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
};



export default function CreatePostsFromContentPlanModal({isOpen, onClose}: CreatePostModalProps) {
    const [postings, setPostings] = useState([
        {
            id: 1,
            title: "Frühlingsangebot gestartet",
            description: "Unser neuestes Frühlingsangebot ist ab sofort erhältlich.",
            keywords: ["Frühling", "Angebot", "Neuheit"],
            contentplan: 2,
            date: "2025-04-05",
            time: "09:00",
            platforms: ["facebook", "instagram"],
            image: "",
            text: "Erleben Sie den Frühling mit exklusiven Rabatten – jetzt zugreifen und sparen!",
            status: "ausstehend"
        },
        {
            id: 2,
            title: "Produktneuheit im Fokus",
            description: "Entdecken Sie unser innovatives Produkt, das neue Maßstäbe setzt.",
            keywords: ["Innovation", "Technologie", "Neuheit"],
            contentplan: 1,
            date: "2025-04-08",
            time: "10:30",
            platforms: ["linkedin"],
            image: "",
            text: "Modern, effizient und zukunftsweisend – unser neuestes Produkt ist da!",
            status: "ausstehend"
        },
        {
            id: 3,
            title: "Kundenfeedback und Erfolgsgeschichten",
            description: "Unsere Kunden berichten von ihren positiven Erfahrungen mit unseren Services.",
            keywords: ["Feedback", "Kundenzufriedenheit", "Erfolg"],
            contentplan: 1,
            date: "2025-04-10",
            time: "14:00",
            platforms: ["twitter"],
            image: "",
            text: "Lesen Sie, was unsere Kunden über uns sagen – Ihre Meinung ist uns wichtig!",
            status: "ausstehend"
        },
        {
            id: 4,
            title: "Exklusives Webinar: Trends 2023",
            description: "Melden Sie sich zu unserem kostenfreien Webinar an und erfahren Sie mehr über die neuesten Trends.",
            keywords: ["Webinar", "Event", "Trends"],
            contentplan: 2,
            date: "2025-04-15",
            time: "16:00",
            platforms: ["facebook", "linkedin"],
            image: "",
            text: "Seien Sie live dabei und sichern Sie sich wertvolles Know-how – Plätze sind begrenzt!",
            status: "ausstehend"
        },
        {
            id: 5,
            title: "Nachhaltigkeit im Fokus",
            description: "Unser Engagement für eine grünere Zukunft steht im Mittelpunkt.",
            keywords: ["Nachhaltigkeit", "Umwelt", "Innovation"],
            contentplan: 2,
            date: "2025-04-18",
            time: "11:00",
            platforms: ["instagram"],
            image: "",
            text: "Wir setzen auf nachhaltige Lösungen – für eine bessere Welt und zukunftssichere Technologien.",
            status: "ausstehend"
        }
    ]);

    const {setActiveModal} = useModalContext();
    const {addPost} = usePostContext();
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [step, setStep] = useState(1);
    const [stackCount, setStackCount] = useState(postings.length);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        schlagwoerter: [] as string[],
        contentplan: null,
        date: '',
        time: '',
        platforms: [] as PlatformType[],
        image: '',
        text: 'Hier ist ein Beispieltext für deinen Instagram Post! \n\n#inspiration #motivation #vektrus #socialmedia #posting'
    });



    const contentPlans: ContentPlan[] = [
        {
            id: 1,
            title: "Content-Plan 1",
            startDate: new Date(),
            endDate: new Date(),
        },
        {
            id: 2,
            title: "Content-Plan 2",
            startDate: new Date(),
            endDate: new Date(),
        },
        {
            id: 3,
            title: "Content-Plan 3",
            startDate: new Date(),
            endDate: new Date(),
        },
    ];

    useEffect(() => {
        if (isOpen) {
            setActiveModal('create-post');
        }
    }, [isOpen, setActiveModal]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
            return;
        }

        try {
            const postDate = formatPostDate(formData.date, formData.time);
            addPost({
                title: formData.title,
                schlagwoerter: formData.schlagwoerter,
                contentplan: formData.contentplan,
                status: 'in-review',
                time: formData.time,
                day: postDate.getDate(),
                image: formData.image || undefined,
                text: formData.text
            });

            setFormData({
                title: '',
                description: '',
                schlagwoerter: '',
                contentplan: '',
                date: '',
                time: '',
                platforms: [],
                image: '',
                text: 'Hier ist ein Beispieltext für deinen Instagram Post! \n\n#inspiration #motivation #vektrus #socialmedia #posting'
            });
            setStep(1);
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleBack = () => {
        if (step === 1) {
            onClose();
        } else {
            setStep(step - 1);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} stackCount={stackCount} step={step} title="Posting erstellen">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && (
                        <PlatformAndContentPlan
                            contentPlans={contentPlans}
                            formData={formData}
                            setFormData={setFormData}
                            setStep={setStep}
                            onClose={onClose}
                        />
                    )}
                    {step === 2 && (
                        <LoadingScreenContentPlaner
                            setStep={setStep}
                        />
                    )}
                    {step === 3 && (
                        <ContentPlannerConfirmation
                            setStackCount={setStackCount}
                            stackCount={stackCount}
                            onClose={onClose}
                            postings={postings}
                            setPostings={setPostings}
                            setStep={setStep}
                        />
                    )}
                    {step === 4 && (
                        <ImageSelector
                            setStep={setStep}
                        />
                    )}
                    {step === 5 && (
                        <SelectContentPlan
                            formData={formData}
                            contentPlans={contentPlans}
                            setFormData={setFormData}
                            setStep={setStep}
                            prevStep={1}
                        />
                    )}
                </form>
            </Modal>

            {showImagePreview && formData.image && (
                <ImagePreview src={formData.image} onClose={() => setShowImagePreview(false)}/>
            )}
        </>
    );
}
