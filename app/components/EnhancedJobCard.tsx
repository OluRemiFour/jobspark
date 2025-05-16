import React from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Briefcase, MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    skills: string[];
    match: number;
  };
  className?: string;
  style?: React.CSSProperties;
}

const EnhancedJobCard = ({ job, className, style }: JobCardProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Job saved",
      description: `${job.title} at ${job.company} has been saved to your favorites.`,
    });
  };

  const handleApply = () => {
    toast({
      title: "Application submitted",
      description: `Your application for ${job.title} at ${job.company} has been submitted.`,
      // Remove the "success" variant which is causing type errors
    });
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-all ${className}`}
      style={style}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-xl">{job.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast({
                  title: "Job favorited",
                  description: `${job.title} has been added to your favorites.`,
                });
              }}
              className="hover:text-yellow-400 transition-colors"
            >
              <Star className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{job.company}</span>
            </div>

            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{job.location}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Posted {job.posted}</span>
              </span>

              <span className="flex items-center text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>{job.salary}</span>
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Match: {job.match}%
            </p>
            <Progress value={job.match} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button
          variant="outline"
          onClick={handleSave}
          className="hover:border-jobspark-500 hover:text-jobspark-500 transition-colors"
        >
          Save
        </Button>
        <Button
          onClick={handleApply}
          className="bg-jobspark-500 hover:bg-jobspark-600 transition-colors"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnhancedJobCard;
