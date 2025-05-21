import axios from "axios";
import { getCookie } from "cookies-next";
import {
  BookmarkPlus,
  Briefcase,
  Building,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import CoverLetterModal from "../user/dashboard/components/CoverLetterModal";
import { JobModal } from "../user/dashboard/components/JobModa";

interface JobCardProps {
  job: Job;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  className?: string;
  style?: React.CSSProperties;
  selectedJobDetails: SelectedJob;
  onDetailsClick: (data: Job) => void;
  saveUserJob: () => void;
  isSaved: boolean;
  userDetails: UserDetails | null;
  setAiCoverLetter: React.Dispatch<React.SetStateAction<string[]>>;
  setGeneratingType: React.Dispatch<
    React.SetStateAction<"resume" | "coverletter" | null>
  >;
  generatingType: "resume" | "coverletter" | null;
}

interface SelectedJob {
  title: string;
  description: string;
  redirect_url: string;
}

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  isVerified: string;
  redirect_url: string;
}
interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string | [];
  };
  description: string;
  type: string;
  salary: string;
  posted: string;
  skills: string[];
  score: number;
  min_salary: number;
  salary_max: number;
  created: string;
  redirect_url: string;
  contract_type: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  className = "",
  style,
  selectedJobDetails,
  onDetailsClick,
  saveUserJob,
  isSaved = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoverLetter, setIsCoverLetter] = useState(false);
  const [userDetails, setUsetDetails] = useState<UserDetails | null>(null);
  const [aiCoverLetter, setAiCoverLetter] = useState<string[] | (() => void)>(
    []
  );
  const [generatingType, setGeneratingType] = useState<
    "resume" | "coverletter" | null
  >(null);

  const handleGetUser = async () => {
    const token = await getCookie("token");
    const base_url = "/api/get-user";
    try {
      const request = await axios.get(base_url, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      const response = request.data;
      if (response) {
        setUsetDetails(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <div className="flex-col">
        <Card
          className={`overflow-hidden border border-gray-200 dark:border-gray-800 ${className}`}
          style={style}
        >
          <>
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg mb-1" title={job?.title}>
                      {job?.title.split(" ").slice(0, 4).join(" ")}
                      {job?.title.split(" ").length > 4 && "..."}
                    </h3>{" "}
                    <div className="flex items-center text-gray-500 mb-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{job.company?.display_name}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job?.location?.display_name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {job?.skills?.slice(0, 3).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills?.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          +{job.skills?.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between gap-2 text-sm mb-3">
                      <div>
                        <div className="flex items-center text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{job?.type || "Location: check details"}</span>
                        </div>

                        <div className="flex items-center text-gray-500 col-span-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            Posted{" "}
                            {job?.created &&
                            !isNaN(new Date(job.created).getTime())
                              ? new Date(job.created)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>
                          {job?.salary_max
                            ? `${Math.round(job.salary_max / 1000)}k`
                            : "Salary not disclosed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#666666] p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-2 text-sm font-medium">Match:</div>
                  <div className="bg-white dark:bg-gray-700 rounded-full h-3 w-24 overflow-hidden">
                    <div
                      className={`h-full ${
                        job?.match >= 90
                          ? "bg-black dark:bg-white"
                          : job?.match >= 75
                          ? "bg-gray-700 dark:bg-gray-300"
                          : "bg-gray-400 dark:bg-gray-500"
                      }`}
                      style={{ width: `${job?.score}%` }}
                    ></div>
                  </div>
                  <div className="ml-2 text-sm font-medium">{job?.score}%</div>
                </div>
                {isSaved && (
                  <Button
                    onClick={() => {
                      saveUserJob();
                      onDetailsClick(job);
                    }}
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <BookmarkPlus className="h-10 w-10" />
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 bg-gray-50 dark:bg-[#666666] justify-between">
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  onDetailsClick(job);
                }}
                variant="outline"
                className="cursor-pointer"
                size="sm"
              >
                Details
              </Button>
              <Link href={job?.redirect_url || "#"} target="_blank" passHref>
                <Button
                  size="sm"
                  className="bg-black cursor-pointer text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  // onClick={() => applyToJob(job)}
                >
                  Apply Now
                </Button>
              </Link>
            </CardFooter>
          </>

          <JobModal
            selectedJobDetails={selectedJobDetails}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            setIsCoverLetter={setIsCoverLetter}
            userDetails={userDetails}
            setAiCoverLetter={setAiCoverLetter}
            setGeneratingType={setGeneratingType}
            generatingType={generatingType}
          />
        </Card>
      </div>

      {isModalOpen && (
        <CoverLetterModal
          open={isCoverLetter}
          onOpenChange={setIsCoverLetter}
          aiCoverLetter={aiCoverLetter}
          generatingType={generatingType}
        />
      )}
    </>
  );
};

// Adding a default export too
export default JobCard;
