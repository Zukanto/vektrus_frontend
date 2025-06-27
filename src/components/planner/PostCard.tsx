import React from 'react';
import {CheckCircle, Clock} from 'lucide-react';
import PlatformIcon from '../platform/PlatformIcon';
import type {Post} from '../../types/post';
import placeholder from "../../../public/image-placeholder.png";
import StatusAndPlatform from "../modal/StatusAndPlatform";
import StatusAndPlatformPostCard from "../modal/StatusAndPlatformPostCard";

interface PostCardProps {
    post: Post;
    onClick: (post: Post) => void;
}

export default function PostCard({post, onClick}: PostCardProps) {
    console.log(post);
    return (
        <div
            onClick={() => onClick(post)}
            className=" mb-2 bg-white rounded-lg border border-gray-200 hover:shadow-md hover-transition cursor-pointer"
        >
          <StatusAndPlatformPostCard post={post}/>

            <div class={"p-3"}>
              <h3 className="font-medium text-vektrus-gray-dark mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Name Contentplan</p>

              {post.image && (
                  <div className="mb-2">
                    <img
                        src={post.image || placeholder}
                        alt="Post preview"
                        className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
              )}

              <div className="text-xs text-gray-500">{post.time}</div>
            </div>
        </div>
    );
}