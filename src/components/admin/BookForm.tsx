'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { bookService } from '@/lib/api';
import { Book } from '@/types';

interface BookFormProps {
  bookId: string;
}

export default function BookForm({ bookId }: BookFormProps) {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState(0);
  const [kategori, setKategori] = useState<'Bidan' | 'Perawat'>('Bidan');
  const [halaman, setHalaman] = useState(0);
  const [stok, setStok] = useState(0);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [diskon, setDiskon] = useState(0);
  const [active, setActive] = useState(true);
  const [gambar, setGambar] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isNew = bookId === 'new';

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      bookService.getBookById(bookId)
        .then((data: Book) => {
          setJudul(data.judul);
          setPenulis(data.penulis);
          setDeskripsi(data.deskripsi);
          setHarga(data.harga);
          setKategori(data.kategori);
          setHalaman(data.halaman);
          setStok(data.stok);
          setIsBestSeller(data.isBestSeller);
          setDiskon(data.diskon || 0);
          setActive(data.active);
          setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${data.gambar}`);
        })
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [bookId, isNew]);

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
    formData.append('penulis', penulis);
    formData.append('deskripsi', deskripsi);
    formData.append('harga', String(harga));
    formData.append('kategori', kategori);
    formData.append('halaman', String(halaman));
    formData.append('stok', String(stok));
    formData.append('isBestSeller', String(isBestSeller));
    formData.append('diskon', String(diskon));
    formData.append('active', String(active));
    if (gambar) {
      formData.append('gambar', gambar);
    }

    try {
      if (isNew) {
        await bookService.createBook(formData);
      } else {
        await bookService.updateBook(bookId, formData);
      }
      router.push('/admin/books');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Title</label>
          <input type="text" id="judul" value={judul} onChange={(e) => setJudul(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="penulis" className="block text-gray-700 font-bold mb-2">Author</label>
          <input type="text" id="penulis" value={penulis} onChange={(e) => setPenulis(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="deskripsi" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24" required></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mb-4">
          <label htmlFor="harga" className="block text-gray-700 font-bold mb-2">Price</label>
          <input type="number" id="harga" value={harga} onChange={(e) => setHarga(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="halaman" className="block text-gray-700 font-bold mb-2">Pages</label>
          <input type="number" id="halaman" value={halaman} onChange={(e) => setHalaman(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="stok" className="block text-gray-700 font-bold mb-2">Stock</label>
          <input type="number" id="stok" value={stok} onChange={(e) => setStok(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label htmlFor="kategori" className="block text-gray-700 font-bold mb-2">Category</label>
          <select id="kategori" value={kategori} onChange={(e) => setKategori(e.target.value as 'Bidan' | 'Perawat')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="Bidan">Bidan</option>
            <option value="Perawat">Perawat</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="diskon" className="block text-gray-700 font-bold mb-2">Discount (%)</label>
          <input type="number" id="diskon" value={diskon} onChange={(e) => setDiskon(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Book Image</label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-24 w-24 rounded-md overflow-hidden bg-gray-100">
            {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.993A2 2 0 002 18h20a2 2 0 002 2.993zM22 16H2a2 2 0 00-2 2v.993A2 2 0 002 21h20a2 2 0 002-2.007V18a2 2 0 00-2-2zM4 9a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 110 8 4 4 0 010-8zm16-3a1 1 0 011 1v6a1 1 0 11-2 0V5a1 1 0 011-1z" /></svg>}
          </span>
          <label htmlFor="file-upload" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            <span>{isNew ? 'Upload image' : 'Change image'}</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-6 mb-4">
        <label className="inline-flex items-center">
          <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-gray-700">Best Seller</span>
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-gray-700">Active</span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Saving...' : (isNew ? 'Create Book' : 'Update Book')}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
