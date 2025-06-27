import PlatformIcon from "../platform/PlatformIcon";
import React from "react";
import {Post} from "../../types/post";


type Props = {
    post: Post
}

const StatusAndPlatformPostCard = ({post}: Props) => {
    return(
        <div>
            <div className="relative flex justify-between items-center">
                <div
                    className="w-20 rounded-tl-md rounded-br-md h-8 bg-vektrus-check-dark flex items-center justify-center text-white text-xs">
                    {post.status}
                </div>
                <div
                    className="w-20 rounded-bl-md rounded-tr-md h-8 bg-vektrus-sm-dark flex items-center justify-center gap-1 pl-2 text-white">
                    {post.platforms.map((platform) => (
                        <PlatformIcon key={platform} platform={platform} className="text-white h-4"/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatusAndPlatformPostCard