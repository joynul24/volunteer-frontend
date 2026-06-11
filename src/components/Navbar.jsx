import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FiMenu, FiMoon, FiSun, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    auth?.logOut()
      .then(() => {
        Swal.fire({
           icon: 'success',
           title: 'Logged Out',
           text: 'You have been successfully logged out',
           timer: 2000,
           showConfirmButton: false,
        });
      })
      .catch((err) => console.log(err));
  };

  // Determine navbar styles based on scroll and route
  const navbarClasses = (isHome && !isScrolled) 
      ? "bg-transparent border-transparent text-white" 
      : "bg-base-100/90 backdrop-blur-md shadow-sm border-b border-base-200 text-base-content";


  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({isActive}) => isActive ? "border-b-2 border-primary pb-1 rounded-none bg-transparent hover:bg-transparent !text-inherit font-bold" : "hover:text-primary transition-colors pb-1 border-b-2 border-transparent font-medium"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-posts" className={({isActive}) => isActive ? "border-b-2 border-primary pb-1 rounded-none bg-transparent hover:bg-transparent !text-inherit font-bold" : "hover:text-primary transition-colors pb-1 border-b-2 border-transparent font-medium"}>
          Needs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className={`navbar fixed top-0 w-full z-50 px-4 md:px-8 transition-all duration-300 ${navbarClasses}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden -ml-2">
            <FiMenu className="text-2xl" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200 text-base-content">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className={`text-2xl font-black flex items-center gap-2 ${(isHome && !isScrolled) ? 'text-white' : 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'}`}>
           VolunCore.
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-3 flex items-center">
        <button onClick={handleToggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle Theme">
          {theme === "light" ? <FiMoon className="text-xl" /> : <FiSun className="text-xl text-warning" />}
        </button>

        {auth?.user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary/20 hover:border-primary transition-colors tooltip tooltip-bottom" data-tip={auth.user.displayName || "User"}>
              <div className="w-10 rounded-full">
                {auth.user.photoURL ? (
                    <img src={auth.user.photoURL} alt="User avatar" />
                ) : (
                    <FiUser className="w-full h-full p-2 bg-base-200" />
                )}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-box w-56 border border-base-200 text-base-content">
               <li className="menu-title text-center text-sm mb-2 font-semibold">Hi, {auth.user.displayName || "User"}!</li>
              <li><Link to="/add-post" className="py-3 font-medium hover:text-primary">Add Volunteer Post</Link></li>
              <li><Link to="/manage-posts" className="py-3 font-medium hover:text-primary">Manage My Posts</Link></li>
              <div className="divider my-1"></div>
              <li><button onClick={handleLogout} className="text-error font-bold py-3 hover:bg-error/10 hover:text-error">Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className={`btn rounded-full px-8 shadow-lg transition-all font-bold ${(isHome && !isScrolled) ? 'btn-outline border-white text-white hover:bg-white hover:text-black' : 'btn-primary hover:shadow-primary/50'}`}>Login</Link>
        )}
      </div>
    </div>
  );
}
