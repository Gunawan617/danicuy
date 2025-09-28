'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/banners', label: 'Banners' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/books', label: 'Books' },
  { href: '/admin/faqs', label: 'FAQs' },
  { href: '/admin/tryout-packages', label: 'Tryout Packages' },
  { href: '/admin/bimbel-packages', label: 'Bimbel Packages' },
  { href: '/admin/users', label: 'Users' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}