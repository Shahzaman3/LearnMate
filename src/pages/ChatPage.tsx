import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Brain, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI learning assistant. I can help you with questions about React development, career advice, or clarify concepts from your learning roadmap. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(newMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("react") && input.includes("hook")) {
      return "React hooks are functions that let you use state and other React features in functional components. The most common ones are useState for managing state, useEffect for side effects, and useContext for consuming context. Would you like me to explain any specific hook in detail?";
    } else if (input.includes("career") || input.includes("job")) {
      return "For a React developer career, focus on building a strong portfolio with diverse projects. Key skills include React fundamentals, state management (Redux/Context), testing, and understanding of modern JavaScript. The job market for React developers is very strong with many remote opportunities. Would you like specific advice on portfolio projects?";
    } else if (input.includes("learn") || input.includes("study")) {
      return "The best approach to learning React is hands-on practice. Start with the official React documentation, build small projects, then gradually tackle more complex applications. I recommend building a todo app, weather app, and e-commerce site to cover different concepts. What specific topic would you like to focus on?";
    } else if (input.includes("project") || input.includes("portfolio")) {
      return "Great portfolio projects for React developers include: 1) A personal portfolio website, 2) A task management app with CRUD operations, 3) A weather app using APIs, 4) An e-commerce site with cart functionality, 5) A social media dashboard. Each should demonstrate different React concepts. Which type of project interests you most?";
    } else {
      return "That's a great question! Based on your React learning journey, I'd recommend focusing on practical application of concepts. Practice building components, managing state, and working with APIs. Remember, consistent daily practice is key to mastering React development. Is there a specific React concept you're struggling with?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "How do React hooks work?",
    "What projects should I build for my portfolio?", 
    "How do I prepare for React developer interviews?",
    "What's the difference between useState and useReducer?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <div className="glass-card p-6 rounded-2xl mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  AI Learning <span className="gradient-text">Assistant</span>
                </h1>
                <p className="text-muted-foreground">
                  Get personalized help with your React learning journey
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="glass-card h-[600px] flex flex-col">
                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.isUser ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={message.isUser ? "bg-primary" : "bg-gradient-to-r from-primary to-primary-glow"}>
                          {message.isUser ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl  overflow-hidden ${
                          message.isUser
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "glass-card"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="glass-card p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about React or your learning journey..."
                      className="flex-1 glass-card border-white/20 bg-white/5"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      className="gradient-button"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Suggested Questions */}
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Suggested Questions</h3>
                  </div>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left h-auto p-3 glass-card-hover justify-start text-xs break-words whitespace-pre-wrap"
                        onClick={() => setNewMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/roadmap">View Roadmap</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/quiz">Take Quiz</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/career-connect">Career Paths</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;