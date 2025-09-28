'use client';

import withAuth from '@/components/withAuth';

function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to the admin panel. Select a resource to manage from the sidebar.</p>
    </div>
  );
}

export default withAuth(AdminDashboardPage);