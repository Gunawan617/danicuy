export default function Footer() {
  return (
    <footer className="bg-[#484848] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block bg-white text-black px-3 py-1 rounded font-bold text-sm mb-4">
            LOGO
          </div>
        </div>
        <div className="flex justify-center space-x-8 mb-8 text-sm">
          <a href="#" className="hover:text-orange-400 transition-colors">Home</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Blog</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Hackney</a>
          <a href="#" className="hover:text-orange-400 transition-colors">About</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Menu</a>
        </div>
        <div className="flex justify-center space-x-8 text-xs text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
