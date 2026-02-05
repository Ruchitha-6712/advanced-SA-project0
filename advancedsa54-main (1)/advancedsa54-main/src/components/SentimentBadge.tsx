import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type SentimentType = "positive" | "negative" | "neutral";

interface SentimentBadgeProps {
  sentiment: SentimentType;
  score?: number;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const sentimentConfig = {
  positive: {
    label: "Positive",
    icon: TrendingUp,
    className: "sentiment-positive border",
  },
  negative: {
    label: "Negative",
    icon: TrendingDown,
    className: "sentiment-negative border",
  },
  neutral: {
    label: "Neutral",
    icon: Minus,
    className: "sentiment-neutral border",
  },
};

const sizeConfig = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-3 py-1 gap-1.5",
  lg: "text-base px-4 py-1.5 gap-2",
};

export const SentimentBadge = ({ 
  sentiment, 
  score, 
  showIcon = true,
  size = "md" 
}: SentimentBadgeProps) => {
  const config = sentimentConfig[sentiment];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        config.className,
        sizeConfig[size]
      )}
    >
      {showIcon && <Icon className={cn(
        size === "sm" && "w-3 h-3",
        size === "md" && "w-4 h-4",
        size === "lg" && "w-5 h-5"
      )} />}
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="opacity-75">({(score * 100).toFixed(0)}%)</span>
      )}
    </span>
  );
};
