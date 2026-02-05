import { Activity, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">SentimentIQ</h1>
            <p className="text-xs text-muted-foreground">Advanced Sentiment Analysis</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Documentation</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};
