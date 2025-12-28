export default function Study() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        NPTEL Playlist – Chemical Engineering
      </h1>

      <div className="max-w-5xl mx-auto">
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl border border-gray-700">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/videoseries?list=PLwdnzlV3ogoVX_S_8DyKa7RudEazDL0o_"
            title="NPTEL Playlist: All Lectures"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

    </div>
  );
}
