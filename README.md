# Speech to Text Converter Project

A full-stack application that allows users to record or upload audio files and convert them to text using Speech-to-Text APIs.

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application with Vite and Tailwind CSS
- **Backend**: Node.js/Express API server
- **Database**: Supabase

## Features

- Upload audio files for transcription
- Record audio directly in the browser
- View transcription history
- Copy or delete transcriptions
- User authentication (optional)

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Supabase account
- OpenAI API key (or other Speech-to-Text provider)

### Backend Setup

1. Navigate to the backend folder:
```bash
cd speech-to-text-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder with the following:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd speech-to-text-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend folder with the following:
```
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the frontend development server:
```bash
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Set up the database schema using the SQL provided in the `supabase-schema.md` file
3. Copy your Supabase URL and anon key to both frontend and backend `.env` files

## Deployment

### Backend Deployment (Render/Vercel)

1. Create a new Web Service on Render or a new project on Vercel
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `node server.js`
5. Add environment variables from your `.env` file

### Frontend Deployment (Netlify/Vercel)

1. Create a new site on Netlify or project on Vercel
2. Connect your GitHub repository
3. Set the build command: `npm run build`
4. Set the publish directory: `dist`
5. Add environment variables from your `.env` file

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: Supabase
- **API**: OpenAI Whisper (or alternative Speech-to-Text API)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.