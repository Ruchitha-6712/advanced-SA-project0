import { useState, useCallback } from "react";
import { SentimentType } from "@/components/SentimentBadge";
import { DataRow } from "@/components/DataTable";

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

interface AnalysisResult {
  data: DataRow[];
  stats: SentimentStats;
  categoryBreakdown: Array<{
    category: string;
    positive: number;
    negative: number;
    neutral: number;
  }>;
}

// Mock sentiment analysis - Replace with actual API call to your Python backend
const analyzeSentiment = (text: string): { sentiment: SentimentType; score: number } => {
  // Simple mock logic - replace with actual API call
  const words = text.toLowerCase();
  const positiveWords = ["good", "great", "excellent", "amazing", "love", "happy", "best", "wonderful", "fantastic", "perfect"];
  const negativeWords = ["bad", "terrible", "awful", "hate", "worst", "horrible", "poor", "disappointing", "annoying", "ugly"];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (words.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (words.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) {
    return { sentiment: "positive", score: 0.7 + Math.random() * 0.3 };
  } else if (negativeCount > positiveCount) {
    return { sentiment: "negative", score: 0.7 + Math.random() * 0.3 };
  } else {
    return { sentiment: "neutral", score: 0.5 + Math.random() * 0.2 };
  }
};

const parseCSV = (csvText: string): string[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  // Skip header if it looks like one
  const startIndex = lines[0]?.toLowerCase().includes('text') ? 1 : 0;
  return lines.slice(startIndex).map(line => {
    // Handle quoted strings
    if (line.startsWith('"')) {
      const match = line.match(/"([^"]+)"/);
      return match ? match[1] : line;
    }
    // Get first column
    return line.split(',')[0]?.trim() || line;
  });
};

export const useSentimentAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeFile = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const text = await file.text();
      const texts = parseCSV(text);

      if (texts.length === 0) {
        throw new Error("No valid text data found in the CSV file");
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const analyzedData: DataRow[] = texts.map((text, index) => {
        const { sentiment, score } = analyzeSentiment(text);
        return {
          id: index + 1,
          text,
          sentiment,
          score,
        };
      });

      const stats: SentimentStats = {
        positive: analyzedData.filter(d => d.sentiment === "positive").length,
        negative: analyzedData.filter(d => d.sentiment === "negative").length,
        neutral: analyzedData.filter(d => d.sentiment === "neutral").length,
        total: analyzedData.length,
      };

      // Mock category breakdown
      const categoryBreakdown = [
        { category: "Products", positive: Math.round(stats.positive * 0.4), negative: Math.round(stats.negative * 0.3), neutral: Math.round(stats.neutral * 0.5) },
        { category: "Services", positive: Math.round(stats.positive * 0.35), negative: Math.round(stats.negative * 0.4), neutral: Math.round(stats.neutral * 0.3) },
        { category: "Support", positive: Math.round(stats.positive * 0.25), negative: Math.round(stats.negative * 0.3), neutral: Math.round(stats.neutral * 0.2) },
      ];

      setResult({
        data: analyzedData,
        stats,
        categoryBreakdown,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze file");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isAnalyzing,
    result,
    error,
    analyzeFile,
    reset,
  };
};
