'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { articleService } from '@/lib/api';
import { Article } from '@/types';

interface ArticleFormProps {
  articleId: string;
}

export default function ArticleForm({ articleId }: ArticleFormProps) {
  const [judul, setJudul] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [konten, setKonten] = useState('');
  const [penulis, setPenulis] = useState('');
  const [kategori, setKategori] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [gambar, setGambar] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isNew = articleId === 'new';

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      articleService.getArticleById(articleId)
        .then((data: Article) => {
          setJudul(data.judul);
          setExcerpt(data.excerpt);
          setKonten(data.konten);
          setPenulis(data.penulis);
          setKategori(data.kategori);
          setTags(data.tags.join(', '));
          setIsPublished(data.isPublished);
          setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${data.gambar}`);
        })
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [articleId, isNew]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambar(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('excerpt', excerpt);
    formData.append('konten', konten);
    formData.append('penulis', penulis);
    formData.append('kategori', kategori);
    formData.append('tags', tags);

    formData.append('isPublished', String(isPublished));
    if (gambar) {
      formData.append('gambar', gambar);
    }

    try {
      if (isNew) {
        await articleService.createArticle(formData);
      } else {
        await articleService.updateArticle(articleId, formData);
      }
      router.push('/admin/articles');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      
      <div className="mb-4">
        <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="excerpt" className="block text-gray-700 font-bold mb-2">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="konten" className="block text-gray-700 font-bold mb-2">Content</label>
        <textarea
          id="konten"
          value={konten}
          onChange={(e) => setKonten(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="penulis" className="block text-gray-700 font-bold mb-2">Author</label>
          <input
            type="text"
            id="penulis"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="kategori" className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Article Image</label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-24 w-24 rounded-md overflow-hidden bg-gray-100">
            {imagePreview ? (
              <img src={imagePreview} alt="Image preview" className="h-full w-full object-cover" />
            ) : (
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.993A2 2 0 002 18h20a2 2 0 002 2.993zM22 16H2a2 2 0 00-2 2v.993A2 2 0 002 21h20a2 2 0 002-2.007V18a2 2 0 00-2-2zM4 9a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 110 8 4 4 0 010-8zm16-3a1 1 0 011 1v6a1 1 0 11-2 0V5a1 1 0 011-1z" />
              </svg>
            )}
          </span>
          <label
            htmlFor="file-upload"
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            <span>{isNew ? 'Upload image' : 'Change image'}</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Published</span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Saving...' : (isNew ? 'Create Article' : 'Update Article')}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
