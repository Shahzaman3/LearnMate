import { GoogleGenerativeAI } from '@google/generative-ai';


const API_KEY = 'AIzaSyCmgxN5d_fag99WCVBduMrBSFiXgJPPaFg';

const genAI = new GoogleGenerativeAI(API_KEY);

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  resources: {
    type: "video" | "article" | "tutorial" | "practice";
    title: string;
    url: string;
    duration?: string;
  }[];
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CareerPath {
  title: string;
  description: string;
  averageSalary: string;
  demandLevel: string;
  requiredSkills: string[];
  relatedRoles: string[];
}

export async function generateRoadmap(goal: string): Promise<RoadmapStep[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Create a detailed learning roadmap for becoming a "${goal}". 
    Return ONLY a valid JSON array with this exact structure:
    [
      {
        "id": "1",
        "title": "Step Title",
        "description": "Detailed description of what to learn",
        "duration": "2-3 weeks",
        "difficulty": "Beginner|Intermediate|Advanced",
        "resources": [
          {
            "type": "video|article|tutorial|practice",
            "title": "Resource Title",
            "url": "https://example.com",
            "duration": "optional duration"
          }
        ],
        "completed": false
      }
    ]
    Include 5-8 steps total. Make sure all URLs are real and functional learning resources.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse roadmap response');
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error(`Failed to generate roadmap: ${error.message}`);
  }
}

export async function generateQuiz(goal: string): Promise<QuizQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Create 10 multiple choice quiz questions for someone learning "${goal}".
    Return ONLY a valid JSON array with this exact structure:
    [
      {
        "id": "1",
        "question": "Question text?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "explanation": "Why this answer is correct"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse quiz response');
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
}

export async function generateCareerPaths(goal: string): Promise<CareerPath[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `List 4-6 career paths related to "${goal}".
    Return ONLY a valid JSON array with this exact structure:
    [
      {
        "title": "Job Title",
        "description": "Job description",
        "averageSalary": "$XX,XXX - $XX,XXX",
        "demandLevel": "High|Medium|Low",
        "requiredSkills": ["skill1", "skill2"],
        "relatedRoles": ["role1", "role2"]
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse career paths response');
  } catch (error) {
    console.error('Error generating career paths:', error);
    throw new Error(`Failed to generate career paths: ${error.message}`);
  }
}

export async function chatWithAssistant(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are LEARNMATE, an AI learning assistant. Help the user with their learning journey.
    User message: "${message}"
    
    Respond in a helpful, encouraging tone. Keep responses under 150 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in chat:', error);
    throw new Error(`Failed to get chat response: ${error.message}`);
  }
}
