import { Link } from "react-router-dom";
import { FiHeart, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-20 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
           <Link to="/" className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block mb-4">
              VolunCore.
           </Link>
           <p className="text-base-content/70 leading-relaxed max-w-sm">
             Connecting kind hearts with meaningful causes. Join our community to orchestrate volunteer workflows, organize aid, and make a tangible difference in the world.
           </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4 text-base-content">Quick Links</h3>
          <ul className="space-y-3 font-medium text-base-content/80">
            <li><Link to="/" className="hover:text-primary hover:underline transition-all">Home</Link></li>
            <li><Link to="/all-posts" className="hover:text-primary hover:underline transition-all">All Needs</Link></li>
            <li><Link to="/add-post" className="hover:text-primary hover:underline transition-all">Host a Need</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4 text-base-content">Connect With Us</h3>
          <div className="flex gap-4">
            <a href="#" className="btn btn-circle btn-ghost shadow-sm hover:text-primary hover:bg-primary/10 transition-all"><FiGithub className="text-xl" /></a>
            <a href="#" className="btn btn-circle btn-ghost shadow-sm hover:text-info hover:bg-info/10 transition-all"><FiTwitter className="text-xl" /></a>
            <a href="#" className="btn btn-circle btn-ghost shadow-sm hover:text-blue-600 hover:bg-blue-600/10 transition-all"><FiLinkedin className="text-xl" /></a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-base-content/60 font-medium">
            Made with <FiHeart className="text-error" /> by Joynul
          </p>
        </div>
      </div>
      <div className="footer footer-center p-6 border-t border-base-300 bg-base-200 text-base-content">
        <aside>
          <p className="font-medium opacity-70">&copy; {new Date().getFullYear()} VolunCore Platform. All right reserved.</p>
        </aside>
      </div>
    </footer>
  );
}
