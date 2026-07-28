# KindHelp 💜

KindHelp is a full-stack platform that connects donors with unused medicines to those in urgent need. By simply entering a medicine name and city, users can either find help or be the help, creating healthier communities together.

## 🚀 Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Third-party Services**: Cloudinary (for image uploads), Google Generative AI (Gemini), JSON Web Tokens (JWT) for authentication

## 📋 Features
- **User Roles**: Separate dashboards and functionalities for "Donors" and "Needy".
- **Medicine Donation**: Donors can list surplus, unexpired medicines.
- **Medicine Requests**: Those in need can search for and request medicines available in their city.
- **Secure Verification**: Cloudinary is used for uploading and managing verification documents securely.
- **Real-time Statistics**: View total medicines donated, requests fulfilled, and cities reached.

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account set up.

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd KindHelp
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd KindHelp-Backend
npm install
```

**Environment Variables**: Create a `.env` file inside `KindHelp-Backend` and add the following:
```env
# MongoDB Connection String
atlas_url=mongodb+srv://<username>:<password>@cluster...

# JWT Secret Key
SEC_KEY=your_secure_random_string

# Cloudinary API Keys (For Image Uploads)
Cloudapi_key=your_cloudinary_api_key
CloudSec_key=your_cloudinary_api_secret

# Google Generative AI (Gemini) API Key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd KindHelp-Frontend
npm install
```

*(Note: The frontend is pre-configured to connect to the backend at `http://localhost:2005`. You can modify this in `src/config/url.js` if needed).*

---

## 💻 Running the Application

To run the application locally, you will need to start both the backend and frontend servers.

**Start the Backend:**
```bash
cd KindHelp-Backend
node server.js
```
The backend will run on `http://localhost:2005` and should output `Server Started at 2005` & `Connected`.

**Start the Frontend:**
```bash
cd KindHelp-Frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`. Open this URL in your browser to interact with KindHelp!
