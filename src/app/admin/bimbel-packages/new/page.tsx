'use client';

import BimbelPackageForm from '@/components/admin/BimbelPackageForm';

export default function NewBimbelPackagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Bimbel Package</h1>
      <BimbelPackageForm packageId="new" />
    </div>
  );
}
