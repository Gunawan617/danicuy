'use client';

import BookForm from '@/components/admin/BookForm';

export default function NewBookPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <BookForm bookId="new" />
    </div>
  );
}
