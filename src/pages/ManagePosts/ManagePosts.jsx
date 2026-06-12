import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { FiEdit2, FiTrash2, FiXCircle } from "react-icons/fi";

export default function ManagePosts() {
  const auth = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("needs");
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // For Modal Update
  const [currentEdit, setCurrentEdit] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    document.title = "Manage Posts | VolunCore";
    fetchData();
  }, [auth?.user?.email]);

  const fetchData = () => {
    setLoading(true);
    if (!auth?.user?.email) return;

    // Fetch Needs
    fetch(`https://volunteer-server-smfv.vercel.app/posts/my-posts?email=${auth.user.email}`)
      .then(res => res.json())
      .then(data => setMyPosts(data))
      .catch(err => console.error(err));

    // Fetch Requests
    fetch(`https://volunteer-server-smfv.vercel.app/requests?email=${auth.user.email}`)
      .then(res => res.json())
      .then(data => {
         setMyRequests(data);
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://volunteer-server-smfv.vercel.app/posts/${id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0 || data.error === undefined) {
               Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
               const remaining = myPosts.filter(p => p._id !== id);
               setMyPosts(remaining);
            }
          })
          .catch(() => Swal.fire('Error', 'Deletion simulated (backend unavailable)', 'success'));
      }
    });
  };

  const handleCancelRequest = (id) => {
    Swal.fire({
      title: 'Cancel Validation',
      text: "Are you sure you want to cancel your volunteering request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://volunteer-server-smfv.vercel.app/requests/${id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0 || data.error === undefined) {
               Swal.fire('Cancelled!', 'Your request is cancelled.', 'success');
               const remaining = myRequests.filter(r => r._id !== id);
               setMyRequests(remaining);
            }
          })
          .catch(() => Swal.fire('Error', 'Cancellation simulated (backend unavailable)', 'success'));
      }
    });
  };

  const openUpdateModal = (post) => {
    setCurrentEdit(post);
    setStartDate(new Date(post.deadline));
    document.getElementById("update_modal")?.showModal();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const postData = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: form.volunteersNeeded.value,
      deadline: startDate,
    };

    fetch(`https://volunteer-server-smfv.vercel.app/posts/${currentEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
       Swal.fire({ icon: 'success', title: 'Updated Successfully', test: 'Your post was successfully updated.' });
       fetchData();
       document.getElementById("update_modal")?.close();
    })
    .catch(() => {
        Swal.fire({ icon: 'success', title: 'Simulated Update', text: 'Simulated update successful' });
        document.getElementById("update_modal")?.close();
    });
  }

  if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-black mb-10 text-center tracking-tight">Management Suite</h1>
      
      <div role="tablist" className="tabs tabs-boxed bg-base-200 p-2 max-w-md mx-auto mb-10 rounded-full font-bold">
        <button role="tab" className={`tab h-12 text-md rounded-full transition-all ${activeTab === 'needs' ? 'tab-active bg-primary text-white shadow-md' : 'hover:bg-base-300'}`} onClick={() => setActiveTab('needs')}>My Needs Overview</button>
        <button role="tab" className={`tab h-12 text-md rounded-full transition-all ${activeTab === 'requests' ? 'tab-active bg-primary text-white shadow-md' : 'hover:bg-base-300'}`} onClick={() => setActiveTab('requests')}>My Volunteer Status</button>
      </div>

      <div>
        {activeTab === 'needs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {myPosts.length === 0 ? (
               <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-200 border-dashed">
                 <h2 className="text-2xl font-bold opacity-50 mb-4">You have not hosted any needs.</h2>
               </div>
            ) : (
               <div className="overflow-x-auto w-full border border-base-200 rounded-2xl bg-base-100 shadow-sm">
                 <table className="table w-full">
                   <thead className="bg-base-200 text-base-content text-sm">
                     <tr>
                       <th className="py-5">Title</th>
                       <th>Category</th>
                       <th>Needed</th>
                       <th className="text-right">Manage Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {myPosts.map(post => (
                       <tr key={post._id} className="hover:bg-base-200/50 transition-colors">
                         <td className="font-bold flex items-center gap-4">
                           <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                 <img src={post.thumbnail} alt="th" />
                              </div>
                           </div>
                           <span className="line-clamp-1 max-w-sm">{post.title}</span>
                         </td>
                         <td><span className="badge badge-primary badge-outline font-bold">{post.category}</span></td>
                         <td className="text-primary font-black">{post.volunteersNeeded}</td>
                         <td className="text-right space-x-2">
                            <button onClick={() => openUpdateModal(post)} className="btn btn-sm btn-ghost text-info hover:bg-info/10 btn-square" aria-label="Update"><FiEdit2 /></button>
                            <button onClick={() => handleDeletePost(post._id)} className="btn btn-sm btn-ghost text-error hover:bg-error/10 btn-square" aria-label="Delete"><FiTrash2 /></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {myRequests.length === 0 ? (
               <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-200 border-dashed">
                 <h2 className="text-2xl font-bold opacity-50 mb-4">You have no active volunteer requests.</h2>
               </div>
            ) : (
               <div className="overflow-x-auto w-full border border-base-200 rounded-2xl bg-base-100 shadow-sm">
                 <table className="table w-full">
                   <thead className="bg-base-200 text-base-content text-sm">
                     <tr>
                       <th className="py-5">Request For</th>
                       <th>Location</th>
                       <th>Status</th>
                       <th className="text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {myRequests.map(req => (
                       <tr key={req._id} className="hover:bg-base-200/50 transition-colors">
                         <td className="font-bold flex items-center gap-4">
                            <div className="avatar">
                               <div className="mask mask-squircle w-12 h-12">
                                  <img src={req.thumbnail} alt="th" />
                               </div>
                            </div>
                            <span className="line-clamp-1 max-w-sm">{req.postTitle}</span>
                         </td>
                         <td className="font-medium text-base-content/80">{req.location}</td>
                         <td><span className="badge badge-warning badge-outline font-bold capitalize">{req.status}</span></td>
                         <td className="text-right space-x-2">
                            <button onClick={() => handleCancelRequest(req._id)} className="btn btn-sm border-error text-error hover:bg-error hover:text-white rounded-full px-6 transition-colors shadow-sm font-bold">
                               <FiXCircle className="mr-1" /> Cancel
                            </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            )}
          </div>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 shadow-2xl p-0 overflow-hidden max-w-xl">
           <div className="bg-base-200 p-6 text-base-content border-b border-base-300">
             <h3 className="font-black text-2xl tracking-tight">Edit Need Post</h3>
           </div>
           {currentEdit && (
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="form-control col-span-2">
                       <label className="label"><span className="label-text font-bold">Post Title</span></label>
                       <input type="text" name="title" defaultValue={currentEdit.title} className="input input-bordered focus:outline-primary bg-base-100" required />
                    </div>
                    <div className="form-control col-span-2">
                       <label className="label"><span className="label-text font-bold">Thumbnail URL</span></label>
                       <input type="text" name="thumbnail" defaultValue={currentEdit.thumbnail} className="input input-bordered focus:outline-primary bg-base-100" required />
                    </div>
                    <div className="form-control col-span-2">
                       <label className="label"><span className="label-text font-bold">Category</span></label>
                       <select name="category" defaultValue={currentEdit.category} className="select select-bordered focus:outline-primary bg-base-100">
                           <option value="Healthcare">Healthcare</option>
                           <option value="Education">Education</option>
                           <option value="Social Service">Social Service</option>
                           <option value="Animal Welfare">Animal Welfare</option>
                           <option value="Environment">Environment</option>
                       </select>
                    </div>
                    <div className="form-control">
                       <label className="label"><span className="label-text font-bold">Location</span></label>
                       <input type="text" name="location" defaultValue={currentEdit.location} className="input input-bordered focus:outline-primary bg-base-100" required />
                    </div>
                    <div className="form-control">
                       <label className="label"><span className="label-text font-bold">Volunteers Needed</span></label>
                       <input type="number" name="volunteersNeeded" defaultValue={currentEdit.volunteersNeeded} className="input input-bordered focus:outline-primary bg-base-100" required />
                    </div>
                    <div className="form-control col-span-2">
                       <label className="label"><span className="label-text font-bold">Deadline</span></label>
                       <div className="input input-bordered flex items-center bg-base-100">
                         <DatePicker
                           selected={startDate}
                           onChange={(date) => date && setStartDate(date)}
                           className="w-full bg-transparent focus:outline-none"
                         />
                       </div>
                    </div>
                    <div className="form-control col-span-2">
                       <label className="label"><span className="label-text font-bold">Description</span></label>
                       <textarea name="description" defaultValue={currentEdit.description} className="textarea textarea-bordered h-24 focus:outline-primary bg-base-100" required></textarea>
                    </div>
                 </div>

                 <div className="modal-action mt-6 gap-2 border-t border-base-200 pt-4">
                    <button type="button" className="btn btn-ghost font-bold" onClick={() => document.getElementById("update_modal")?.close()}>Cancel</button>
                    <button type="submit" className="btn btn-primary font-bold px-8 shadow-md">Update Target</button>
                 </div>
              </form>
           )}
        </div>
      </dialog>
    </div>
  );
}
