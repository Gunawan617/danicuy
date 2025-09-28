'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { tryoutPackageService } from '@/lib/api';
import { TryoutPackage } from '@/types';

interface TryoutPackageFormProps {
  packageId: string;
}

export default function TryoutPackageForm({ packageId }: TryoutPackageFormProps) {
  const [nama, setNama] = useState('');
  const [profesi, setProfesi] = useState<'bidan' | 'perawat'>('bidan');
  const [jenjang, setJenjang] = useState<'D3' | 'D4-S1'>('D3');
  const [durasi_bulan, setDurasiBulan] = useState(1);
  const [harga, setHarga] = useState(0);
  const [fitur, setFitur] = useState('');
  const [jumlah_soal, setJumlahSoal] = useState(0);
  const [deskripsi, setDeskripsi] = useState('');
  const [target_audience, setTargetAudience] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [gambar, setGambar] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isNew = packageId === 'new';

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      tryoutPackageService.getTryoutPackageById(packageId)
        .then((data: TryoutPackage) => {
          setNama(data.nama);
          setProfesi(data.profesi);
          setJenjang(data.jenjang);
          setDurasiBulan(data.durasi_bulan);
          setHarga(data.harga);
          setFitur(data.fitur);
          setJumlahSoal(data.jumlah_soal);
          setDeskripsi(data.deskripsi);
          setTargetAudience(data.target_audience);
          setIsActive(data.isActive);
          setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}${data.gambar}`);
        })
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [packageId, isNew]);

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
    formData.append('nama', nama);
    formData.append('profesi', profesi);
    formData.append('jenjang', jenjang);
    formData.append('durasi_bulan', String(durasi_bulan));
    formData.append('harga', String(harga));
    formData.append('fitur', fitur);
    formData.append('jumlah_soal', String(jumlah_soal));
    formData.append('deskripsi', deskripsi);
    formData.append('target_audience', target_audience);
    formData.append('isActive', String(isActive));
    if (gambar) {
      formData.append('gambar', gambar);
    }

    try {
      if (isNew) {
        await tryoutPackageService.createTryoutPackage(formData);
      } else {
        await tryoutPackageService.updateTryoutPackage(packageId, formData);
      }
      router.push('/admin/tryout-packages');
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
        <label htmlFor="nama" className="block text-gray-700 font-bold mb-2">Package Name</label>
        <input type="text" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="profesi" className="block text-gray-700 font-bold mb-2">Profession</label>
          <select id="profesi" value={profesi} onChange={(e) => setProfesi(e.target.value as 'bidan' | 'perawat')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="bidan">Bidan</option>
            <option value="perawat">Perawat</option>
          </select>
        </div>
        <div>
          <label htmlFor="jenjang" className="block text-gray-700 font-bold mb-2">Level</label>
          <select id="jenjang" value={jenjang} onChange={(e) => setJenjang(e.target.value as 'D3' | 'D4-S1')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="D3">D3</option>
            <option value="D4-S1">D4/S1</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label htmlFor="durasi_bulan" className="block text-gray-700 font-bold mb-2">Duration (Months)</label>
          <input type="number" id="durasi_bulan" value={durasi_bulan} onChange={(e) => setDurasiBulan(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div>
          <label htmlFor="harga" className="block text-gray-700 font-bold mb-2">Price</label>
          <input type="number" id="harga" value={harga} onChange={(e) => setHarga(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div>
          <label htmlFor="jumlah_soal" className="block text-gray-700 font-bold mb-2">Number of Questions</label>
          <input type="number" id="jumlah_soal" value={jumlah_soal} onChange={(e) => setJumlahSoal(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="fitur" className="block text-gray-700 font-bold mb-2">Features (comma-separated)</label>
        <input type="text" id="fitur" value={fitur} onChange={(e) => setFitur(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
      </div>

      <div className="mb-4">
        <label htmlFor="deskripsi" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24" required></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="target_audience" className="block text-gray-700 font-bold mb-2">Target Audience</label>
        <input type="text" id="target_audience" value={target_audience} onChange={(e) => setTargetAudience(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Package Image</label>
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

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />
          <span className="ml-2 text-gray-700">Active</span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Saving...' : (isNew ? 'Create Package' : 'Update Package')}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
