"use client";

export default function Card({ link }: { link: any }) {
  const createdDate = new Date(link.createdAt).toLocaleDateString();

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white/90">
          Shortened Link
        </h3>
        <p className="text-xs text-gray-400">
          Created on {createdDate}
        </p>
      </div>

      {/* Original URL */}
      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1">Original URL</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-400 hover:underline break-all"
        >
          {link.url}
        </a>
      </div>

      {/* Short URL */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-1">Short URL</p>
        <a
          href={link.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-green-400 hover:underline break-all"
        >
          {link.shortUrl}
        </a>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-3">
        <span>Clicks: {link.click_count}</span>
      </div>
    </div>
  );
}
