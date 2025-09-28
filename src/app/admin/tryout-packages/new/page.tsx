'use client';

import TryoutPackageForm from '@/components/admin/TryoutPackageForm';

export default function NewTryoutPackagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Tryout Package</h1>
      <TryoutPackageForm packageId="new" />
    </div>
  );
}
