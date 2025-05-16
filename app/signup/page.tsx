"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BotIcon,
  Briefcase,
  CheckCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useAuth } from "../context/AuthContext";
import { toast } from "../hooks/use-toast";
import { VerifyEmailModal } from "./components/VerifyEmail";

const steps = [
  {
    id: "step-1",
    name: "Account",
    fields: ["fullName", "email", "password"],
    icon: User,
  },
  {
    id: "step-2",
    name: "Career Details",
    fields: ["jobTitle", "experience", "industry"],
    icon: Briefcase,
  },
  {
    id: "step-3",
    name: "Skills & Expertise",
    fields: ["skills", "summary"],
    icon: Sparkles,
  },
  {
    id: "step-4",
    name: "Review",
    fields: [],
    icon: CheckCheck,
  },
];

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    experience: "",
    industry: "",
    skills: "",
    summary: "",
  });
  const { signup, isLoading } = useAuth();

  // const handleChange = (field: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [confrimPassword, setConfirmPassword] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verifyEmail = localStorage.getItem("jobspark_verifyEmail");

    if (verifyEmail) {
      setEmail(verifyEmail);
      setIsOpen(true);
    }
  }, []);

  const onClose = () => {
    setIsOpen(false);
    localStorage.removeItem("jobspark_verifyUser");
    localStorage.removeItem("jobspark_verifyEmail");
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateAiSummary = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    if (formData.skills.length < 5) {
      toast({
        title: "Skills Required",
        description: "Please enter your skills before generating a summary.",
        variant: "destructive",
        className: "bg-[#f9f9f9]",
      });
      setIsGenerating(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
    const prompt = `Generate a professional summary for a ${
      formData.jobTitle
    } with ${formData.experience} years of experience in the ${
      formData.industry
    } industry. The key skills are: ${
      formData.skills || ""
    }. Keep it under 4 lines.`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const summary = response.text();

      // Update both AI summary and form data
      setAiSummary(summary);
      setFormData((prev) => ({ ...prev, summary }));
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skills = formData.skills.split(",").map((skill) => skill.trim());

    const resp = await signup(formData.email, formData.password, {
      name: formData.fullName,
      confirmPassword: formData.confirmPassword,
      jobTitle: formData.jobTitle,
      yearsOfExperience: formData.experience,
      skills: skills,
      industry: formData.industry,
      summary: formData.summary,
    });
    console.log(resp);
    if (resp.data.needsVerification === true) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    setIsOpen(false); // Reset to false on reload
    localStorage.removeItem("jobspark_verifyUser");
    localStorage.removeItem("jobspark_verifyEmail");
  }, []);
  console.log(isOpen);

  const isStepComplete = (step: number) => {
    if (
      formData.password.trim().length < 10 ||
      formData.confirmPassword.trim().length < 10
    )
      return;
    if (formData.password.trim() !== formData.confirmPassword.trim()) return;

    if (formData.summary && formData.summary.length < 20) return;

    const requiredFields = steps[step].fields;
    return requiredFields.every((field) =>
      formData[field as keyof typeof formData]?.trim()
    );
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="pr-10" // gives space for the eye icon
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={confrimPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {confrimPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && (
                <>
                  {formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}

                  {formData.password.length < 10 && (
                    <p className="text-sm text-red-500">
                      Password must be at least 10 characters long
                    </p>
                  )}

                  {!/[A-Z]/.test(formData.password) && (
                    <p className="text-sm text-red-500">
                      Password must include at least one uppercase letter
                    </p>
                  )}

                  {!/[a-z]/.test(formData.password) && (
                    <p className="text-sm text-red-500">
                      Password must include at least one lowercase letter
                    </p>
                  )}

                  {!/[0-9]/.test(formData.password) && (
                    <p className="text-sm text-red-500">
                      Password must include at least one number
                    </p>
                  )}

                  {!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) && (
                    <p className="text-sm text-red-500">
                      Password must include at least one special character
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="experience"
              >
                Years of Experience
              </label>
              <div className="flex bg-[var(--secondary-color)] items-center rounded-[10px] border border-[var(--border)] shadow-md py-2 px-2">
                <select
                  value={formData.experience}
                  // onChange={(value) => handleOptionChange(value)}
                  onChange={(e) => handleChange("experience", e.target.value)} // Fixed the onChange
                  className="w-full outline-none text-sm"
                >
                  <option value="">select year</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="above-10">Above 10 years</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="industry"
              >
                Industry
              </label>
              <div className="flex items-center rounded-[10px] border shadow-md py-2 px-2">
                <select
                  value={formData.industry}
                  onChange={(e) => handleChange("industry", e.target.value)} // Fixed the onChange
                  className="w-full outline-none text-sm"
                >
                  <option value="">select industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finances</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Key Skills</Label>
              <Textarea
                id="skills"
                placeholder="Enter your key skills, separated by commas (e.g. React, JavaScript, UX Design)"
                className="min-h-[100px]"
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="summary">Professional Summary</Label>
                <button
                  type="button"
                  onClick={generateAiSummary}
                  disabled={isGenerating}
                  className="flex items-center gap-1 text-sm text-jobspark-500 hover:text-jobspark-600 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <BotIcon className="h-4 w-4" />
                      Generate AI Summary
                    </>
                  )}
                </button>
              </div>
              {/* <Label htmlFor="summary">Professional Summary</Label> */}
              {/* <Textarea
                id="summary"
                placeholder="Write a brief professional summary about yourself"
                className="min-h-[120px]"
                value={formData.summary || [aiSummary]}
                onChange={(e) => handleChange("summary", e.target.value)}
              />

              <button onClick={generateAiSummary} className="cursor-pointer">
                <BotIcon />
              </button> */}

              <Textarea
                id="summary"
                placeholder={
                  aiSummary ||
                  "Write a brief professional summary about yourself"
                }
                className="min-h-[120px]"
                value={formData.summary}
                onChange={(e) => {
                  handleChange("summary", e.target.value);
                  // Clear AI summary if user starts typing
                  if (aiSummary) setAiSummary("");
                }}
              />

              {/* Show AI suggestion if different from current text */}
              {aiSummary && aiSummary !== formData.summary && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                  <p className="font-medium">AI Suggestion:</p>
                  <p>{aiSummary}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, summary: aiSummary }));
                      setAiSummary("");
                    }}
                    className="mt-1 text-sm text-blue-600 hover:underline"
                  >
                    Use this suggestion
                  </button>
                </div>
              )}
              {formData.summary.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.summary.length < 10 && (
                    <p className="text-sm text-red-500">
                      Summary must not be less than 20 characters
                    </p>
                  )}
                </p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h3 className="font-medium text-white mb-2">
                Account Information
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Name: {formData.fullName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Email: {formData.email}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h3 className="font-medium text-white mb-2">Career Details</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Job Title: {formData.jobTitle || "Not specified"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Experience: {formData.experience || "Not specified"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Industry: {formData.industry || "Not specified"}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h3 className="font-medium text-white mb-2">
                Skills & Expertise
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Skills: {formData.skills || "Not specified"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Summary: {formData.summary || "Not specified"}
              </p>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    // <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <>
      <div className="flex min-h-screen items-center justify-center bg-white text-black p-4">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-6 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <h1 className="text-3xl font-bold text-[#666666]">
                  JobSpark AI
                </h1>
              </motion.div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Create your account
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join JobSpark AI to find your dream job
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-white mb-2 
                    ${
                      i < currentStep
                        ? "bg-green-500 text-white"
                        : i === currentStep
                        ? // ? "bg-jobspark-500 text-white"
                          "bg-[#808080] text-white"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                    }`}
                    >
                      {i < currentStep ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        i === currentStep
                          ? "text-jobspark-500"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                    {/* {i < steps.length - 1 && (
                    <div className="hidden md:block absolute left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 top-1/2 transform -translate-y-1/2 z-0"></div>
                  )} */}
                  </motion.div>
                ))}
              </div>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>{steps[currentStep].name}</CardTitle>
                <CardDescription>
                  {currentStep === 0 && "Create your account to get started"}
                  {currentStep === 1 && "Tell us about your career background"}
                  {currentStep === 2 &&
                    "Let us know about your skills and expertise"}
                  {currentStep === 3 &&
                    "Review your information before submitting"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>{renderForm()}</form>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prev}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    className="bg-jobspark-500 text-sm cursor-pointer hover:bg-jobspark-600"
                    onClick={next}
                    disabled={!isStepComplete(currentStep)}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-jobspark-500 text-sm cursor-pointer hover:bg-jobspark-600"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-jobspark-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {isOpen && <VerifyEmailModal email={email} onClose={onClose} />}
    </>
  );
};

export default Signup;
