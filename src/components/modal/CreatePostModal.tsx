import React, {useState, useEffect, FormEvent, useRef} from 'react';
import Modal from './Modal';
import ImagePreview from './ImagePreview';
import {useModalContext} from '../../context/ModalContext';
import {usePostContext} from '../../context/PostContext';
import {formatPostDate} from '../../utils/dateUtils';
import type {PlatformType} from '../../types/platform';
import PlatformIcon from "../platform/PlatformIcon";
import ImageSelector from "./ImageSelector";
import DescriptionAndPlatform from "./scenes/DescriptionAndPlatform";
import KeywordsAndContentPlan from "./scenes/KeywordsAndContentPlan";
import PostPreview from "./scenes/PostPreview";
import SelectContentPlan from "./scenes/SelectContentPlan";

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

export default function CreatePostModal({isOpen, onClose}: CreatePostModalProps) {
    const {setActiveModal} = useModalContext();
    const {addPost} = usePostContext();
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [step, setStep] = useState(1);



    const [formData, setFormData] = useState({
        id: 99,
        title: '',
        description: '',
        keywords: [] as string[],
        contentplan: '',
        date: '',
        time: '',
        platforms: [] as PlatformType[],
        image: '',
        text: 'Hier ist ein Beispieltext für deinen Instagram Post! \n\n#inspiration #motivation #vektrus #socialmedia #posting',
        status: 'ausstehend'
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

    useEffect(() => {
        console.log(formData)
    }, [formData]);

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
            <Modal isOpen={isOpen} onClose={onClose} title="Posting erstellen">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <DescriptionAndPlatform
                                formData={formData}
                                setFormData={setFormData}
                                setStep={setStep}
                                onClose={onClose}
                            />
                        )}
                        {step === 2 && (
                            <KeywordsAndContentPlan
                                formData={formData}
                                setFormData={setFormData}
                                setStep={setStep}
                                contentPlans={contentPlans}
                            />
                        )}
                        {step === 3 && (
                            <PostPreview
                                formData={formData}
                                setFormData={setFormData}
                                setStep={setStep}
                                onClose={onClose}
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
                                prevStep={2}
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
