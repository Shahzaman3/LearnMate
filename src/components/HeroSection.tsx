import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Brain, Target, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  const handleGenerateRoadmap = () => {
    if (goal.trim()) {
      navigate(`/roadmap?goal=${encodeURIComponent(goal)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGenerateRoadmap();
    }
  };

  const popularGoals = [
    "Become a React Developer",
    "Learn Data Science",
    "Master Digital Marketing",
    "Get into Cybersecurity",
    "Learn UI/UX Design"
  ];

  return (
    <div className="relative min-h-screen hero-gradient flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        
        <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 animate-float">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI-Powered Learning Roadmaps</span>
        </div>

      
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          Your AI Learning
          <br />
          <span className="gradient-text animate-glow">Companion</span>
        </h1>

        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-balance">
          Transform your career goals into personalized learning roadmaps with AI-generated tutorials, 
          quizzes, and career connections. Start your journey today.
        </p>

        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">What do you want to learn?</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="e.g., Become a React Developer"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-14 text-lg glass-card border-white/20 bg-white/5"
              />
              <Button
                onClick={handleGenerateRoadmap}
                disabled={!goal.trim()}
                className="gradient-button h-14 px-8 text-lg font-semibold"
              >
                Generate Roadmap
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Popular learning goals:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularGoals.map((popularGoal) => (
                <Button
                  key={popularGoal}
                  variant="outline"
                  size="sm"
                  onClick={() => setGoal(popularGoal)}
                  className="glass-card-hover text-xs"
                >
                  {popularGoal}
                </Button>
              ))}
            </div>
          </div>
        </div>

    
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Generated Roadmaps</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized step-by-step learning paths tailored to your goals
            </p>
          </div>

          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Curated Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access hand-picked tutorials, videos, and learning materials
            </p>
          </div>

          <div className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Career Connect</h3>
            <p className="text-sm text-muted-foreground">
              Discover real-world opportunities and career paths
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;