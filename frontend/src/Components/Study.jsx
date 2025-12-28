export default function Study() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
        NPTEL Playlist – Chemical Engineering
      </h1>

      <div className="w-full h-full">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/videoseries?list=PLwdnzlV3ogoVX_S_8DyKa7RudEazDL0o_"
            title="NPTEL Playlist: All Lectures"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
}
