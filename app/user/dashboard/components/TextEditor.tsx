import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/app/lib/utils";
import React from "react";
// import { Textarea } from "@/components/ui/textarea";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full p-4 font-mono text-sm border border-gray-200 resize-none",
        className
      )}
      rows={20}
      placeholder="Enter your cover letter content here..."
    />
  );
};

export default TextEditor;
