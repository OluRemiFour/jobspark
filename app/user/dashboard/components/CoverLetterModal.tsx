import React, { useEffect, useState } from "react";
import { FileText, Download, Edit, Save } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import TextEditor from "./TextEditor";

interface CoverLetterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aiCoverLetter: string;
  initialContent: string;
  generatingType: string;
}

const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  open,
  onOpenChange,
  generatingType,
  aiCoverLetter,
  initialContent = aiCoverLetter,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleDownload = () => {
    // Create a blob with the text content
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element to trigger download
    const a = document.createElement("a");
    a.href = url;
    // a.download = "cover-letter.txt";
    a.download = `${generatingType}.txt`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: `Your ${generatingType} has been downloaded successfully.`,
    });
  };
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Saved!",
      description: "Your cover letter has been saved successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[70vh] flex flex-col p-0 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-black text-white p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {generatingType === "coverletter" ? (
              <h2 className="text-lg font-medium">Cover Letter</h2>
            ) : (
              <h2 className="text-lg font-medium">Resume</h2>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-gray-100 border border-gray-300 flex items-center gap-2"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-gray-100 border border-gray-300 flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-black hover:bg-gray-100 border border-gray-300 flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="edit" disabled={!isEditing}>
                Edit
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="preview"
              className="bg-white p-6 border border-gray-200 rounded-md min-h-[60vh]"
            >
              <div className="whitespace-pre-line text-left">{content}</div>
            </TabsContent>
            <TabsContent value="edit">
              <TextEditor
                value={content}
                onChange={setContent}
                className="min-h-[60vh]"
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterModal;
