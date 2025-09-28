'use client';

import BannerForm from '@/components/admin/BannerForm';

export default function EditBannerPage({ params }: { params: { id: string } }) {
  return <BannerForm bannerId={params.id} />;
}