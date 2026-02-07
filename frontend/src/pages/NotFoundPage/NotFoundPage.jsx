export default function NotFound() {
    return (
      <div className="relative h-screen overflow-hidden bg-gradient-to-b from-sky-200 to-slate-50 font-sans">
        {/* Inline keyframes so no Tailwind config is needed */}
        <style>{`
          @keyframes snowFall {
            0% { transform: translateY(-10px); }
            100% { transform: translateY(110vh); }
          }
        `}</style>
  
        {/* Snowflakes */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 rounded-full bg-white opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                animation: `snowFall ${6 + Math.random() * 6}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
  
        {/* Text */}
        <div className="relative z-10 pt-28 text-center text-slate-600">
          <h1 className="mb-2 text-4xl font-medium">Aw jeez.</h1>
          <p className="mb-4 text-xl">That page has gone missing.</p>
          <a
            href="/"
            className="border-b border-dashed border-blue-500 text-blue-500 hover:opacity-80"
          >
            Hitch a ride back home
          </a>
        </div>
  
        {/* Snowbank + 404 */}
        <div className="absolute -bottom-20 flex h-64 w-full items-center justify-center rounded-t-full bg-white">
          <div className="relative -top-10 text-[10rem] font-extrabold leading-none text-red-500">
            404
          </div>
        </div>
      </div>
    );
  }
  