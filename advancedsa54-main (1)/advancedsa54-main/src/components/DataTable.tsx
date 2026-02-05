import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SentimentBadge, SentimentType } from "./SentimentBadge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface DataRow {
  id: string | number;
  text: string;
  sentiment: SentimentType;
  score: number;
  category?: string;
}

interface DataTableProps {
  data: DataRow[];
  maxHeight?: string;
}

export const DataTable = ({ data, maxHeight = "400px" }: DataTableProps) => {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Analysis Results</CardTitle>
        <CardDescription>
          Showing {data.length.toLocaleString()} analyzed entries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea style={{ height: maxHeight }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead className="min-w-[300px]">Text</TableHead>
                <TableHead className="w-32">Sentiment</TableHead>
                <TableHead className="w-24 text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow 
                  key={row.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-mono text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate" title={row.text}>
                      {row.text}
                    </p>
                  </TableCell>
                  <TableCell>
                    <SentimentBadge sentiment={row.sentiment} size="sm" />
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {(row.score * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
