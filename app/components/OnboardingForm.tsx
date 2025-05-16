"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

const steps = [
  {
    id: "step-1",
    name: "Basic Information",
    fields: ["fullName", "email", "phone"],
  },
  {
    id: "step-2",
    name: "Career Details",
    fields: ["jobTitle", "experience", "industry"],
  },
  {
    id: "step-3",
    name: "Preferences",
    fields: ["location", "remote", "salary"],
  },
  {
    id: "step-4",
    name: "Skills & Expertise",
    fields: ["skills", "summary"],
  },
];

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    industry: "",
    location: "",
    remote: "",
    salary: "",
    skills: "",
    summary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormComplete(true);
    }, 1500);
  };

  const isStepComplete = (step: number) => {
    const requiredFields = steps[step].fields;
    return requiredFields.every((field) =>
      formData[field as keyof typeof formData]?.trim()
    );
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Current Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleChange("experience", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleChange("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remote">Remote Work Preference</Label>
                <Select
                  value={formData.remote}
                  onValueChange={(value) => handleChange("remote", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Expected Salary Range</Label>
                <Select
                  value={formData.salary}
                  onValueChange={(value) => handleChange("salary", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50k">$0 - $50,000</SelectItem>
                    <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                    <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                    <SelectItem value="100k-150k">
                      $100,000 - $150,000
                    </SelectItem>
                    <SelectItem value="150k+">$150,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
                <Textarea
                  id="skills"
                  placeholder="Enter your key skills, separated by commas"
                  className="min-h-[100px]"
                  value={formData.skills}
                  onChange={(e) => handleChange("skills", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Write a brief professional summary"
                  className="min-h-[120px]"
                  value={formData.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li key={step.id} className="relative pr-8 sm:pr-20">
                {index < currentStep ? (
                  // Completed step
                  <div className="group">
                    <span className="flex items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-jobspark-500">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </div>
                ) : index === currentStep ? (
                  // Current step
                  <div className="flex items-center" aria-current="step">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-jobspark-500 bg-white">
                      <span className="h-6 w-6 text-center text-jobspark-500 font-bold">
                        {index + 1}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-jobspark-500">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  // Upcoming step
                  <div className="group">
                    <span className="flex items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                        <span className="h-6 w-6 text-center text-gray-500">
                          {index + 1}
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500">
                        {step.name}
                      </span>
                    </span>
                  </div>
                )}

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 right-0 hidden h-0.5 w-5 sm:block sm:w-16 bg-gray-300">
                    {index < currentStep && (
                      <div className="h-full bg-jobspark-500"></div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>{steps[currentStep].name}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Let's start with your basic information"}
            {currentStep === 1 && "Tell us about your career background"}
            {currentStep === 2 && "What are you looking for in your next role?"}
            {currentStep === 3 &&
              "List your key skills and professional summary"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formComplete ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Profile Complete!</h3>
              <p className="text-gray-500 mb-6">
                Your profile has been set up. We&apos;re now ready to find your
                perfect job match.
              </p>
              <Button className="bg-jobspark-500 hover:bg-jobspark-600">
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>{renderFormFields()}</form>
          )}
        </CardContent>
        {!formComplete && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prev}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={next}
                disabled={!isStepComplete(currentStep)}
                className="bg-jobspark-500 hover:bg-jobspark-600"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isStepComplete(currentStep) || isSubmitting}
                className="bg-jobspark-500 hover:bg-jobspark-600"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default OnboardingForm;
