import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Camera, Save, X, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { fileToDataUrl } from '../utils/helpers';

export default function Profile() {
    const { user, updateProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        profilePicture: user?.profilePicture || user?.avatar || '',
    });
    const [profileFile, setProfileFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Update formData when user context changes/loads
    React.useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                profilePicture: user.profilePicture || user.avatar || '',
            });
        }
    }, [user]);

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

        setProfileFile(file);

        try {
            const dataUrl = await fileToDataUrl(file);
            setFormData((prev) => ({ ...prev, profilePicture: dataUrl }));
            toast.success('Profile image selected');
        } catch (error) {
            toast.error('Failed to process image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let submissionData;

        if (profileFile) {
            submissionData = new FormData();
            submissionData.append('name', formData.name);
            submissionData.append('bio', formData.bio);
            submissionData.append('profileImage', profileFile);
        } else {
            submissionData = {
                ...formData,
                avatar: formData.profilePicture
            };
        }

        try {
            await updateProfile(submissionData);
            toast.success('Profile updated successfully');
            setIsEditing(false);
            setProfileFile(null); 
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in-up">

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="h-32 md:h-48 bg-gradient-to-r from-orange-400 to-red-500 relative">
                    <div className="absolute -bottom-12 left-4 md:-bottom-16 md:left-8">
                        <div className="relative group">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden shadow-lg">
                                {(user?.profilePicture || user?.avatar) ? (
                                    <img
                                        src={user.profilePicture || user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${user?.name}&background=random`;
                                        }}
                                    />
                                ) : (
                                    <span className="text-3xl md:text-4xl font-bold text-gray-400">{user?.name?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            {/* Camera Icon now just instructional since we use URL input */}
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-1.5 md:p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-orange-500 transition-colors"
                            >
                                <Edit size={16} className="md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-16 px-4 md:pt-20 md:px-8 pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                        <div className="w-full">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-500 text-sm md:text-base">{user?.email}</p>
                            {user?.bio && !isEditing && (
                                <p className="mt-4 text-gray-700 max-w-2xl italic text-sm md:text-base">"{user.bio}"</p>
                            )}
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-all text-center ${isEditing
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-105'
                                }`}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg animate-fade-in">
                            {/* Profile Picture URL */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Profile Picture URL</label>
                                <div className="relative">
                                    <Camera className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="profilePicture"
                                        value={formData.profilePicture}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <label className="mt-3 block text-sm font-bold text-gray-700 mb-2">Upload from device</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImageUpload}
                                    className="w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:border-0 file:rounded-lg file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
                                />
                                <p className="text-xs text-gray-500 mt-1">Use URL or upload a local image (max 3MB)</p>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell us about yourself..."
                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Email (Read only) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                                <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                                    <User size={20} />
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm text-gray-500 block">Full Name</span>
                                        <span className="font-medium text-gray-900">{user?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block">Bio</span>
                                        <span className="font-medium text-gray-900">{user?.bio || 'No bio added yet.'}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block">Member Since</span>
                                        <span className="font-medium text-gray-900">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    <Mail size={20} />
                                    Contact Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm text-gray-500 block">Email Address</span>
                                        <span className="font-medium text-gray-900">{user?.email}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block">Status</span>
                                        <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
