import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const auth = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Host a Need | VolunCore";
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const thumbnail = form.thumbnail.value;
    const title = form.postTitle.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteersNeeded = parseInt(form.volunteersNeeded.value);
    
    const postData = {
      thumbnail,
      title,
      description,
      category,
      location,
      volunteersNeeded,
      deadline: startDate,
      organizerName: auth?.user?.displayName,
      organizerEmail: auth?.user?.email,
    };

    fetch("https://volunteer-server-smfv.vercel.app/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId) {
        Swal.fire({ icon: 'success', title: 'Success', text: 'Volunteer need added perfectly!' });
        navigate("/all-posts");
      } else {
        // Fallback for mocked backend
        Swal.fire({ icon: 'success', title: 'Simulated Success', text: 'Backend DB not connected. Simulation complete!' });
      }
    })
    .catch(() => {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to insert data' });
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-base-content mb-4 tracking-tight">Host a Need</h1>
        <p className="text-base-content/70">Create a new opportunity for volunteers to step up and assist your community.</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-10">
          <form onSubmit={handleAddPost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Post Title</span></label>
                <input type="text" name="postTitle" placeholder="e.g. Wildlife Cleanup" className="input input-bordered focus:outline-primary bg-base-200/50" required />
              </div>
              
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Thumbnail URL</span></label>
                <input type="url" name="thumbnail" placeholder="Image URL" className="input input-bordered focus:outline-primary bg-base-200/50" required />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Category</span></label>
                <select name="category" className="select select-bordered focus:outline-primary bg-base-200/50" required defaultValue="">
                  <option disabled value="">Select a category</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Social Service">Social Service</option>
                  <option value="Animal Welfare">Animal Welfare</option>
                  <option value="Environment">Environment</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Location</span></label>
                <input type="text" name="location" placeholder="e.g. Dhaka, Bangladesh" className="input input-bordered focus:outline-primary bg-base-200/50" required />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Volunteers Needed</span></label>
                <input type="number" name="volunteersNeeded" placeholder="e.g. 5" min="1" className="input input-bordered focus:outline-primary bg-base-200/50" required />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Deadline</span></label>
                <div className="input input-bordered flex items-center bg-base-200/50">
                   <DatePicker
                     selected={startDate}
                     onChange={(date) => date && setStartDate(date)}
                     className="w-full bg-transparent focus:outline-none"
                   />
                </div>
              </div>
              
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Organizer Name</span></label>
                <input type="text" value={auth?.user?.displayName || ""} className="input input-bordered bg-base-200 cursor-not-allowed opacity-70" readOnly />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Organizer Email</span></label>
                <input type="email" value={auth?.user?.email || ""} className="input input-bordered bg-base-200 cursor-not-allowed opacity-70" readOnly />
              </div>

            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Description</span></label>
              <textarea name="description" placeholder="Provide detailed information about the need..." className="textarea textarea-bordered h-32 focus:outline-primary bg-base-200/50" required></textarea>
            </div>

            <div className="form-control mt-8">
               <button className="btn btn-primary w-full shadow-lg hover:shadow-primary/50 text-lg rounded-full">Add Need Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
