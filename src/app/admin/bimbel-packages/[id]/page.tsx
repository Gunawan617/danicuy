'use client';

import BimbelPackageForm from '@/components/admin/BimbelPackageForm';

interface EditBimbelPackagePageProps {
  params: {
    id: string;
  };
}

export default function EditBimbelPackagePage({ params }: EditBimbelPackagePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Bimbel Package</h1>
      <BimbelPackageForm packageId={params.id} />
    </div>
  );
}
