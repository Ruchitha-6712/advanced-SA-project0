import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SentimentChartProps {
  data: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

const COLORS = {
  positive: "hsl(142, 71%, 45%)",
  negative: "hsl(0, 84%, 60%)",
  neutral: "hsl(45, 93%, 47%)",
};

export const SentimentChart = ({ data }: SentimentChartProps) => {
  const chartData = [
    { name: "Positive", value: data.positive, color: COLORS.positive },
    { name: "Negative", value: data.negative, color: COLORS.negative },
    { name: "Neutral", value: data.neutral, color: COLORS.neutral },
  ];

  const total = data.positive + data.negative + data.neutral;

  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sentiment Distribution</CardTitle>
        <CardDescription>
          Overall sentiment breakdown of {total.toLocaleString()} entries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-md)",
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
                  "Count",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
