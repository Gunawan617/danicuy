'use client';

import FAQForm from '@/components/admin/FAQForm';

interface EditFAQPageProps {
  params: {
    id: string;
  };
}

export default function EditFAQPage({ params }: EditFAQPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit FAQ</h1>
      <FAQForm faqId={params.id} />
    </div>
  );
}
