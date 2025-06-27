import React, { useState } from 'react';
import { X, Save, Edit2, Linkedin, Twitter, CheckCircle, Clock } from 'lucide-react';
import type { Post, PostUpdate } from '../../types/post';

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, updates: PostUpdate) => void;
}

export default function PostModal({ post, isOpen, onClose, onSave }: PostModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PostUpdate>({
    title: post.title,
    description: post.description,
    status: post.status,
    image: post.image
  });

  if (!isOpen) return null;

  const PlatformIcon = post.platform === 'linkedin' ? Linkedin : Twitter;

  const handleSave = () => {
    onSave(post.id, formData);
    setIsEditing(false);
  };

  const toggleStatus = () => {
    const newStatus = formData.status === 'approved' ? 'in-review' : 'approved';
    setFormData({ ...formData, status: newStatus });
    onSave(post.id, { ...formData, status: newStatus });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-vektrus-gray-dark">Post Details</h2>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:text-vektrus-primary rounded-full hover:bg-gray-100"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PlatformIcon className="w-6 h-6 text-gray-600" />
            <button
              onClick={toggleStatus}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                formData.status === 'approved'
                  ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                  : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
              }`}
            >
              {formData.status === 'approved' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Approved</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  <span>In Review</span>
                </>
              )}
            </button>
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-primary"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-32 mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-primary"
              />
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Image URL"
                className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vektrus-primary"
              />
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
            </>
          )}

          {post.image && (
            <div className="mb-4">
              <img
                src={post.image}
                alt="Post preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {isEditing && (
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-vektrus-primary text-white rounded-lg hover:bg-vektrus-primary-dark flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}