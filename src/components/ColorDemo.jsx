export default function ColorDemo() {
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      {/* Navbar */}
      <nav
        className="shadow px-6 py-4 flex justify-between items-center"
        style={{ backgroundColor: '#1F3B3C', color: '#F4E9DC' }}
      >
        <span className="text-xl font-bold">FargeDemo</span>
        <div className="space-x-4">
          <button
            className="hover:underline"
            style={{ color: '#A8DADC' }}
          >
            Hjem
          </button>
          <button
            className="hover:underline"
            style={{ color: '#A8DADC' }}
          >
            Om oss
          </button>
          <button
            className="px-3 py-1 rounded transition"
            style={{
              backgroundColor: '#2F5D62',
              color: '#F4E9DC',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#244B4D')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2F5D62')}
          >
            Kontakt
          </button>
        </div>
      </nav>

      {/* Kort */}
      <div
        className="p-4 rounded m-6 max-w-md mx-auto transition-colors duration-300"
        style={{ backgroundColor: '#F4E9DC', color: '#1F3B3C' }}
      >
        Dette er et kort med beige bakgrunn og dyp grønn tekst.
      </div>

      {/* Hero section */}
      <section
        className="text-center py-16 px-4 transition-colors duration-300"
        style={{ backgroundColor: '#FAF9F6', color: '#1F3B3C' }}
      >
        <h1 className="text-4xl font-bold mb-4">Velkommen til vår fargepalett</h1>
        <p className="text-lg mb-6">
          Se hvordan fargene oppfører seg i lys og mørk modus.
        </p>
        <button
          className="px-6 py-2 rounded transition"
          style={{
            backgroundColor: '#2F5D62',
            color: '#F4E9DC',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#244B4D')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2F5D62')}
        >
          Kom i gang
        </button>
      </section>

      {/* Flere kort */}
      <section className="py-12 px-6 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {["Utforsk", "Bygg", "Skap"].map((title) => (
          <div
            key={title}
            className="rounded-xl shadow p-6 hover:shadow-lg transition-colors duration-300
              dark:bg-[#244B4D] dark:text-[#F4E9DC]"
            style={{
              backgroundColor: '#F4E9DC',
              color: '#1F3B3C',
            }}
          >
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p>
              Dette er et kort med varm beige bakgrunn og dyp grønn tekst.
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="py-6 text-center text-sm transition-colors duration-300 dark:bg-[#244B4D] dark:text-[#F4E9DC]"
        
       
      >
        © 2025 FargeDemo Inc.
      </footer>
    </div>
  );
}
