"use client";
import {
  Bot,
  Clock,
  Copy,
  FileText,
  SendIcon,
  Settings,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React, { useState } from "react";
import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
import { Avatar } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useToast } from "../../hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const mockSuggestions = [
  "Help me write a resume summary as a frontend developer",
  "Write a cover letter for a UX designer position",
  "How do I prepare for a technical interview?",
  "What skills should I highlight for a product manager role?",
  "Give me tips to negotiate a higher salary",
  "How do I explain a career gap in my resume?",
];

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your JobSpark AI assistant. I can help you with resume writing, cover letters, interview preparation, and more. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(inputValue),
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const getRandomResponse = (query: string) => {
    const responses = [
      `Based on your request about "${query.substring(
        0,
        20
      )}...", I would recommend focusing on highlighting your key achievements with metrics whenever possible. Quantifiable results make your resume stand out.`,
      `For your question regarding "${query.substring(
        0,
        20
      )}...", I'd suggest tailoring your application to each position by carefully matching your skills to the job requirements. Research shows this increases interview chances by 60%.`,
      `Regarding "${query.substring(
        0,
        20
      )}...", remember that modern resumes benefit from a clean, scannable format with bullets rather than paragraphs. Most recruiters spend only 7-10 seconds on initial resume screening.`,
      `To address your query about "${query.substring(
        0,
        20
      )}...", consider using the STAR method (Situation, Task, Action, Result) to structure your experience descriptions and interview answers. This framework helps you tell compelling career stories.`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleCopyResponse = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "The response has been copied to your clipboard.",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1 py-8 bg-gray-50 dark:bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-jobspark-500" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tools">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tools">Tools</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tools" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <FileText className="h-4 w-4 text-jobspark-500" />
                          <span>Resume Builder</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <FileText className="h-4 w-4 text-jobspark-500" />
                          <span>Cover Letter Generator</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <Sparkles className="h-4 w-4 text-jobspark-500" />
                          <span>Interview Prep</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <Settings className="h-4 w-4 text-jobspark-500" />
                          <span>Preferences</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="history" className="space-y-3 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm truncate">
                            Resume help for software engineer
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm truncate">
                            Cover letter for marketing position
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm truncate">
                            Salary negotiation tips
                          </span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Popular Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockSuggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer py-1 px-2 hover:bg-[#f8f8f8] dark:hover:bg-[#1a1a1a]/20 hover:border-jobspark-200 transition-colors"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="h-[calc(110vh-13rem)]">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar
                            className={`h-8 flex items-center justify-center w-8 ${
                              message.sender === "assistant"
                                ? "bg-[#808080]"
                                : "bg-gray-200 dark:bg-gray-200"
                            }`}
                          >
                            {message.sender === "assistant" ? (
                              <Bot className="h-5 w-5 text-white" />
                            ) : null}
                          </Avatar>
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-[#808080] text-white ml-auto"
                                  : "bg-gray-100 dark:bg-[#b3b3b3]"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              {message.sender === "assistant" && (
                                <div className="flex items-center text-xs text-gray-500 space-x-2">
                                  <button
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                    onClick={() =>
                                      handleCopyResponse(message.content)
                                    }
                                  >
                                    <Copy className="h-3 w-3" />
                                  </button>
                                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                    <ThumbsUp className="h-3 w-3" />
                                  </button>
                                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                    <ThumbsDown className="h-3 w-3" />
                                  </button>
                                  <span className="text-xs text-gray-400">
                                    {message.timestamp.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                              )}
                              {message.sender === "user" && (
                                <span className="text-xs text-gray-400 ml-auto">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about job search, resumes, interviews..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="bg-[#808080] hover:bg-[#666666]"
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiAssistant;
