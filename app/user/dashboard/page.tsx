"use client";
import { Skeleton } from "@/app/components/ui/skeleton";
import { toast } from "@/app/hooks/use-toast";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  BarChart,
  Briefcase,
  LockIcon,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import AIAssistant from "../../components/AIAssistant";
import Footer from "../../components/Footer";
import { JobCard } from "../../components/JobCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import ComingSoon from "./components/ComingSoon";
import { motion } from "framer-motion";

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

type UserDetails = {
  usr: string[];
  name: string;
};

const ITEMS_PER_PAGE = 9;
const Dashboard = () => {
  const [user, setUser] = useState<UserDetails>({ usr: [] });
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usr, setUsr] = useState([]);
  const [selectSave, setSelectSave] = useState<Job | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(userJobs?.length / ITEMS_PER_PAGE || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const safeUserJobs = Array.isArray(userJobs)
    ? userJobs
    : [userJobs].filter(Boolean);
  const currentJobs =
    safeUserJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE) ||
    userJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(
    null
  );

  const handleDetailsClick = (job: Job) => {
    setSelectedJobDetails(job);
    setSelectSave(job);
  };

  const getUserJob = async () => {
    const token = await getCookie("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    setLoading(true);

    try {
      const response = await axios.get("/api/get-user-jobs", {
        headers: {
          "Content-Type": "application/json",
          token: String(token),
        },
        withCredentials: true,
      });
      if (response.data.status === "success" || response.data) {
        setUserJobs(response.data.data.matchedJobs);
        setUsr(response.data.data);
      }
      // return response.data;
    } catch (error: any) {
      console.error("API Error Details:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      throw new Error(
        error.response?.data?.message ||
          `Request failed with status ${error.response?.status}`
      );
    }
    setLoading(false);
  };

  const saveUserJob = async () => {
    const token = await getCookie("token");
    const base_url = "/api/save-user-jobs";

    const payload = {
      title: selectSave?.title,
      company: selectSave?.company?.display_name || "",
      contract_type:
        selectSave?.location?.display_name || selectSave?.contract_type || "",
      description: selectSave?.description || "",
      created: selectSave?.created || new Date().toISOString(),
      score: selectSave?.score || 0,
      redirect_url: selectSave?.redirect_url || "",
    };

    if (!selectSave) {
      return "No data found";
    }

    try {
      const request = await axios.post(base_url, payload, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const response = request.data;
      if (response.statusCode == "007") {
        toast({
          title: "Job saved",
          description: "Your Job is successfully saved",
          variant: "default",
          className: "bg-[#f9f9f9]",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedJobs = async () => {
    const token = await getCookie("token");
    const base_url = "/api/get-saved-jobs";
    setIsLoading(true);
    try {
      const request = await axios.get(`${base_url}`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      const response = request.data;
      if (response.statusCode == "007") {
        setSavedJobs(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSavedJobs();
    getUserJob();
    const storedUser = localStorage.getItem("jobspark_userData");
    if (storedUser) {
      const parsedUser: UserDetails = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 items-center justify-center min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1 py-8 ">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.name + "!" || ""}
              </h1>
              <p className="text-gray-500">
                Let&apos;s find your perfect job match today.
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className="mr-4">
                <div className="text-sm text-gray-500 mb-1">
                  Profile completeness
                </div>
                <div className="flex items-center">
                  <Progress value={85} className="w-36 mr-2" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <Trophy className="h-4 w-4" />
                <span>Level 3</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
              className="bg-white animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Job Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">{userJobs?.length}</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />4 this week
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500">Total Jobs</div>
                    <div className="font-medium">{userJobs?.length || 0}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500">Saved Jobs</div>
                    <div className="font-medium">{saveJobs?.length || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-white animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {/* <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Resume Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">28</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12%
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-10 bg-gray-50 rounded overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#99999] to-[#808080]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>Last 30 days</span>
                    <span>+8 from last month</span>
                  </div>
                </div>
              </CardContent> */}

              <div className="flex items-center justify-center text-black px-4">
                <motion.div
                  className="flex flex-col items-center space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="p-4 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <LockIcon className="w-8 h-8 text-[#6C51D2]" />
                  </motion.div>

                  <motion.h1
                    className="text-2xl font-semibold tracking-widest"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  >
                    Coming Soon...
                  </motion.h1>

                  <motion.p
                    className="text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    This section is locked for now. Stay tuned!
                  </motion.p>
                </motion.div>
              </div>
            </Card>

            <Card
              className="bg-white animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Job Match Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">
                    {usr.totalScore !== undefined ? usr?.totalScore + "%" : "0"}
                    <span className="text-xl"></span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Top 15%
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-gray-500">Skills</div>
                    <div className="font-medium">92%</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-gray-500">Experience</div>
                    <div className="font-medium">85%</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="text-gray-500">Education</div>
                    <div className="font-medium">90%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="recommendations" className="mb-8">
            <TabsList className="grid grid-cols-3 md:w-[450px] mb-4">
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="applied">Applied</TabsTrigger>
            </TabsList>

            {/* Recommendations */}
            <TabsContent value="recommendations">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="h-[200px] w-full rounded-lg bg-gray-200 animate-pulse"
                      />
                    ))
                  : currentJobs.map((job, index) => (
                      <JobCard
                        onDetailsClick={handleDetailsClick}
                        selectedJobDetails={selectedJobDetails}
                        saveUserJob={saveUserJob}
                        selectSave={selectSave}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        key={index}
                        job={job}
                        isSaved={true}
                      />
                    ))}
              </div>
            </TabsContent>

            {/* Saved */}
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  // Show 6 skeletons while loading
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-[200px] w-full rounded-lg bg-gray-200 animate-pulse"
                    />
                  ))
                ) : saveJobs.length > 0 ? (
                  // Show saved jobs if available
                  saveJobs.map((job, index) => (
                    <div key={index}>
                      <JobCard
                        onDetailsClick={handleDetailsClick}
                        selectSave={selectSave}
                        saveUserJob={saveUserJob}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        job={job}
                        isSaved={false}
                      />
                    </div>
                  ))
                ) : (
                  // Show "no saved jobs" message
                  <div className="bg-white rounded-lg p-8 text-center col-span-full">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">
                      No saved jobs yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      When you find jobs you like, save them here to apply
                      later.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Applied */}
            <TabsContent value="applied">
              {/* <div className="bg-white rounded-lg p-8 text-center">
                <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">
                  Your application history
                </h3>
                <p className="text-gray-500 mb-4">
                  Track the status of your job applications here.
                </p>
              </div> */}
              <ComingSoon />
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mx-auto items-center mb-2 mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-jobspark-500" />
                  Market Insights
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">In-Demand Skills</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between items-center">
                        <span>React</span>
                        <span className="text-jobspark-500 font-medium">
                          +18%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>TypeScript</span>
                        <span className="text-jobspark-500 font-medium">
                          +15%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>UI/UX</span>
                        <span className="text-jobspark-500 font-medium">
                          +12%
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Salary Trends</h4>
                    <div className="text-sm">
                      <div className="mb-1">Average in your area</div>
                      <div className="text-2xl font-bold">$125,000</div>
                      <div className="text-green-600 text-xs flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        5.2% higher than national average
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Growing Industries</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between items-center">
                        <span>AI & Machine Learning</span>
                        <span className="text-jobspark-500 font-medium">
                          +24%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Fintech</span>
                        <span className="text-jobspark-500 font-medium">
                          +19%
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Healthcare Tech</span>
                        <span className="text-jobspark-500 font-medium">
                          +16%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
