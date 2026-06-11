import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FiMail, FiLock, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login | VolunCore";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    auth?.signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'Login successful.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    auth?.googleSignIn()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Google login successful.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Google Login Failed',
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-8">
          <h2 className="text-3xl font-black text-center mb-8 tracking-tight">Welcome Back!</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <FiMail />
                </div>
                <input type="email" name="email" placeholder="you@example.com" className="input input-bordered w-full pl-10 focus:outline-primary transition-all bg-base-200/50" required />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <FiLock />
                </div>
                <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full pl-10 focus:outline-primary transition-all bg-base-200/50" required />
              </div>
            </div>

            <div className="form-control mt-8">
              <button className="btn btn-primary w-full shadow-lg hover:shadow-primary/50 text-lg">Login</button>
            </div>
          </form>

          <div className="divider text-base-content/50 text-sm font-medium my-6">OR CONTINUE WITH</div>

          <button onClick={handleGoogleLogin} className="btn bg-base-200 border-base-300 hover:bg-base-300 hover:border-base-400 w-full mb-6 font-bold flex items-center gap-3 text-base-content">
             <FcGoogle className="text-xl" /> Google Sign In
          </button>

          <p className="text-center text-sm font-medium mt-4">
            New here? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
