"use client";
import {
  Bot,
  MessageSquareText,
  MinusCircle,
  SendHorizontal,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Hi there! I'm your JobSpark AI Assistant. I can help you with your job search, resume, and interview prep. What would you like help with today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      let response;

      if (input.toLowerCase().includes("resume")) {
        response =
          "I can help you build a standout resume! Would you like tips on formatting, content, or would you like me to review your existing resume?";
      } else if (input.toLowerCase().includes("interview")) {
        response =
          "Preparing for interviews is crucial! I can help with common questions, industry-specific advice, or even conduct a mock interview with you.";
      } else if (
        input.toLowerCase().includes("job") ||
        input.toLowerCase().includes("search")
      ) {
        response =
          "Looking for a new job? I can suggest strategies to optimize your search, help you tailor applications, or provide insights on specific companies.";
      } else {
        response =
          "I'm here to help with your career journey! I can assist with resume building, interview preparation, job search strategies, and more. What specific area would you like guidance on?";
      }

      const botMessage = {
        id: messages.length + 2,
        content: response,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed flex flex-col items-center bottom-6 right-6 z-50">
      {isOpen ? (
        <div
          className={`bg-[#101828] rounded-lg shadow-xl w-80 md:w-96 transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[500px]"
          }`}
        >
          <div className="bg-jobspark-500 rounded-t-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-white" />
              <span className="text-white font-medium">JobSpark Assistant</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleMinimize}
                className="text-white hover:text-gray-200 transition-colors"
              >
                {isMinimized ? (
                  <MessageSquareText className="h-5 w-5" />
                ) : (
                  <MinusCircle className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea className="h-[380px] p-4">
                <div className="space-y-4">
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
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-jobspark-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.sender === "bot" ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.sender === "bot" ? "JobSpark AI" : "You"}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                        <div className="flex items-center space-x-2 mb-1">
                          <Bot className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            JobSpark AI
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    disabled={isTyping}
                    className="flex-1 bg-white"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-jobspark-500 hover:bg-jobspark-600"
                  >
                    <SendHorizontal
                      color="#fff"
                      className="h-5 w-5 cursor-pointer"
                    />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          // className="bg-jobspark-500 hover:bg-jobspark-600 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
          className="bg-white hover:bg-jobspark-600 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
        >
          <MessageSquareText className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
};

export default AIAssistant;
