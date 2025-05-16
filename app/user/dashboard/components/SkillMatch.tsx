import { cn } from "../../../lib/utils";

interface SkillMatchProps {
  skill: string;
  matchPercentage: number;
  className?: string;
}

export function SkillMatch({
  skill,
  matchPercentage,
  className,
}: SkillMatchProps) {
  // Determine color based on match percentage
  const getColor = () => {
    if (matchPercentage >= 80) return "bg-black";
    if (matchPercentage >= 60) return "bg-zinc-600";
    return "bg-zinc-400";
  };

  return (
    <div className={cn("w-full mb-2", className)}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-zinc-900">{skill}</span>
        <span className="text-sm font-medium text-zinc-900">
          {matchPercentage}%
        </span>
      </div>
      <div className="w-full bg-zinc-200 rounded-full h-2">
        <div
          className={`${getColor()} h-2 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${matchPercentage}%` }}
        />
      </div>
    </div>
  );
}
