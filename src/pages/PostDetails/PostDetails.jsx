import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FiCalendar, FiMapPin, FiUser, FiInfo, FiHeart } from "react-icons/fi";

export default function PostDetails() {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Need Details | VolunCore";
    fetch(`https://volunteer-server-smfv.vercel.app/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleRequest = (e) => {
    e.preventDefault();
    if(post.volunteersNeeded === 0) {
       Swal.fire({ icon: 'error', title: 'Full Capacity', text: 'No more volunteers needed for this post.' });
       return;
    }
    const form = e.currentTarget;
    const requestData = {
      postId: post._id,
      postTitle: post.title,
      thumbnail: post.thumbnail,
      category: post.category,
      location: post.location,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: auth?.user?.displayName,
      volunteerEmail: auth?.user?.email,
      suggestion: form.suggestion.value,
      status: "requested",
      deadline: post.deadline
    };

    fetch("https://volunteer-server-smfv.vercel.app/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId) {
         Swal.fire({ icon: 'success', title: 'Request Sent', text: 'You have offered to volunteer!' });
         setPost({...post, volunteersNeeded: post.volunteersNeeded - 1 });
         document.getElementById("volunteer_modal")?.close();
      } else {
         Swal.fire({ icon: 'success', title: 'Simulated Sent', text: 'Request simulated successfully (Backend missing).' });
         document.getElementById("volunteer_modal")?.close();
      }
    })
    .catch(() => Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to request' }));
  };

  if (loading) return <div className="flex justify-center py-32"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
  if (!post || post.error) return <div className="text-center py-20 text-error font-bold text-2xl">Post not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-base-100 rounded-3xl overflow-hidden shadow-xl border border-base-200">
        <div className="h-64 sm:h-96 relative">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-900/80 to-transparent flex items-end p-8 bg-black/40">
             <div>
                <span className="badge badge-primary font-bold mb-3">{post.category}</span>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">{post.title}</h1>
             </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-base-content">
           <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FiInfo className="text-primary"/> Description</h2>
                <p className="text-base-content/80 text-lg leading-relaxed whitespace-pre-line">{post.description}</p>
              </div>

              <div className="bg-base-200 p-6 rounded-2xl border border-base-300">
                 <h2 className="text-xl font-bold mb-6">Key Information</h2>
                 <ul className="space-y-4 font-medium text-base-content/80">
                    <li className="flex items-center gap-3 text-lg"><FiMapPin className="text-error" /> <span className="text-base-content">Locus:</span> {post.location}</li>
                    <li className="flex items-center gap-3 text-lg"><FiCalendar className="text-primary" /> <span className="text-base-content">Deadline:</span> {new Date(post.deadline).toLocaleDateString()}</li>
                    <li className="flex items-center gap-3 text-lg"><FiUser className="text-info" /> <span className="text-base-content">Organizer:</span> {post.organizerName}</li>
                 </ul>
              </div>
           </div>

           <div>
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 sticky top-24 text-center">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                    <FiHeart className="text-4xl" />
                 </div>
                 <h3 className="text-2xl font-black mb-2">Be an Impact</h3>
                 <p className="text-base-content/70 font-medium mb-8">Volunteers currently needed for this cause:</p>
                 <div className="text-6xl font-black text-primary mb-8">{post.volunteersNeeded}</div>

                 {post.volunteersNeeded === 0 ? (
                    <button className="btn btn-disabled w-full rounded-full font-bold text-lg opacity-60">Full Capacity Restored</button>
                 ) : (
                    <button className="btn btn-primary w-full rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-primary/50 transition-all text-white" onClick={() => document.getElementById("volunteer_modal")?.showModal()}>
                      Request to Volunteer
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="volunteer_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 shadow-2xl p-0 overflow-hidden">
          <div className="bg-primary p-6 text-white text-center">
             <h3 className="font-black text-2xl">Confirm Volunteering</h3>
             <p className="font-medium opacity-90 mt-1">Review your details to proceed</p>
          </div>
          <form className="p-6 space-y-4" onSubmit={handleRequest}>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Post Title</span></label>
                <input type="text" value={post.title} className="input input-sm input-bordered bg-base-200 opacity-80" readOnly />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Category</span></label>
                <input type="text" value={post.category} className="input input-sm input-bordered bg-base-200 opacity-80" readOnly />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Location</span></label>
                <input type="text" value={post.location} className="input input-sm input-bordered bg-base-200 opacity-80" readOnly />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Needed</span></label>
                <input type="text" value={post.volunteersNeeded} className="input input-sm input-bordered bg-base-200 opacity-80" readOnly />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Your Name</span></label>
              <input type="text" value={auth?.user?.displayName || ""} className="input input-sm input-bordered bg-base-200 opacity-80" readOnly />
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Your Email</span></label>
              <input type="text" value={auth?.user?.email || ""} className="input input-sm input-bordered bg-base-200 opacity-80" readOnly />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text text-primary font-bold">Any Suggestions / Message?</span></label>
              <textarea name="suggestion" className="textarea textarea-bordered focus:outline-primary bg-base-100 placeholder:text-base-content/40" placeholder="I have 5 years experience..." required></textarea>
            </div>

            <div className="modal-action mt-6 gap-2 border-t border-base-200 pt-4">
              <button type="button" className="btn border-base-300 font-bold" onClick={() => document.getElementById("volunteer_modal")?.close()}>Cancel</button>
              <button type="submit" className="btn btn-primary font-bold px-8 shadow-md">Request</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
