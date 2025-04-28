export default function HomePage() {
  return (
<section className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-red-500 text-gray-900 dark:text-gray-100 px-4">
  <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
    Velkommen til Holidaze 🌴
  </h1>
  <p className="text-lg md:text-2xl text-center max-w-2xl mb-8">
    Utforsk fantastiske reisemål og book ditt drømmeopphold – enten i sol eller stjerner ✨
  </p>
  <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition dark:bg-blue-500 dark:hover:bg-blue-600">
    Kom i gang
  </button>
</section>
  );
}