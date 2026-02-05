import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "positive" | "negative" | "neutral";
}

const variantStyles = {
  default: "bg-card border-border",
  positive: "bg-sentiment-positive-light border-sentiment-positive/20",
  negative: "bg-sentiment-negative-light border-sentiment-negative/20",
  neutral: "bg-sentiment-neutral-light border-sentiment-neutral/20",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  positive: "bg-sentiment-positive/20 text-sentiment-positive",
  negative: "bg-sentiment-negative/20 text-sentiment-negative",
  neutral: "bg-sentiment-neutral/20 text-sentiment-neutral",
};

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border p-6 shadow-soft transition-all duration-300 hover:shadow-medium",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconStyles[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <span
            className={cn(
              "text-sm font-medium",
              trend.value >= 0 ? "text-sentiment-positive" : "text-sentiment-negative"
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            {trend.label}
          </span>
        </div>
      )}
    </div>
  );
};
