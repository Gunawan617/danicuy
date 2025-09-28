'use client';

import ArticleForm from '@/components/admin/ArticleForm';

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
      <ArticleForm articleId={params.id} />
    </div>
  );
}
