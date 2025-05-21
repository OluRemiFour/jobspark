"use client";
import {
  AlertCircle,
  Check,
  Download,
  Eye,
  FileText,
  Pencil,
  Plus,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import AIAssistant from "../../components/AIAssistant";
import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Progress } from "../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Image from "next/image";

const resumeSample = {
  name: "Sarah Johnson",
  title: "Senior Frontend Developer",
  contact: {
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    phone: "(555) 123-4567",
  },
  summary:
    "Senior Frontend Developer with 6+ years of experience building responsive and performance-optimized web applications. Specialized in React, TypeScript, and modern UI frameworks.",
  experience: [
    {
      role: "Frontend Engineer",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      achievements: [
        "Developed and maintained multiple React applications",
        "Improved site performance by 35% through code optimization",
        "Implemented responsive designs for cross-platform compatibility",
      ],
    },
    {
      role: "UI Developer",
      company: "Web Innovators",
      period: "2018 - 2020",
      achievements: [
        "Created interactive UI components using JavaScript and CSS",
        "Collaborated with designers to implement pixel-perfect interfaces",
        "Participated in code reviews and maintaining coding standards",
      ],
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Redux",
    "Next.js",
    "UI/UX",
    "GraphQL",
    "Jest",
  ],
};

const Resume = () => {
  const [activeTab, setActiveTab] = useState("resumes");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1 py-8 bg-gray-50 dark:bg-gray-50">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Resumes & Cover Letters</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create and manage your job application documents
            </p>
          </div>

          <Tabs
            defaultValue="resumes"
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-6">
              <TabsTrigger value="resumes">Resumes</TabsTrigger>
              <TabsTrigger value="cover-letters">Cover Letters</TabsTrigger>
            </TabsList>

            <TabsContent value="resumes">
              <Alert className="mb-6 bg-jobspark-50 border-jobspark-200 dark:bg-jobspark-900/20 dark:border-jobspark-800">
                <AlertCircle className="h-4 w-4 text-jobspark-500 dark:text-jobspark-400" />
                <AlertTitle className="text-jobspark-700 dark:text-jobspark-300">
                  Resume Tips
                </AlertTitle>
                <AlertDescription className="text-jobspark-600 dark:text-jobspark-400">
                  Customize your resume for each job application. Our AI can
                  help tailor your resume to match job descriptions.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Existing Resume */}
                <Card className="animate-fade-in">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex justify-between items-center">
                      <span>Main Resume</span>
                      <Badge className="text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </CardTitle>
                    <CardDescription>Last updated 2 days ago</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="aspect-[8.5/11] bg-white dark:bg-gray-800 border rounded-md shadow-sm overflow-hidden relative">
                      <Image
                        height={300}
                        width={300}
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=800&q=80"
                        alt="Resume Preview"
                        className="absolute inset-0 object-cover w-full h-full opacity-10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 text-white text-sm">
                        <div className="flex justify-between items-center">
                          <span>Senior Frontend Developer</span>
                          <div className="flex space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>85%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span>ATS Compatibility</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Resume Preview</DialogTitle>
                          <DialogDescription>
                            Your resume as it will appear to employers
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-white dark:bg-gray-800 border rounded-md p-6 mt-4">
                          <div className="text-2xl font-bold mb-1">
                            {resumeSample.name}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 mb-4">
                            {resumeSample.title}
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <span>{resumeSample.contact.email}</span>
                            <span>{resumeSample.contact.location}</span>
                            <span>{resumeSample.contact.phone}</span>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-bold border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                              Professional Summary
                            </h3>
                            <p className="text-sm">{resumeSample.summary}</p>
                          </div>
                          <div className="mb-4">
                            <h3 className="font-bold border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                              Experience
                            </h3>
                            {resumeSample.experience.map((exp, index) => (
                              <div key={index} className="mb-3">
                                <div className="flex justify-between">
                                  <div className="font-medium">{exp.role}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {exp.period}
                                  </div>
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                  {exp.company}
                                </div>
                                <ul className="text-sm list-disc list-inside space-y-1">
                                  {exp.achievements.map((achievement, i) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h3 className="font-bold border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">
                              Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {resumeSample.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button className="bg-jobspark-500 hover:bg-jobspark-600">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-jobspark-500 hover:bg-jobspark-600"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* AI-Optimized Variant */}
                <Card
                  className="animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex justify-between items-center">
                      <span>Tech Resume</span>
                      <div className="text-xs px-2 py-1 rounded-full bg-jobspark-100 text-jobspark-700 dark:bg-jobspark-900/30 dark:text-jobspark-300">
                        AI Optimized
                      </div>
                    </CardTitle>
                    <CardDescription>Last updated 1 week ago</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="aspect-[8.5/11] bg-white dark:bg-gray-800 border rounded-md shadow-sm overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=800&q=80"
                        alt="Resume Preview"
                        className="absolute inset-0 object-cover w-full h-full opacity-10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 text-white text-sm">
                        <div className="flex justify-between items-center">
                          <span>Software Engineer</span>
                          <div className="flex space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>92%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span>ATS Compatibility</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-jobspark-500 hover:bg-jobspark-600"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* Create New Resume Card */}
                <Card
                  className="border-dashed bg-transparent animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full py-10">
                    <div className="w-16 h-16 rounded-full bg-jobspark-100 dark:bg-jobspark-900/30 flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-jobspark-500 dark:text-jobspark-400" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">
                      Create New Resume
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-xs">
                      Build a new resume from scratch or let our AI create one
                      based on your profile
                    </p>
                    <div className="flex flex-col space-y-2 w-full max-w-[200px]">
                      <Button className="bg-jobspark-500 hover:bg-jobspark-600 w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Existing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cover-letters">
              <Alert className="mb-6 bg-jobspark-50 border-jobspark-200 dark:bg-jobspark-900/20 dark:border-jobspark-800">
                <AlertCircle className="h-4 w-4 text-jobspark-500 dark:text-jobspark-400" />
                <AlertTitle className="text-jobspark-700 dark:text-jobspark-300">
                  Write a Great Cover Letter
                </AlertTitle>
                <AlertDescription className="text-jobspark-600 dark:text-jobspark-400">
                  Our AI can generate personalized cover letters for specific
                  job descriptions in seconds.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Cover Letter Card */}
                <Card className="border-dashed bg-transparent animate-fade-in">
                  <CardContent className="flex flex-col items-center justify-center h-full py-10">
                    <div className="w-16 h-16 rounded-full bg-jobspark-100 dark:bg-jobspark-900/30 flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-jobspark-500 dark:text-jobspark-400" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">
                      Create Cover Letter
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-xs">
                      Generate a personalized cover letter with AI or create one
                      from scratch
                    </p>
                    <div className="flex flex-col space-y-2 w-full max-w-[200px]">
                      <Button className="bg-jobspark-500 hover:bg-jobspark-600 w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Existing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
};

export default Resume;
