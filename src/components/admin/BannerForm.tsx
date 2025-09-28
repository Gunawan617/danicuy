'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { bannerService } from '@/lib/api';
import { Banner } from '@/types';

interface BannerFormProps {
  bannerId: string;
}

export default function BannerForm({ bannerId }: BannerFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState<'home' | 'tryout' | 'bimbel'>('home');
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isNew = bannerId === 'new';

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      bannerService.getBannerById(bannerId)
        .then((data: Banner) => {
          setTitle(data.title);
          setDescription(data.description || '');
          setLink(data.link || '');
          setType(data.type);
          setIsActive(data.isActive);
          setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`);
        })
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [bannerId, isNew]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('type', type);
    formData.append('isActive', String(isActive));
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isNew) {
        await bannerService.createBanner(formData);
      } else {
        await bannerService.updateBanner(bannerId, formData);
      }
      router.push('/admin/banners');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isNew) return <div>Loading banner data...</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{isNew ? 'Create New Banner' : 'Edit Banner'}</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="link" className="block text-gray-700 font-bold mb-2">Link URL</label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="https://example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'home' | 'tryout' | 'bimbel')}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="home">Home</option>
            <option value="tryout">Tryout</option>
            <option value="bimbel">Bimbel</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Banner Image</label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-24 w-48 rounded-md overflow-hidden bg-gray-100">
            {imagePreview ? (
              <img src={imagePreview} alt="Banner preview" className="h-full w-full object-cover" />
            ) : (
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.993A2 2 0 002 18h20a2 2 0 002 2.993zM22 12c0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6 6-2.686 6-6zM16 8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
              </svg>
            )}
          </span>
          <label
            htmlFor="image-upload"
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            <span>Upload a file</span>
            <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Banner'}
        </button>
      </div>
    </form>
  );
}