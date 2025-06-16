
import React, { useState } from 'react';
export default function DownloaderApp() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("video");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(`https://ai-ai-9a7b.up.railway.app/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type })
      });
      const data = await res.json();
      if (data.success && data.download_url) {
        setResponse("Success! Click below to download.");
        window.open(data.download_url, "_blank");
      } else {
        setResponse("Download failed or unsupported link.");
      }
    } catch (err) {
      console.error(err);
      setResponse("Error occurred during download.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">🎧 AI Video Downloader</h1>
      <p className="text-gray-500">Download from YouTube, Instagram, or direct video links</p>
      <input type="text" className="border px-4 py-2 w-full" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <div className="space-x-4">
        <button onClick={() => setType("video")} className={type === "video" ? "bg-blue-600 text-white px-4 py-2" : "border px-4 py-2"}>Video</button>
        <button onClick={() => setType("audio")} className={type === "audio" ? "bg-blue-600 text-white px-4 py-2" : "border px-4 py-2"}>Audio</button>
        <button onClick={() => setType("playlist")} className={type === "playlist" ? "bg-blue-600 text-white px-4 py-2" : "border px-4 py-2"}>Playlist</button>
      </div>
      <button onClick={handleDownload} className="bg-green-600 text-white px-6 py-2 mt-4">{loading ? "Loading..." : "Download"}</button>
      {response && <p className="text-sm text-gray-700 mt-4">{response}</p>}
    </div>
  );
}
