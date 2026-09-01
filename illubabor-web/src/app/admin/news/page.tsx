'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileUpload } from '@/components/file-upload';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  excerpt?: string;
  content: string;
  coverImage?: string | null;
  images?: string[];
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'DRAFT',
    coverImage: '',
    images: [] as string[],
  });

  const [saving, setSaving] = useState(false);
  const [zoneId, setZoneId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);

    api
      .get('/news/admin/all')
      .then((res) => setNews(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();

    api
      .get('/zones/current')
      .then((res) => setZoneId(res.data.id));
  }, []);

  const startCreate = () => {
    setCreating(true);
    setEditing(null);

    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      status: 'DRAFT',
      coverImage: '',
      images: [],
    });
  };

  const startEdit = (n: NewsItem) => {
    setEditing(n);
    setCreating(false);

    setForm({
      title: n.title,
      slug: n.slug,
      excerpt: n.excerpt ?? '',
      content: n.content,
      status: n.status,
      coverImage: n.coverImage ?? '',
      images: n.images ?? [],
    });
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
  };

  const save = async () => {
    if (!form.title.trim()) {
      alert('Title is required.');
      return;
    }

    if (!form.slug.trim()) {
      alert('Slug is required.');
      return;
    }

    if (!form.content.trim()) {
      alert('Content is required.');
      return;
    }

    if (creating && !zoneId) {
      alert('Zone information is not available.');
      return;
    }

    setSaving(true);

    try {
      if (creating) {
        await api.post('/news', {
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content: form.content,
          coverImage: form.coverImage,
          images: form.images,
          zoneId,
        });
      } else if (editing) {
        await api.patch(`/news/${editing.id}`, {
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content: form.content,
          status: form.status,
          coverImage: form.coverImage,
          images: form.images,
        });
      }

      cancel();
      load();
    } catch (error) {
      console.error(error);
      alert('Save failed — check required fields.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/news/${id}`);
      load();
    } catch (error) {
      console.error(error);
      alert('Failed to delete the article.');
    }
  };

  const showForm = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee-950">
          News
        </h1>

        {!showForm && (
          <button
            onClick={startCreate}
            className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500"
          >
            + New Article
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-coffee-950">
            {creating ? 'New Article' : `Edit: ${editing?.title}`}
          </h2>

          <div className="mt-4 grid gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Title
              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Slug
              </label>

              <input
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value,
                  })
                }
                placeholder="example-news-article"
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />

              {editing && (
                <p className="mt-1 text-xs text-ink-600">
                  Changing this changes the article's public URL.
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Excerpt
              </label>

              <input
                value={form.excerpt}
                onChange={(e) =>
                  setForm({
                    ...form,
                    excerpt: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Cover Image */}
            <div>
              <FileUpload
                label="Cover Image (shown in the article list)"
                value={form.coverImage}
                onChange={(url) =>
                  setForm({
                    ...form,
                    coverImage: url,
                  })
                }
                accept="image/*"
              />
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Additional Images
              </label>

              <div className="mt-2 space-y-2">
                {form.images.map((url, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-md border border-coffee-950/10 bg-white p-2"
                  >
                    <img
                      src={url}
                      alt=""
                      className="h-12 w-12 rounded object-cover"
                    />

                    <p className="flex-1 truncate text-xs text-ink-600">
                      {url}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          images: form.images.filter(
                            (_, idx) => idx !== i,
                          ),
                        })
                      }
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <FileUpload
                  value=""
                  onChange={(url) => {
                    if (url) {
                      setForm({
                        ...form,
                        images: [...form.images, url],
                      });
                    }
                  }}
                  accept="image/*"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-ink-950">
                Content
              </label>

              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: e.target.value,
                  })
                }
                rows={8}
                className="mt-1 w-full rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
              />
            </div>

            {/* Status */}
            {editing && (
              <div>
                <label className="block text-sm font-medium text-ink-950">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  className="mt-1 rounded-md border border-coffee-950/20 px-3 py-2 text-sm"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-md bg-clay-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-500 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>

            <button
              onClick={cancel}
              disabled={saving}
              className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5 disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* News List */}
      {loading ? (
        <div className="mt-6 text-sm text-coffee-600">
          Loading…
        </div>
      ) : news.length === 0 ? (
        <div className="mt-6 rounded-lg border border-coffee-950/10 bg-white p-6 text-sm text-coffee-600">
          No news articles found.
        </div>
      ) : (
        <div className="mt-6 divide-y divide-coffee-950/10 rounded-lg border border-coffee-950/10 bg-white">
          {news.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                {n.coverImage ? (
                  <img
                    src={n.coverImage}
                    alt={n.title}
                    className="h-14 w-20 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-20 items-center justify-center rounded-md bg-coffee-950/5 text-xs text-coffee-500">
                    No image
                  </div>
                )}

                <div>
                  <p className="font-medium text-coffee-950">
                    {n.title}
                  </p>

                  <p className="text-xs text-coffee-600">
                    {n.status}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(n)}
                  className="text-sm text-clay-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(n.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}