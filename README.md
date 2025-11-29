# LearnMate - AI-Powered Learning Platform

LearnMate is a modern, AI-driven educational platform designed to generate personalized learning roadmaps, quizzes, and career connections. Built with React, TypeScript, and Tailwind CSS, it offers a premium, responsive user experience.

## Features

- **AI-Generated Roadmaps**: Personalized learning paths tailored to your career goals.
- **Interactive Quizzes**: Test your knowledge with AI-generated questions.
- **Career Connect**: Discover job opportunities and connect your learning to the real world.
- **Smart AI Assistant**: Get instant help and explanations from an intelligent tutor.
- **Progress Tracking**: Monitor your journey with detailed analytics.
- **Premium UI/UX**: Glassmorphism design, smooth animations, and responsive layout.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI, Lucide React
- **State Management**: React Query, Context API
- **Backend/Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/learnmate.git
    cd learnmate
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add your Supabase and Google AI keys:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    # Add other necessary keys
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:8080](http://localhost:8080) in your browser.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.

## License

This project is licensed under the MIT License.
