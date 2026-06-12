import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiGrid, FiList, FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "All Needs | VolunCore";
    fetchPosts();
  }, [search]);

  const fetchPosts = () => {
    setLoading(true);
    let url = "https://volunteer-server-smfv.vercel.app/posts";
    if (search) url += `?search=${search}`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-200 p-6 md:p-8 rounded-3xl mb-12 gap-6 border border-base-300">
        <div>
           <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">All Volunteer Needs</h1>
           <p className="text-base-content/70">Discover all active opportunities waiting for you.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
           <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <FiSearch className="text-base-content/50" />
              </div>
              <input 
                type="text" 
                placeholder="Search by title..." 
                className="input input-bordered w-full pl-12 rounded-full border-2 focus:outline-primary bg-base-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="bg-base-100 p-1 rounded-full border-2 flex">
              <button 
                className={`btn btn-circle btn-sm ${isGrid ? "btn-primary" : "btn-ghost"}`} 
                onClick={() => setIsGrid(true)}
              ><FiGrid /></button>
              <button 
                className={`btn btn-circle btn-sm ${!isGrid ? "btn-primary" : "btn-ghost"}`} 
                onClick={() => setIsGrid(false)}
              ><FiList /></button>
           </div>
        </div>
      </div>

      {loading ? (
         <div className="flex justify-center py-20">
           <span className="loading loading-spinner text-primary loading-lg"></span>
         </div>
      ) : posts.length === 0 ? (
         <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-base-200 border-dashed">
            <h2 className="text-2xl font-bold text-base-content/50">No volunteer needs found.</h2>
         </div>
      ) : isGrid ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
             <div key={post._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 group overflow-hidden">
             <figure className="h-56 relative overflow-hidden">
               <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                 {post.category}
               </div>
             </figure>
             <div className="card-body p-6">
               <h2 className="card-title text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">{post.title}</h2>
               <div className="space-y-2 mt-4 mb-6 text-sm text-base-content/70 font-medium">
                 <p className="flex items-center gap-2"><FiCalendar className="text-primary/70" /> Deadline: {new Date(post.deadline).toLocaleDateString()}</p>
                 <p className="flex items-center gap-2"><FiMapPin className="text-error/70" /> {post.location}</p>
                 <p className="text-primary font-bold mt-2">Needed: {post.volunteersNeeded}</p>
               </div>
               <div className="card-actions justify-end mt-auto">
                 <Link to={`/post/${post._id}`} className="btn btn-primary w-full rounded-xl hover:-translate-y-0.5 transition-all">
                   View Details <FiArrowRight />
                 </Link>
               </div>
             </div>
           </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto w-full border border-base-200 rounded-2xl bg-base-100 shadow-sm">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th className="py-4">Title</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Needed</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id} className="hover:bg-base-200/50 transition-colors">
                  <td className="font-bold flex items-center gap-4">
                     <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={post.thumbnail} alt={post.title} />
                        </div>
                     </div>
                     <span className="line-clamp-1 max-w-[200px] md:max-w-md">{post.title}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-outline font-bold">{post.category}</span>
                  </td>
                  <td className="font-medium text-base-content/70">{new Date(post.deadline).toLocaleDateString()}</td>
                  <td className="font-black text-primary">{post.volunteersNeeded}</td>
                  <td className="text-right">
                    <Link to={`/post/${post._id}`} className="btn btn-sm btn-primary rounded-full px-6">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
