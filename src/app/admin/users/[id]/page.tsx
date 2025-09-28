'use client';

import UserForm from '@/components/admin/UserForm';

interface EditUserPageProps {
  params: {
    id: string;
  };
}

export default function EditUserPage({ params }: EditUserPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <UserForm userId={params.id} />
    </div>
  );
}
