# 🎧 Discord Clone  

A sleek real-time chat app inspired by Discord, built using:  

- ✨ **Next.js** – Modern React framework for server-side rendering.  
- 🎨 **ShadCN** – Pre-styled components for rapid UI building.  
- 🎋 **Tailwind CSS** – Utility-first CSS framework.  
- 🔑 **Clerk** – Authentication and user management.  
- 📦 **Zustand** – Simple and scalable state management.  
- 🎤 **LiveKit** – High-quality voice/video streaming.  
- 🗂️ **UploadThing** – Easy file uploads.  
- 💬 **Socket.IO** – Real-time bidirectional communication.  

---

## 🌟 Features  

- 💬 **Real-time Messaging** – Instant chat functionality with fast updates.  
- 🗨️ **One-to-One Chat** – Private messaging between users.  
- 📦 **Server Management** – Create and manage servers with ease.  
- 🎭 **Role Management** – Assign roles like Moderator or Guest to members.  
- 🛡️ **Member Moderation** – Kick or ban users from servers.  
- 🔑 **User Authentication** – Secure sign-up and login using Clerk.  
- 🎤 **Voice & Video Calls** – Seamless group voice and video streaming powered by LiveKit.  
- 📝 **Edit Messages** – Edit previously sent messages for corrections or updates.  
- 📁 **File Sharing** – Upload and share files in chats using UploadThing.  
- ⚡ **Responsive UI** – Fully functional on desktop, tablet, and mobile.  

---

## 🚀 How to Run  

1.  **Clone the repository**
   
   ```bash  
   git clone https://github.com/your-username/discord-clone.git  
   cd discord-clone
  ```

2.  **Install dependencies**

   ```bash
   npm install
     or
   yarn install
  ```

3. **Add the environment variables**
  Make a .env file and add clerk, uploadthings, database url and livekit credentials

  ```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  CLERK_SECRET_KEY
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
  DATABASE_URL
  UPLOADTHING_SECRET
  UPLOADTHING_TOKEN
  LIVEKIT_API_KEY
  LIVEKIT_API_SECRET
  NEXT_PUBLIC_LIVEKIT_URL
```
4. **Start the development server**

  ```bash
  npm run dev  
    or
  yarn dev
```
5. **Open the app**
     Visit http://localhost:3000 in your browser.
