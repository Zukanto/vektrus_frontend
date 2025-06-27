import PlatformIcon from "../platform/PlatformIcon";
import React from "react";


type Props = {
    formData: any
}

const StatusAndPlatform = ({formData}: Props) => {
    return(
        <div>
            <div className="relative z-20 flex justify-between items-center -mt-4">
                <div
                    className="w-32 rounded-r-md h-8 bg-vektrus-check-dark flex items-center justify-center text-white">
                    ausstehend
                </div>
                <div
                    className="w-32 rounded-l-md h-8 bg-vektrus-sm-dark flex items-center justify-center gap-2 pl-2 text-white">
                    {formData.platforms.map((platform) => (
                        <PlatformIcon key={platform} platform={platform} className="text-white h-5"/>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center -mt-6">
                <div
                    className="w-[135px] rounded-r-md h-8 bg-vektrus-check-light flex items-center justify-center text-white"></div>
                <div
                    className="w-[115px] rounded-l-md h-8 bg-vektrus-sm-light flex items-center justify-center text-white"></div>
            </div>
        </div>
    )
}

export default StatusAndPlatform