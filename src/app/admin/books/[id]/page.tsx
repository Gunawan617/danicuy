'use client';

import BookForm from '@/components/admin/BookForm';

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default function EditBookPage({ params }: EditBookPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <BookForm bookId={params.id} />
    </div>
  );
}
