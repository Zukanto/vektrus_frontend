import React from 'react';
import {X} from 'lucide-react';
import {useModalContext} from '../../context/ModalContext';
import {useClickOutside} from '../../hooks/useClickOutside';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    stackCount?: number;
    step?: number;
}

export default function Modal({
                                  isOpen,
                                  onClose,
                                  title,
                                  children,
                                  stackCount,
                                  step
                              }: ModalProps) {
    const {isPickerActive} = useModalContext();
    const modalRef = useClickOutside<HTMLDivElement>(() => {
        if (!isPickerActive) {
            onClose();
        }
    });

    if (!isOpen) return null;

    // Ermittel die tatsächliche Anzahl der anzuzeigenden Layer
    let layers = 0;
    if (typeof stackCount === 'number') {
        if (stackCount >= 3) {
            layers = 3;
        } else if (stackCount > 0) {
            layers = stackCount;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-[10vh]">
            <div
                ref={modalRef}
                className="relative w-full max-w-xl max-h-[80vh] flex flex-col animate-fade-in"
            >
                {/* Wenn layers >= 2, legen wir eine 2. "Schicht" leicht versetzt darunter */}
                {layers >= 2 && step == 3 && (
                    <div
                        className="absolute top-2 left-2 w-full h-full bg-vektrus-sm-light rounded-xl shadow-2xl z-20 transform -rotate-1"/>
                )}
                {/* Wenn layers >= 3, legen wir eine 3. "Schicht" leicht versetzt darunter */}
                {layers >= 3 && step == 3 && (
                    <div
                        className="absolute top-4 left-4 w-full h-full bg-vektrus-sm-dark rounded-xl shadow-2xl z-10 transform -rotate-2"/>
                )}

                {/* Eigentliche Modal-Box (immer oben) */}
                <div className="relative bg-white rounded-xl shadow-2xl z-30">
                    {/* Inhalt */}
                    <div className="flex-1 overflow-y-auto p-4">{children}</div>
                </div>
            </div>
        </div>
    );
}
