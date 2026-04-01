# Twitch.tv Clone

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ahmedsalah-tech/Twitch-tv-Clone)

This is a full-stack clone of Twitch.tv built with the MERN stack. The project aims to replicate core features of the popular streaming platform, including real-time video streaming, live chat, and user channel management.

This project is currently in development.

## Features

- **User Authentication:** Secure registration and login functionality using JWT for session management.
- **Browse Channels:** View a grid of all active channels.
- **Channel Viewing:** Watch streams, view channel descriptions, and see user information.
- **Follow System:** Users can follow and unfollow their favorite channels.
- **User Dashboard:**
  - **Channel Settings:** Update channel title, description, and avatar.
  - **Password Management:** Change user account passwords.
  - **Stream Key:** View a unique stream key for use with streaming software.
- **Real-time Streaming:** (In Progress) An integrated RTMP server using `node-media-server` to handle incoming live video feeds.
- **Live Chat:** (In Progress) A `socket.io` backend is set up to support real-time chat on channel pages.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, React Router, Axios, React Hot Toast
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Real-time Streaming:** Node Media Server (RTMP)
- **Authentication:** JWT (JSON Web Tokens), bcrypt.js
- **Real-time Communication:** Socket.io (for chat)
- **Validation:** Joi

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v8 or later)
- A running MongoDB instance (local or cloud-based)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ahmedsalah-tech/Twitch-tv-Clone.git
    cd Twitch-tv-Clone
    ```

2.  **Install Root Dependencies:**
    This installs `concurrently` to run multiple services at once.

    ```bash
    npm install
    ```

3.  **Set up the Server:**
    - Navigate to the `server` directory:
      ```bash
      cd server
      ```
    - Create a `.env` file by copying the example:
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file with your configuration:
      ```env
      PORT=5002
      MONGO_URI=your_mongodb_connection_string
      TOKEN_KEY=your_secret_jwt_key
      ```
    - Install server dependencies:
      ```bash
      npm install
      ```

4.  **Set up the Client:**
    - Navigate to the `client` directory from the root:
      ```bash
      cd client
      ```
    - Install client dependencies:
      ```bash
      npm install
      ```

5.  **Set up the RTMP Server:**
    - Navigate to the `rtmp-server` directory from the root:
      ```bash
      cd rtmp-server
      ```
    - Install RTMP server dependencies:
      ```bash
      npm install
      ```

### Running the Application

1.  **Start the Backend and Frontend:**
    From the root directory, run the `dev` script to start the Express server and the React client concurrently.

    ```bash
    npm run dev
    ```

    - React Client will be available at `http://localhost:3000`
    - Express Server will be running on `http://localhost:5002`

2.  **Start the RTMP Server:**
    In a separate terminal, navigate to the `rtmp-server` directory and start the server.
    ```bash
    cd rtmp-server
    npm run dev
    ```

    - The RTMP server will listen on port `1935`.
    - You can configure your streaming software (like OBS) to stream to `rtmp://localhost:1935/live` using the stream key from your account settings page.
