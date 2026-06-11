import { useEffect } from "react";
import Banner from "./Banner";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import { FiUsers, FiGlobe, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.title = "Home | VolunCore";
  }, []);

  return (
    <div>
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-32">
        <VolunteerNeedsNow />
        
        {/* Extra Section 1: Impact Stats */}
        <motion.section 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10"
        >
           <div className="text-center max-w-2xl mx-auto mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-base-content mb-4 tracking-tight">Our Global Impact</h2>
             <p className="text-base-content/70 text-lg">Together, our volunteers have achieved incredible milestones across the world.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-base-100 rounded-2xl p-8 text-center shadow-sm border border-base-200">
               <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                 <FiUsers className="text-3xl" />
               </div>
               <h3 className="text-4xl font-black mb-2">12,500+</h3>
               <p className="text-base-content/60 font-medium">Active Volunteers</p>
             </div>
             <div className="bg-base-100 rounded-2xl p-8 text-center shadow-sm border border-base-200">
               <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                 <FiGlobe className="text-3xl" />
               </div>
               <h3 className="text-4xl font-black mb-2">45+</h3>
               <p className="text-base-content/60 font-medium">Countries Reached</p>
             </div>
             <div className="bg-base-100 rounded-2xl p-8 text-center shadow-sm border border-base-200">
               <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6 text-error">
                 <FiHeart className="text-3xl" />
               </div>
               <h3 className="text-4xl font-black mb-2">85,000+</h3>
               <p className="text-base-content/60 font-medium">Lives Impacted</p>
             </div>
           </div>
        </motion.section>

        {/* Extra Section 2: Join Community CTA */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-base-300"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="relative px-6 py-24 text-center z-10 text-base-content">
             <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to step up?</h2>
             <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-80 font-medium">Join thousands of volunteers around the world and start making an impact in your local community today.</p>
             <a href="/register" className="btn btn-primary rounded-full px-12 h-14 text-lg font-bold shadow-xl hover:shadow-primary/50 transition-all hover:-translate-y-1">Become a Volunteer</a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
