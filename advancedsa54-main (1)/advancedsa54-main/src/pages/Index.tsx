import { FileUpload } from "@/components/FileUpload";
import { StatsCard } from "@/components/StatsCard";
import { SentimentChart } from "@/components/SentimentChart";
import { SentimentBarChart } from "@/components/SentimentBarChart";
import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import { useSentimentAnalysis } from "@/hooks/useSentimentAnalysis";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  RefreshCcw,
  Download,
  Sparkles
} from "lucide-react";

const Index = () => {
  const { isAnalyzing, result, error, analyzeFile, reset } = useSentimentAnalysis();

  const handleExport = () => {
    if (!result) return;
    
    const csvContent = [
      ["ID", "Text", "Sentiment", "Score"],
      ...result.data.map(row => [
        row.id,
        `"${row.text.replace(/"/g, '""')}"`,
        row.sentiment,
        row.score.toFixed(4)
      ])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sentiment_analysis_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {!result ? (
          // Upload Section
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                ML-Powered Analysis
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Analyze Sentiment from
                <span className="gradient-text block">Social Media Data</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Upload your CSV file containing text data and get instant sentiment analysis with beautiful visualizations.
              </p>
            </div>
            
            <FileUpload 
              onFileSelect={analyzeFile} 
              isProcessing={isAnalyzing}
            />
            
            {error && (
              <div className="p-4 rounded-lg bg-sentiment-negative-light border border-sentiment-negative/20 text-sentiment-negative text-center">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium">Upload CSV</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drop your dataset with text column
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-sentiment-positive/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sentiment-positive" />
                </div>
                <h3 className="font-medium">AI Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ML models classify sentiment
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-chart-5/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-chart-5" />
                </div>
                <h3 className="font-medium">Visualize</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Interactive charts & insights
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Results Dashboard
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Analysis Results</h2>
                <p className="text-muted-foreground">
                  {result.stats.total.toLocaleString()} entries analyzed
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={reset}>
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
                <Button onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Analyzed"
                value={result.stats.total.toLocaleString()}
                subtitle="Text entries"
                icon={MessageSquare}
              />
              <StatsCard
                title="Positive"
                value={result.stats.positive.toLocaleString()}
                subtitle={`${((result.stats.positive / result.stats.total) * 100).toFixed(1)}% of total`}
                icon={TrendingUp}
                variant="positive"
              />
              <StatsCard
                title="Negative"
                value={result.stats.negative.toLocaleString()}
                subtitle={`${((result.stats.negative / result.stats.total) * 100).toFixed(1)}% of total`}
                icon={TrendingDown}
                variant="negative"
              />
              <StatsCard
                title="Neutral"
                value={result.stats.neutral.toLocaleString()}
                subtitle={`${((result.stats.neutral / result.stats.total) * 100).toFixed(1)}% of total`}
                icon={Minus}
                variant="neutral"
              />
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SentimentChart data={result.stats} />
              <SentimentBarChart data={result.categoryBreakdown} />
            </div>
            
            {/* Data Table */}
            <DataTable data={result.data} maxHeight="500px" />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 mt-auto">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>Advanced Sentiment Analysis Dashboard • Ready to connect to your Python backend</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
