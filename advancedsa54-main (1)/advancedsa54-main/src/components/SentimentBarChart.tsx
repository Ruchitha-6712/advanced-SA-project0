import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SentimentBarChartProps {
  data: Array<{
    category: string;
    positive: number;
    negative: number;
    neutral: number;
  }>;
}

const COLORS = {
  positive: "hsl(142, 71%, 45%)",
  negative: "hsl(0, 84%, 60%)",
  neutral: "hsl(45, 93%, 47%)",
};

export const SentimentBarChart = ({ data }: SentimentBarChartProps) => {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sentiment by Category</CardTitle>
        <CardDescription>
          Compare sentiment across different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-md)",
                }}
              />
              <Bar dataKey="positive" name="Positive" fill={COLORS.positive} radius={[0, 4, 4, 0]} />
              <Bar dataKey="negative" name="Negative" fill={COLORS.negative} radius={[0, 4, 4, 0]} />
              <Bar dataKey="neutral" name="Neutral" fill={COLORS.neutral} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
