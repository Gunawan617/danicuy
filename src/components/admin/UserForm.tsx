'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/lib/api';
import { User } from '@/types';

interface UserFormProps {
  userId: string;
}

export default function UserForm({ userId }: UserFormProps) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [profesi, setProfesi] = useState<'bidan' | 'perawat' | 'admin'>('bidan');
  const [jenjang, setJenjang] = useState<'D3' | 'D4-S1' | 'N/A'>('N/A');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    userService.getUserById(userId)
      .then((data: User) => {
        setNama(data.nama);
        setEmail(data.email);
        setProfesi(data.profesi);
        setJenjang(data.jenjang);
        setRole(data.role);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = { nama, email, profesi, jenjang, role };

    try {
      await userService.updateUser(userId, userData);
      router.push('/admin/users');
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
          <label htmlFor="nama" className="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div>
          <label htmlFor="profesi" className="block text-gray-700 font-bold mb-2">Profession</label>
          <select id="profesi" value={profesi} onChange={(e) => setProfesi(e.target.value as 'bidan' | 'perawat' | 'admin')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="bidan">Bidan</option>
            <option value="perawat">Perawat</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="jenjang" className="block text-gray-700 font-bold mb-2">Level</label>
          <select id="jenjang" value={jenjang} onChange={(e) => setJenjang(e.target.value as 'D3' | 'D4-S1' | 'N/A')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="D3">D3</option>
            <option value="D4-S1">D4/S1</option>
            <option value="N/A">N/A</option>
          </select>
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value as 'user' | 'admin')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Update User'}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
