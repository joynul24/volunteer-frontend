import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function VolunteerNeedsNow() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/posts?limit=6")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
         console.log(err);
         setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
         <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4 tracking-tight">Volunteer Needs Now</h2>
          <p className="text-base-content/70 text-lg">Deadlines are approaching fast! Explore urgent opportunities where your help is needed the most right now.</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-base-200 p-12 rounded-3xl text-center border border-base-300">
           <h3 className="text-2xl font-bold text-base-content/50">No urgent posts available right now</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post._id} 
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 group overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
                </div>
                <div className="card-actions justify-end mt-auto">
                  <Link to={`/post/${post._id}`} className="btn btn-primary w-full rounded-xl hover:-translate-y-0.5 transition-all">
                    View Details <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/all-posts" className="btn btn-outline btn-neutral rounded-full px-10 h-14 font-bold border-2 hover:bg-base-content hover:text-base-100 transition-all">
          See All Opportunities
        </Link>
      </div>
    </motion.section>
  );
}
