"use client";
import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
import { Skeleton } from "@/app/components/ui/skeleton";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Briefcase, Filter, MapPin, Search } from "lucide-react";
import AIAssistant from "../../components/AIAssistant";
import Footer from "../../components/Footer";
import { JobCard } from "../../components/JobCard";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  type: string;
  salary: string;
  posted: string;
  skills: string[];
  score: number;
  min_salary?: number;
  salary_max?: number;
  created?: string;
  isSaved?: boolean;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [matchThreshold, setMatchThreshold] = useState([75]);
  const [activeTab, setActiveTab] = useState("recommended");

  // Filter states
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: false,
    partTime: false,
    contract: false,
    internship: false,
  });
  const [locationFilters, setLocationFilters] = useState({
    remote: false,
    hybrid: false,
    onsite: false,
  });
  const [postedFilters, setPostedFilters] = useState({
    past24h: false,
    pastWeek: false,
    pastMonth: false,
  });
  const [easyApply, setEasyApply] = useState(false);

  const getUserJobs = async () => {
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
        const jobs = response.data.data.matchedJobs || [];
        setUserJobs(jobs);
        setFilteredJobs(jobs);
      }
    } catch (error: any) {
      console.error("API Error Details:", {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message ||
          `Request failed with status ${error.response?.status}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleMatchFilter = (value: number[]) => {
    setMatchThreshold(value);
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = [...userJobs];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job?.company.display_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          job?.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    } else {
    }
    // Apply match score filter
    filtered = filtered.filter((job) => job.score >= matchThreshold[0]);

    // Apply job type filters
    const activeJobTypeFilters = Object.entries(jobTypeFilters)
      .filter(([_, value]) => value)
      .map(([key]) =>
        key
          .replace(/([A-Z])/g, " $1")
          .trim()
          .toLowerCase()
      );

    if (activeJobTypeFilters.length > 0) {
      filtered = filtered.filter((job) =>
        activeJobTypeFilters.includes(job.type.toLowerCase())
      );
    }

    // Apply location filters
    const activeLocationFilters = Object.entries(locationFilters)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (activeLocationFilters.length > 0) {
      filtered = filtered.filter((job) => {
        const location = job.location.display_name.toLowerCase();
        return activeLocationFilters.some((filter) => {
          if (filter === "remote") return location.includes("remote");
          if (filter === "hybrid") return location.includes("hybrid");
          if (filter === "onsite")
            return !location.includes("remote") && !location.includes("hybrid");
          return false;
        });
      });
    }

    // Apply posted filters (simplified example - would need actual dates to implement properly)
    if (
      postedFilters.past24h ||
      postedFilters.pastWeek ||
      postedFilters.pastMonth
    ) {
      filtered = filtered.filter((job) => {
        console.log(job);
        // This is a placeholder - you'd need to compare actual dates
        return true;
      });
    }

    setFilteredJobs(filtered);
  };

  const [selectedJobDetails, setSelectedJobDetails] = useState<Job | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [saveJobs, setSavedJobs] = useState([]);

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
  const handleDetailsClick = (job: Job) => {
    setSelectedJobDetails(job);
  };

  const handleJobTypeChange = (type: keyof typeof jobTypeFilters) => {
    setJobTypeFilters({
      ...jobTypeFilters,
      [type]: !jobTypeFilters[type],
    });
  };

  const handleLocationChange = (type: keyof typeof locationFilters) => {
    setLocationFilters({
      ...locationFilters,
      [type]: !locationFilters[type],
    });
  };

  const handlePostedChange = (type: keyof typeof postedFilters) => {
    setPostedFilters({
      ...postedFilters,
      [type]: !postedFilters[type],
    });
  };

  useEffect(() => {
    getUserJobs();
    getSavedJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobTypeFilters, locationFilters, postedFilters, easyApply]);

  return (
    <div className="flex justify-center flex-col min-h-screen">
      <main className="flex-1 py-8 justify-center mx-auto bg-gray-50">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Find Your Perfect Job Match
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Explore opportunities tailored to your skills and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2" /> Filters
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Match Score</h4>
                      <div className="space-y-2">
                        <Slider
                          value={matchThreshold}
                          onValueChange={handleMatchFilter}
                          min={0}
                          max={100}
                          step={5}
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Min: {matchThreshold[0]}%</span>
                          <span className="text-jobspark-500">
                            {filteredJobs.length} jobs
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium mb-2">Job Type</h4>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="full-time"
                          checked={jobTypeFilters.fullTime}
                          onCheckedChange={() =>
                            handleJobTypeChange("fullTime")
                          }
                        />
                        <label htmlFor="full-time" className="text-sm">
                          Full-time
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="part-time"
                          checked={jobTypeFilters.partTime}
                          onCheckedChange={() =>
                            handleJobTypeChange("partTime")
                          }
                        />
                        <label htmlFor="part-time" className="text-sm">
                          Part-time
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="contract"
                          checked={jobTypeFilters.contract}
                          onCheckedChange={() =>
                            handleJobTypeChange("contract")
                          }
                        />
                        <label htmlFor="contract" className="text-sm">
                          Contract
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="internship"
                          checked={jobTypeFilters.internship}
                          onCheckedChange={() =>
                            handleJobTypeChange("internship")
                          }
                        />
                        <label htmlFor="internship" className="text-sm">
                          Internship
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remote"
                          checked={locationFilters.remote}
                          onCheckedChange={() => handleLocationChange("remote")}
                        />
                        <label htmlFor="remote" className="text-sm">
                          Remote
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hybrid"
                          checked={locationFilters.hybrid}
                          onCheckedChange={() => handleLocationChange("hybrid")}
                        />
                        <label htmlFor="hybrid" className="text-sm">
                          Hybrid
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="onsite"
                          checked={locationFilters.onsite}
                          onCheckedChange={() => handleLocationChange("onsite")}
                        />
                        <label htmlFor="onsite" className="text-sm">
                          On-site
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium mb-2">Posted</h4>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="past-24h"
                          checked={postedFilters.past24h}
                          onCheckedChange={() => handlePostedChange("past24h")}
                        />
                        <label htmlFor="past-24h" className="text-sm">
                          Past 24 hours
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="past-week"
                          checked={postedFilters.pastWeek}
                          onCheckedChange={() => handlePostedChange("pastWeek")}
                        />
                        <label htmlFor="past-week" className="text-sm">
                          Past week
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="past-month"
                          checked={postedFilters.pastMonth}
                          onCheckedChange={() =>
                            handlePostedChange("pastMonth")
                          }
                        />
                        <label htmlFor="past-month" className="text-sm">
                          Past month
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Easy Apply</h4>
                        <Switch
                          id="easy-apply"
                          checked={easyApply}
                          onCheckedChange={() => setEasyApply(!easyApply)}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Only show jobs with one-click apply
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  className="rounded-full bg-gray-500 text-white cursor-pointer"
                  type="submit"
                >
                  Search
                </Button>
              </form>

              <Tabs
                defaultValue="recommended"
                className="w-full"
                onValueChange={(value) => setActiveTab(value)}
              >
                <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                </TabsList>

                <TabsContent value="recommended" className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {locationFilters.remote && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" /> Remote
                        <Button
                          variant="ghost"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleLocationChange("remote")}
                        >
                          ×
                        </Button>
                      </Badge>
                    )}
                    {jobTypeFilters.fullTime && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Briefcase className="h-3 w-3" /> Full-time
                        <Button
                          variant="ghost"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleJobTypeChange("fullTime")}
                        >
                          ×
                        </Button>
                      </Badge>
                    )}
                    {/* Add other active filters as badges */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-[200px] w-full rounded-lg bg-gray-200 animate-pulse"
                        />
                      ))
                    ) : filteredJobs.length > 0 ? (
                      filteredJobs.map((job: Job, index: number) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onDetailsClick={handleDetailsClick}
                          selectedJobDetails={selectedJobDetails}
                          className="animate-slide-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-12">
                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">
                          No jobs found matching your criteria
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Try adjusting your filters or search query
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="space-y-4">
                  {/* Implement recent jobs logic here */}
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">
                      Recent jobs feature coming soon
                    </h3>
                  </div>
                </TabsContent>

                <TabsContent value="saved" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-[200px] w-full rounded-lg bg-gray-200 animate-pulse"
                        />
                      ))
                    ) : saveJobs.length > 0 ? (
                      saveJobs.map((job, index) => (
                        <div key={index}>
                          <JobCard
                            onDetailsClick={handleDetailsClick}
                            saveJobs={saveJobs}
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
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Jobs;
