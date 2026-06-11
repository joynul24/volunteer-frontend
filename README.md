# 🚀 Volunteer Management System (Backend API)

A simple backend system for managing volunteer posts and requests.

---

## 🌐 Live https://your-backend-url.vercel.app

## 🧠 What this project does

- Create volunteer posts
- View all posts
- Update and delete posts
- Users can apply as volunteers
- Prevent duplicate applications
- Automatically manage available volunteer slots

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- CORS
- dotenv

---

## 📡 API Features

### Posts
- GET /posts
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

### Requests
- GET /requests
- POST /requests
- DELETE /requests/:id

---

## 🧠 Key Logic

- One user = one request per post
- Volunteers slot decreases when applied
- Slot increases when request is canceled

---

## 🚀 Deployment

- Vercel ready (serverless backend)

---

## 👨‍💻 Author

Joynul Abedin
MERN Stack Developer