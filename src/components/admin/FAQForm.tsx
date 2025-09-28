'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { faqService } from '@/lib/api';
import { FAQ } from '@/types';

interface FAQFormProps {
  faqId: string;
}

export default function FAQForm({ faqId }: FAQFormProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [kategori, setKategori] = useState('Umum');
  const [urutan, setUrutan] = useState(0);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isNew = faqId === 'new';

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      faqService.getFAQById(faqId)
        .then((data: FAQ) => {
          setQuestion(data.question);
          setAnswer(data.answer);
          setKategori(data.kategori);
          setUrutan(data.urutan);
          setActive(data.active);
        })
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [faqId, isNew]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const faqData = { question, answer, kategori, urutan, active };

    try {
      if (isNew) {
        await faqService.createFAQ(faqData);
      } else {
        await faqService.updateFAQ(faqId, faqData);
      }
      router.push('/admin/faqs');
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
        <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">Answer</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="kategori" className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div>
          <label htmlFor="urutan" className="block text-gray-700 font-bold mb-2">Order</label>
          <input
            type="number"
            id="urutan"
            value={urutan}
            onChange={(e) => setUrutan(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Active</span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Saving...' : (isNew ? 'Create FAQ' : 'Update FAQ')}
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
