import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type CreditHistoryEntry } from "@/lib/creditApi";

interface CreditRequestHistoryProps {
  requests: CreditHistoryEntry[];
  loading: boolean;
  error?: string | null;
}

export const CreditRequestHistory = ({ requests, loading, error }: CreditRequestHistoryProps) => {
  
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'pending') return 'text-amber-600 dark:text-amber-400';
    if (['approved', 'true', 'success', 'completed', 'done'].includes(s)) {
      return 'text-green-600 dark:text-green-400';
    }
    if (s.includes('cancel') || ['rejected', 'failed'].includes(s)) {
      return 'text-red-600 dark:text-red-400';
    }
    return 'text-muted-foreground';
  };

  const prettyStatus = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'true') return 'Approved';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Calculate totals
  const totals = {
    pending: requests
      .filter(r => r.status.toLowerCase() === 'pending')
      .reduce((sum, r) => sum + r.credits, 0),
    approved: requests
      .filter(r => ['approved', 'true', 'success', 'completed', 'done'].includes(r.status.toLowerCase()))
      .reduce((sum, r) => sum + r.credits, 0),
    cancelled: requests
      .filter(r => r.status.toLowerCase().includes('cancel') || ['rejected', 'failed'].includes(r.status.toLowerCase()))
      .reduce((sum, r) => sum + r.credits, 0),
  };

  console.log('[RENDER] CreditRequestHistory - requests:', requests.length);

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Credit Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Fetching credit request history…</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Credit Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (requests.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Credit Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No credit history found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg">Credit Request History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Table */}
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.ordernumber}>
                  <TableCell className="font-medium">{request.ordernumber}</TableCell>
                  <TableCell>{request.credits} Cr.</TableCell>
                  <TableCell className={getStatusColor(request.status)}>
                    {prettyStatus(request.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Pending Credits</p>
            <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">
              {totals.pending} Cr.
            </p>
          </div>
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Approved (True) Credits</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              {totals.approved} Cr.
            </p>
          </div>
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total Cancelled Credits</p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
              {totals.cancelled} Cr.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
