'use client';

import FAQForm from '@/components/admin/FAQForm';

export default function NewFAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New FAQ</h1>
      <FAQForm faqId="new" />
    </div>
  );
}
