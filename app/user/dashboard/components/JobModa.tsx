import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { cn } from "@/app/lib/utils";
import {
  AlertCircle,
  FilePen,
  FileSearch,
  FileText,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";
import CoverLetterModal from "./CoverLetterModal";
import { SkillMatch } from "./SkillMatch";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsCoverLetter: (open: boolean) => void;
  selectedJobDetails: SelectedJob;
  userDetails: UserDetails;
  setAiCoverLetter: (value: string) => void;
  generatingType: string;
  setGeneratingType: (value: string) => void;
}

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  jobTitle: string;
  industry: string;
  lastLoggedInAt: string;
  summary: string;
  yearsOfExperience: string;
  skills: string[];
}

interface SelectedJob {
  title: string;
  description: string;
  redirect_url: string;
}

export function JobModal({
  isOpen,
  onClose,
  setIsCoverLetter,
  selectedJobDetails,
  setAiCoverLetter,
  userDetails,
  generatingType,
  setGeneratingType,
}: JobModalProps) {
  const isMobile = useIsMobile();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const mockSkills = [
    { skill: "React.js", matchPercentage: 92 },
    { skill: "TypeScript", matchPercentage: 85 },
    { skill: "Responsive Design", matchPercentage: 78 },
    { skill: "State Management", matchPercentage: 70 },
    { skill: "API Integration", matchPercentage: 88 },
  ];

  const generateDocument = async (type: "resume" | "coverletter") => {
    setIsGenerating(true);
    setGeneratingType(type);
    const prompt = `
    Generate a highly professional and well-structured ${
      type === "coverletter" ? "cover letter" : "resume"
    } tailored for the position of "${selectedJobDetails?.title}" in the ${
      userDetails?.industry
    } industry.

    Use the following user profile to personalize the content:
    - Full Name: ${userDetails?.name}
    - Email: ${userDetails?.email}
    - Current Job Title: ${userDetails?.jobTitle}
    - Summary: ${userDetails?.summary}
    - Years of Experience: ${userDetails?.yearsOfExperience}
    - Skills: ${userDetails?.skills?.join(", ")}

    Base the writing style and focus on the following job description:
    "${selectedJobDetails?.description}"

    Ensure the output is aligned with industry standards, ATS-optimized, and persuasive enough to highlight the candidate’s strengths and qualifications for this role. Emphasize achievements, measurable impact, and how their experience matches the company's expectations.
    
    Do not mention this instruction. Just return the final ${
      type === "coverletter" ? "cover letter" : "resume"
    }.
    `;

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const res = response.text();

      if (res) {
        setIsCoverLetter(true);
        console.log(res);
        setAiCoverLetter(res);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          title="letter"
          className={cn(
            "bg-white text-black max-w-3xl p-0 overflow-y-scroll",
            isMobile
              ? "w-[95vw] h-[90vh] max-h-[90vh]"
              : "w-[800px] max-h-[80vh]"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedJobDetails?.title}
                  </DialogTitle>
                  <DialogDescription className="text-zinc-600 mt-1">
                    {selectedJobDetails?.company.display_name} •{" "}
                    {selectedJobDetails?.location?.display_name}
                  </DialogDescription>
                </div>
                <Badge className="bg-black hover:bg-zinc-800 text-white">
                  92% Match
                </Badge>
              </div>
            </DialogHeader>

            {/* Tabs and Content */}
            <div className="flex-1 overflow-hidden">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <div className="border-b border-zinc-100">
                  <TabsList className="bg-transparent h-14 p-0 w-full flex justify-start gap-2 px-6">
                    <TabsTrigger
                      value="description"
                      className="h-full data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-2"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Description
                    </TabsTrigger>
                    {/* <TabsTrigger
                      value="match"
                      className="h-full data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-2"
                    >
                      <FileSearch className="h-4 w-4 mr-2" />
                      ATS Match
                    </TabsTrigger> */}
                  </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <TabsContent value="description" className="m-0 h-full">
                    <div className="whitespace-pre-line prose prose-zinc max-w-none">
                      {selectedJobDetails?.description}
                    </div>
                  </TabsContent>

                  <TabsContent value="match" className="m-0 h-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FileSearch className="h-5 w-5 mr-2" />
                          ATS Skill Match Analysis
                        </h3>
                        <div className="space-y-4">
                          {mockSkills.map((skillItem, index) => (
                            <SkillMatch
                              key={index}
                              skill={skillItem.skill}
                              matchPercentage={skillItem.matchPercentage}
                            />
                          ))}
                        </div>
                      </div>

                      {/* <Separator className="my-6" /> */}

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Suggested Improvements
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                          <li>
                            Add more details about your React.js experience
                          </li>
                          <li>Include specific responsive design projects</li>
                          <li>Mention experience with testing frameworks</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Action buttons */}
            <div className="px-6 py-4 border-t md:flex justify-between border-zinc-100 bg-zinc-50 mt-auto">
              <Link href={selectedJobDetails?.redirect_url} target="blank">
                <Button
                  size="lg"
                  className="bg-black hover:bg-zinc-800 w-full text-white"
                  // onClick={() => generateDocument("resume")}
                  disabled={isGenerating}
                >
                  <RocketIcon className="h-4 w-4" />
                  Apply
                </Button>
              </Link>
              <div
                className={cn(
                  "flex gap-3 mt-2 md:mt-0",
                  isMobile ? "flex-col" : "justify-end"
                )}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-black text-black hover:bg-zinc-100"
                  // onClick={() => {
                  //   setIsCoverLetter(true);
                  // }}
                  // onClick={() => generateDocument()}
                  onClick={() => generateDocument("coverletter")}
                  disabled={isGenerating}
                >
                  <FilePen className="h-4 w-4 mr-2" />
                  {isGenerating && generatingType === "coverletter"
                    ? "Generating..."
                    : "Generate Cover Letter"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-black text-black hover:bg-zinc-100"
                  // className="bg-black hover:bg-zinc-800 text-white"
                  // onClick={() => generateDocument()}
                  onClick={() => generateDocument("resume")}
                  disabled={isGenerating}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {isGenerating && generatingType === "resume"
                    ? "Generating..."
                    : "Generate Resume"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Using cn from utils
