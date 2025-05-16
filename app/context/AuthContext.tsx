"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "../hooks/use-toast";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
type User = {
  // id: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  skills?: string[];
  jobTitle?: string;
  yearsOfExperience?: string;
  industry?: string;
  summary?: string;
};
interface VerifyRequest {
  email: string;
  otp: string;
}

interface UserData {
  name: string;
  email: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    userData: Partial<User>
  ) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  verifyUser: (payload: VerifyRequest) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("jobspark_userData");
        const token = getCookie("token");

        if (storedUser && token) {
          // Verify token is still valid
          setUser(JSON.parse(storedUser));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      if (!email.includes("@")) {
        throw new Error("Invalid email format.");
      }

      const response = await axios.post(
        "https://jobai-0obv.onrender.com/api/v1/auth/login",
        { email, password }
      );

      if (response.data) {
        toast({
          title: "Login successful",
          description: "Welcome back to JobSpark AI!",
          className: "bg-[#f9f9f9]",
        });

        const userData: UserData = {
          name: email.split("@")[0],
          email,
          // skills,
        };

        // console.log(response.data);

        // Store both user data and token
        setUser(userData);
        localStorage.setItem("jobspark_userData", JSON.stringify(userData));

        setCookie("token", response.data.token, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 1, // 1 day
        });

        navigate.push("/user/dashboard");
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
          errorMessage = serverMessage || "Incorrect email or password.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try later.";
        } else {
          errorMessage = serverMessage || errorMessage;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    userData: Partial<User>
  ) => {
    try {
      setIsLoading(true);

      // Basic validation
      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }

      const newUser = {
        name: userData.name || "",
        email,
        password,
        confirmPassword: userData.confirmPassword || "",
        skills: (userData.skills as string[]) || [],
        jobTitle: userData.jobTitle || "",
        yearsOfExperience: userData.yearsOfExperience || "",
        industry: userData.industry || "",
        summary: userData.summary || "",
      };

      const response = await axios.post("/api/signup", newUser);
      if (response.data.success) {
        toast({
          title: "Registration successful",
          description:
            response.data.message || "Kindly check your email for verification",
          className: "bg-[#f9f9f9]",
        });

        if (response.data.data?.needsVerification) {
          // localStorage.setItem("jobspark_verifyUser", "1");
          localStorage.setItem("jobspark_verifyEmail", email);
        } else {
          navigate.push("/user/login");
        }

        return response.data;
      }

      throw new Error(response.data.message || "Signup failed");
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
        className: "bg-[#f9f9f9]",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyUser = async (payload: VerifyRequest) => {
    try {
      const response = await axios.post("/api/verify-email", payload);

      const verifiedUser = response.data;

      setUser(verifiedUser);
      localStorage.setItem("jobspark_user", JSON.stringify(verifiedUser));
      navigate.push("/user/dashboard");

      setTimeout(() => {
        toast({
          title: "Login successful",
          description: "Welcome to JobSpark AI!",
          className: "bg-[#f9f9f9]",
        });
      }, 2000);
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jobspark_user");
    localStorage.removeItem("jobspark_verifyEmail");
    localStorage.removeItem("jobspark_userData");
    deleteCookie("token");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      className: "bg-[#f9f9f9]",
    });
    navigate.push("/login");
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("jobspark_user", JSON.stringify(updatedUser));

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        verifyUser,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
