import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { X, Camera, Save } from 'lucide-react';
import { fileToDataUrl } from '../utils/helpers';

export default function UserProfileModal({ isOpen, onClose }) {
    const { user, updateProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        profilePicture: ''
    });
    const [loading, setLoading] = useState(false);
    const [profileFile, setProfileFile] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                profilePicture: user.profilePicture || ''
            });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfileImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            toast.error('Image size should be 3MB or less');
            return;
        }

        try {
            const dataUrl = await fileToDataUrl(file);
            setFormData((prev) => ({ ...prev, profilePicture: dataUrl }));
            setProfileFile(file);
            toast.success('Profile image selected');
        } catch (error) {
            toast.error('Failed to process image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requestData = profileFile ? (() => {
                const data = new FormData();
                data.append('name', formData.name);
                data.append('bio', formData.bio || '');
                data.append('profilePicture', formData.profilePicture || '');
                data.append('profileImage', profileFile);
                return data;
            })() : {
                name: formData.name,
                bio: formData.bio,
                profilePicture: formData.profilePicture
            };

            await updateProfile(requestData);
            toast.success('Profile updated successfully!');
            onClose();
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl animate-fade-in-up">
                <div className="relative h-32 bg-gradient-to-r from-red-500 to-orange-500">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    {/* Profile Image with Edit Button */}
                    <div className="relative -mt-16 mb-6 flex justify-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                                <img
                                    src={formData.profilePicture || `https://ui-avatars.com/api/?name=${formData.name}&background=random`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Overlay for "Change Photo" - Simplified as input for URL now */}
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color outline-none transition font-semibold text-gray-800"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color outline-none transition font-medium text-gray-600 resize-none"
                                placeholder="Tell us about your culinary journey..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Profile Picture URL</label>
                            <input
                                type="text"
                                name="profilePicture"
                                value={formData.profilePicture}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-color outline-none transition font-medium text-gray-600 text-xs"
                                placeholder="https://..."
                            />
                            <label className="mt-3 block text-sm font-bold text-gray-700 mb-1">Upload from device</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageUpload}
                                className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:border-0 file:rounded-lg file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Saving...</span>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
