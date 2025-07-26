import { Brain, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow electric-glow">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">LEARNMATE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered learning platform that creates personalized roadmaps for your career goals.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm">
              <Link to="/roadmap" className="block text-muted-foreground hover:text-primary transition-colors">
                Roadmap Generator
              </Link>
              <Link to="/quiz" className="block text-muted-foreground hover:text-primary transition-colors">
                AI Quizzes
              </Link>
              <Link to="/career-connect" className="block text-muted-foreground hover:text-primary transition-colors">
                Career Connect
              </Link>
              <Link to="/chat" className="block text-muted-foreground hover:text-primary transition-colors">
                AI Assistant
              </Link>
            </div>
          </div>


          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 LEARNMATE. All rights reserved. Made with ❤️ for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;