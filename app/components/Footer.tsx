export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Blazin&apos; Paddles. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            The TopGolf of Pickleball
          </p>
        </div>
      </div>
    </footer>
  );
}
