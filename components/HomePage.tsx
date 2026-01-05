"use client";
import axios from "axios";
import { useRef, useState } from "react";
import QRCode from "qrcode";

function HomePage() {


    const [data, setData] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function formHandeler(e: any) {
    e.preventDefault();
    const dbresponce = await axios.post("/api/url", { link: data });
    const dbSlink = dbresponce.data.shortUrl;
    setShortUrl(dbSlink);
  }



  return (
    <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          
          <h2 className="text-2xl font-bold mb-2">URL Shortener</h2>
          <p className="text-gray-400 mb-6">
            Paste your long URL and get a short one instantly.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="https://example.com"
              onChange={(e) => setData(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={formHandeler}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Generate Short URL
            </button>
          </form>

          {/* Result */}
          {shortUrl && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between gap-2 bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                <span className="truncate text-sm">
                  {`${window.location.href}${shortUrl}`}
                </span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.href}${shortUrl}`
                    )
                  }
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                >
                  Copy
                </button>
              </div>

              <button
                onClick={() => {
                  QRCode.toCanvas(
                    canvasRef.current,
                    `${window.location.href}${shortUrl}`,
                    { width: 260, margin: 2 }
                  );
                }}
                className="w-full border border-white/10 rounded-xl py-3 hover:bg-white/5 transition"
              >
                Generate QR Code
              </button>

              <div className="flex justify-center pt-4">
                <canvas ref={canvasRef} />
              </div>
            </div>
          )}
        </div>
        
      </div>
  )
}



export default HomePage