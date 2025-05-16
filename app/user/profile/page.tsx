"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import {
  Calendar,
  Camera,
  Edit,
  Mail,
  MapPin,
  Phone,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AIAssistant from "../../components/AIAssistant";
import Footer from "../../components/Footer";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";

const userProfile = {
  personal: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    about:
      "Senior Frontend Developer with 6+ years of experience building responsive and performance-optimized web applications. Specialized in React, TypeScript, and modern UI frameworks.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  experience: [
    {
      role: "Frontend Engineer",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      location: "San Francisco, CA",
      description:
        "Lead frontend development for enterprise SaaS platform. Implemented responsive design, improved performance by 35%, and mentored junior developers.",
    },
    {
      role: "UI Developer",
      company: "Web Innovators",
      period: "2018 - 2020",
      location: "San Jose, CA",
      description:
        "Developed interactive UI components using React and TypeScript. Collaborated with designers on implementing pixel-perfect interfaces.",
    },
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University",
      period: "2016 - 2018",
      location: "Stanford, CA",
    },
    {
      degree: "Bachelor of Science in Web Development",
      institution: "University of California",
      period: "2012 - 2016",
      location: "Berkeley, CA",
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
interface UserDetails {
  _id: string;
  name: string;
  email: string;
  isVerified: string;
  summary: string;
  jobTitle: string;
  industry: stringl;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const [userDetails, setUsetDetails] = useState<UserDetails | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);

    // Automatically upload the image after selection
    // if (file) {
    //   await uploadProfilePicture(file);
    // }
  };

  const handleEditClick = () => {
    // Trigger file input for selecting a new image
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
        console.log(response);
        setUsetDetails(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Simulate loading
  useEffect(() => {
    handleGetUser();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setEditMode(false);
    setProfile(userProfile); // Reset to original data
    toast("Edit cancelled", {
      description: "No changes were saved",
    });
  };

  if (loading) {
    return <Loader />;
  }

  console.log(userDetails);

  return (
    <div className="flex flex-col bg-gray-50 items-center justify-center min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1 py-8 bg-gray-50 dark:bg-gray-50">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your personal and professional information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col">
                  {/* <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                      <img
                        src={profile.personal.avatar}
                        alt={profile.personal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 bg-white rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div> */}

                  <div>
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 hover:bg-gray-500 relative">
                      <label
                        htmlFor="file-upload"
                        className="inset-0 flex items-center justify-center cursor-pointer"
                      >
                        <span
                          className="text-gray-400 hover:text-gray-600 transition duration-300 cursor-pointer
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          {selectedFile ? "" : <Camera className="h-6 w-6" />}
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          name="file-upload"
                          ref={fileInputRef}
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>

                      {selectedFile ? (
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="Uploaded"
                          className="w-full h-full object-cover hover:bg-gray-500"
                          width={200}
                          height={200}
                        />
                      ) : (
                        <Image
                          src={selectedFile ?? ""}
                          alt="Default"
                          width={200}
                          height={200}
                          className="w-full h-full object-cover hover:bg-gray-500"
                        />
                      )}
                    </div>
                    <button
                      className="text-white cursor-pointer"
                      onClick={handleEditClick}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Edit Profile Picture"}
                    </button>
                  </div>
                  <div className="">
                    <h2 className="text-xl font-bold mb-1">
                      {userDetails?.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {/* {userDetails?.name.split(".")[0]} */}
                      {userDetails?.jobTitle}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="w-full space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm">{userDetails?.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm">{profile.personal.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm">{userDetails?.industry}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <Button
                    onClick={handleEdit}
                    className="w-full"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <div className="md:col-span-2">
              <Tabs defaultValue="about" className="max-w-lg">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                      <CardDescription>
                        Your personal and professional summary
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {editMode ? (
                        <Textarea
                          className="min-h-[150px]"
                          value={userDetails?.summary}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              personal: {
                                ...profile.personal,
                                about: e.target.value,
                              },
                            })
                          }
                        />
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">
                          {userDetails?.summary}
                        </p>
                      )}
                    </CardContent>
                    {editMode && (
                      <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Work Experience</span>
                        {!editMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEdit}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Your professional background
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {profile.experience.map((exp, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <h3 className="font-medium text-lg">
                                  {exp.role}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                  {exp.company}
                                </p>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
                                <Calendar className="h-4 w-4 mr-1 inline" />
                                {exp.period}
                              </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-2">
                              <MapPin className="h-4 w-4 mr-1 inline" />
                              {exp.location}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                              {exp.description}
                            </p>

                            {index < profile.experience.length - 1 && (
                              <Separator className="my-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    {editMode && (
                      <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Education</span>
                        {!editMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEdit}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Your academic background
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {profile.education.map((edu, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <h3 className="font-medium text-lg">
                                  {edu.degree}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                  {edu.institution}
                                </p>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
                                <Calendar className="h-4 w-4 mr-1 inline" />
                                {edu.period}
                              </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                              <MapPin className="h-4 w-4 mr-1 inline" />
                              {edu.location}
                            </p>

                            {index < profile.education.length - 1 && (
                              <Separator className="my-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    {editMode && (
                      <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Skills</span>
                        {!editMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEdit}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Your technical and professional skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {userDetails?.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    {editMode && (
                      <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
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

export default Profile;
