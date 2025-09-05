import { useState } from "react";
import axios from "axios";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    try {
      // Backend returns { shortUrl }
      const res = await axios.post("http://localhost:5000/shorten", { longUrl });
      const newShort = res.data.shortUrl;

      setShortUrl(newShort);
      setHistory([{ longUrl, shortUrl: newShort }, ...history]);
      setLongUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed to shorten URL. Check backend!");
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("✅ Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="bg-gray-800/60 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-xl transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          🔗 URL Shortener
        </h1>
        <p className="mb-6 text-gray-300">
          Paste your long URL and get a short one instantly!
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            placeholder="Enter a long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 p-3 rounded-lg border-0 outline-none text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition-colors"
          >
            Shorten
          </button>
        </form>

        {/* Short URL Result */}
        {shortUrl && (
          <div className="mt-6 bg-gray-700/60 p-4 rounded-xl flex items-center justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => copyToClipboard(shortUrl)}
              className="ml-4 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
            >
              📋 Copy
            </button>
          </div>
        )}
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">📜 History</h2>
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800/60 p-4 rounded-lg flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm truncate w-72">
                    {item.longUrl}
                  </span>
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {item.shortUrl}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(item.shortUrl)}
                  className="ml-4 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg"
                >
                  📋
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
