'use client';

import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Article</h1>
      <ArticleForm articleId="new" />
    </div>
  );
}
