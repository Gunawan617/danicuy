'use client';

import TryoutPackageForm from '@/components/admin/TryoutPackageForm';

interface EditTryoutPackagePageProps {
  params: {
    id: string;
  };
}

export default function EditTryoutPackagePage({ params }: EditTryoutPackagePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Tryout Package</h1>
      <TryoutPackageForm packageId={params.id} />
    </div>
  );
}
