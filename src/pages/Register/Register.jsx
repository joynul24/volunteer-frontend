import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | VolunCore";
  }, []);

  const handleGoogleRegister = () => {
    auth?.googleSignIn()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Google registration successful.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
        window.location.reload();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Google Registration Failed',
          text: error.message,
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.username.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must have an uppercase letter!' });
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must have a lowercase letter!' });
      return;
    }
    if (password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must be at least 6 characters!' });
      return;
    }

    auth?.createUser(email, password)
      .then(() => {
        auth?.updateUser(name, photo)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Welcome to the platform!',
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/");
            window.location.reload(); // Quick refresh to update navbar local state if needed
          })
      })
      .catch(error => {
        Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.message });
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-8 sm:p-10">
          <h2 className="text-3xl font-black text-center mb-8 tracking-tight">Create Account</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Full Name</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"><FiUser /></div>
                <input type="text" name="username" placeholder="John Doe" className="input input-bordered w-full pl-10 bg-base-200/50 focus:outline-primary transition-all" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Photo URL</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"><FiImage /></div>
                <input type="url" name="photo" placeholder="https://example.com/photo.jpg" className="input input-bordered w-full pl-10 bg-base-200/50 focus:outline-primary transition-all" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Email Address</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"><FiMail /></div>
                <input type="email" name="email" placeholder="you@example.com" className="input input-bordered w-full pl-10 bg-base-200/50 focus:outline-primary transition-all" required />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Password</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"><FiLock /></div>
                <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full pl-10 bg-base-200/50 focus:outline-primary transition-all" required />
              </div>
            </div>

            <div className="form-control mt-8">
              <button className="btn btn-primary w-full shadow-lg hover:shadow-primary/50 text-lg">Register</button>
            </div>
          </form>

          <div className="divider text-base-content/50 text-sm font-medium my-6">OR CONTINUE WITH</div>

          <button type="button" onClick={handleGoogleRegister} className="btn bg-base-200 border-base-300 hover:bg-base-300 hover:border-base-400 w-full mb-6 font-bold flex items-center gap-3 text-base-content">
             <FcGoogle className="text-xl" /> Google Sign In
          </button>

          <p className="text-center text-sm font-medium mt-8">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
