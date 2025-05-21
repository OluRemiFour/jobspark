"use client";
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  Briefcase,
  Check,
  CheckCircle,
  Clock,
  MessageSquare,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import AIAssistant from "../../components/AIAssistant";
import Footer from "../../components/Footer";
import { Loader } from "../../components/Loader";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";

const notifications = [
  {
    id: 1,
    type: "application",
    title: "Application Update",
    company: "Tech Solutions Inc.",
    position: "Senior Frontend Developer",
    message: "Your application has moved to the interview stage.",
    time: "2 hours ago",
    read: false,
    actionable: true,
  },
  {
    id: 2,
    type: "job",
    title: "New Job Match",
    company: "Innovate Digital",
    position: "UI/UX Developer",
    message: "A new job matching your profile has been posted.",
    time: "4 hours ago",
    read: false,
    actionable: true,
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    sender: "Sarah from HR",
    company: "Web Solutions",
    message:
      "I reviewed your portfolio and would like to schedule an interview.",
    time: "Yesterday",
    read: true,
    actionable: true,
  },
  {
    id: 4,
    type: "application",
    title: "Application Received",
    company: "Global Tech",
    position: "Frontend Engineer",
    message: "Your application has been received and is under review.",
    time: "2 days ago",
    read: true,
    actionable: false,
  },
  {
    id: 5,
    type: "system",
    title: "Profile Strength Update",
    message:
      "Your profile strength has increased to 85%. Complete your work history to reach 100%.",
    time: "3 days ago",
    read: true,
    actionable: true,
  },
  {
    id: 6,
    type: "job",
    title: "Job Alert",
    company: "Creative Solutions",
    position: "Senior React Developer",
    message: "A new job matching your saved search has been posted.",
    time: "4 days ago",
    read: true,
    actionable: true,
  },
  {
    id: 7,
    type: "message",
    title: "Interview Request",
    sender: "John from Recruitment",
    company: "Tech Innovations",
    message: "Would you be available for an interview next Tuesday at 2 PM?",
    time: "5 days ago",
    read: true,
    actionable: true,
  },
];

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = allNotifications.filter((notification) => {
    // Filter by type
    if (filter !== "all" && notification.type !== filter) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !(
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notification.company &&
          notification.company
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (notification.position &&
          notification.position
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
      )
    ) {
      return false;
    }

    return true;
  });

  const markAllAsRead = () => {
    setAllNotifications(
      allNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id: number) => {
    setAllNotifications(
      allNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAll = () => {
    setAllNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case "job":
        return <AlertCircle className="h-5 w-5 text-green-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationTime = (time: string) => {
    return (
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Clock className="h-3 w-3 mr-1" />
        {time}
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col bg-gray-50 items-center justify-center min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1 py-8 bg-gray-50 dark:bg-gray-50">
        <div className="container max-w-4xl">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                Notifications
                {allNotifications.filter((n) => !n.read).length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  >
                    {allNotifications.filter((n) => !n.read).length} New
                  </Badge>
                )}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Stay updated with your job applications and messages
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#f9f9f9]">
                  <DropdownMenuLabel>Notification Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    <span>Email Notifications</span>
                    <Switch defaultChecked />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    <span>Push Notifications</span>
                    <Switch defaultChecked />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    <span>SMS Notifications</span>
                    <Switch />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearAll}
                    className="text-red-500 dark:text-red-400"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <ToggleGroup
                    type="single"
                    defaultValue="all"
                    onValueChange={(value) => value && setFilter(value)}
                  >
                    <ToggleGroupItem value="all" aria-label="All">
                      All
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="application"
                      aria-label="Applications"
                    >
                      <Briefcase className="h-4 w-4 mr-1" />
                      Applications
                    </ToggleGroupItem>
                    <ToggleGroupItem value="job" aria-label="Jobs">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Jobs
                    </ToggleGroupItem>
                    <ToggleGroupItem value="message" aria-label="Messages">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Messages
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="py-10 flex flex-col items-center justify-center text-center">
                  <Bell className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No notifications</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    {searchTerm || filter !== "all"
                      ? "No notifications match your current filters. Try adjusting your search or filters."
                      : "You're all caught up! We'll notify you when something new arrives."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all duration-200 ${
                    !notification.read ? "border-l-4 border-l-jobspark-500" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1">
                          <h3 className="font-medium text-base sm:text-lg">
                            {notification.title}
                            {!notification.read && (
                              <Badge className="ml-2 bg-jobspark-100 text-jobspark-700 dark:bg-jobspark-900/30 dark:text-jobspark-300">
                                New
                              </Badge>
                            )}
                          </h3>
                          {getNotificationTime(notification.time)}
                        </div>

                        {notification.type === "application" && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {notification.position} at {notification.company}
                          </div>
                        )}

                        {notification.type === "job" && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {notification.position} at {notification.company}
                          </div>
                        )}

                        {notification.type === "message" && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            From: {notification.sender} at{" "}
                            {notification.company}
                          </div>
                        )}

                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {notification.message}
                        </p>

                        <div className="mt-3 flex justify-between items-center">
                          {notification.actionable ? (
                            <Button
                              size="sm"
                              className="bg-jobspark-500 hover:bg-jobspark-600"
                            >
                              {notification.type === "application" &&
                                "View Application"}
                              {notification.type === "job" && "View Job"}
                              {notification.type === "message" && "Reply"}
                              {notification.type === "system" && "Take Action"}
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Button>
                          ) : (
                            <div></div>
                          )}

                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Notifications;
