import { useCallback, useState } from "react";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
  acceptedFormats?: string;
}

export const FileUpload = ({ 
  onFileSelect, 
  isProcessing = false,
  acceptedFormats = ".csv"
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
          "hover:border-primary/50 hover:bg-primary/5",
          dragActive && "border-primary bg-primary/10 scale-[1.02]",
          selectedFile && !isProcessing && "border-sentiment-positive bg-sentiment-positive-light",
          isProcessing && "border-primary bg-primary/5 animate-pulse-soft",
          !selectedFile && !dragActive && "border-muted-foreground/25 bg-card"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={acceptedFormats}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {selectedFile ? (
            <>
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                isProcessing ? "bg-primary/20" : "bg-sentiment-positive-light"
              )}>
                {isProcessing ? (
                  <Upload className="w-8 h-8 text-primary animate-bounce" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-sentiment-positive" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isProcessing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Drop your CSV file here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Supports CSV files with text data</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
