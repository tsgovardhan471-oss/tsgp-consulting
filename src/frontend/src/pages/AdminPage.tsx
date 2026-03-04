import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useDeleteInquiry,
  useGetAllInquiries,
  useIsCallerAdmin,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  LogIn,
  LogOut,
  RefreshCcw,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Inquiry, InquiryId } from "../backend.d";

/* ─── Sector badge ─────────────────────────────────────────── */
function SectorBadge({ sector }: { sector: string }) {
  const colors: Record<string, string> = {
    NBFC: "bg-amber-100 text-amber-800 border-amber-200",
    BFSI: "bg-blue-100 text-blue-800 border-blue-200",
    BPO: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Other: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colors[sector] ?? colors.Other}`}
    >
      {sector}
    </span>
  );
}

/* ─── Delete confirm ───────────────────────────────────────── */
function DeleteButton({ id, index }: { id: InquiryId; index: number }) {
  const deleteMutation = useDeleteInquiry();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Inquiry deleted.");
    } catch {
      toast.error("Failed to delete inquiry.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
          data-ocid={`admin.delete_button.${index}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-ocid="admin.dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Inquiry?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove this inquiry. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-ocid="admin.cancel_button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-ocid="admin.confirm_button"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/* ─── Inquiry table ─────────────────────────────────────────── */
function InquiryTable({ inquiries }: { inquiries: Inquiry[] }) {
  if (inquiries.length === 0) {
    return (
      <div
        className="text-center py-20 text-muted-foreground"
        data-ocid="admin.empty_state"
      >
        <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">No inquiries yet</p>
        <p className="text-sm mt-1">Submitted inquiries will appear here.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-border overflow-hidden"
      data-ocid="admin.table"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold text-foreground">#</TableHead>
            <TableHead className="font-semibold text-foreground">
              Name
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Company
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Sector
            </TableHead>
            <TableHead className="font-semibold text-foreground text-right">
              Staff
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Message
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Date
            </TableHead>
            <TableHead className="font-semibold text-foreground text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inq, i) => (
            <TableRow
              key={inq.id.toString()}
              className="hover:bg-muted/30 transition-colors"
              data-ocid={`admin.row.${i + 1}`}
            >
              <TableCell className="text-muted-foreground text-sm">
                {i + 1}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {inq.name}
              </TableCell>
              <TableCell className="text-foreground">{inq.company}</TableCell>
              <TableCell>
                <SectorBadge sector={inq.sector} />
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {inq.staffCount.toString()}
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {inq.message || "—"}
                </p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                {new Date(Number(inq.timestamp)).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                <DeleteButton id={inq.id} index={i + 1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ─── Admin Page ────────────────────────────────────────────── */
export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const {
    data: inquiries,
    isLoading: inquiriesLoading,
    refetch,
  } = useGetAllInquiries();

  const principal = identity?.getPrincipal().toString();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              data-ocid="admin.link"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/tsg-logo-mark-transparent.dim_120x120.png"
                alt="TSG"
                className="h-7 w-7 object-contain"
              />
              <span className="font-display font-bold text-foreground text-sm">
                TSG Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <p className="hidden sm:block text-xs text-muted-foreground font-mono truncate max-w-32">
                {principal?.slice(0, 12)}...
              </p>
            )}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="rounded-full gap-2"
                data-ocid="admin.secondary_button"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                disabled={isLoggingIn || isInitializing}
                className="bg-navy-deep hover:bg-navy-mid text-white rounded-full gap-2"
                data-ocid="admin.primary_button"
              >
                <LogIn className="h-4 w-4" />
                {isLoggingIn ? "Connecting..." : "Login"}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Not logged in */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="admin.panel"
          >
            <div className="w-20 h-20 rounded-full bg-navy-deep/10 flex items-center justify-center mb-6">
              <ShieldAlert className="h-10 w-10 text-navy-deep" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Admin Login Required
            </h2>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Sign in with your Internet Identity to access the TSGP Consulting
              admin dashboard and manage inquiries.
            </p>
            <Button
              onClick={() => login()}
              disabled={isLoggingIn}
              size="lg"
              className="bg-navy-deep hover:bg-navy-mid text-white rounded-full px-8 gap-2"
              data-ocid="admin.primary_button"
            >
              <LogIn className="h-5 w-5" />
              {isLoggingIn ? "Connecting..." : "Login with Internet Identity"}
            </Button>
          </motion.div>
        )}

        {/* Logged in but checking admin */}
        {isLoggedIn && adminLoading && (
          <div className="py-10 space-y-4" data-ocid="admin.loading_state">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
            <div className="mt-8 space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        )}

        {/* Not admin */}
        {isLoggedIn && !adminLoading && !isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="admin.error_state"
          >
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Access Denied
            </h2>
            <p className="text-muted-foreground max-w-sm mb-2 leading-relaxed">
              Your account does not have administrator privileges for TSG
              Consulting.
            </p>
            <p className="text-xs text-muted-foreground/60 mb-8 font-mono">
              {principal}
            </p>
            <Button
              variant="outline"
              onClick={clear}
              className="rounded-full gap-2"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </motion.div>
        )}

        {/* Admin dashboard */}
        {isLoggedIn && !adminLoading && isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Page title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Inquiries Dashboard
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {inquiries?.length ?? 0} total inquiries received
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="rounded-full gap-2 self-start sm:self-auto"
                data-ocid="admin.secondary_button"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {(["NBFC", "BFSI", "BPO", "Other"] as const).map((sector) => {
                const count =
                  inquiries?.filter((i) => i.sector === sector).length ?? 0;
                return (
                  <div
                    key={sector}
                    className="bg-card border border-border rounded-xl p-5"
                  >
                    <SectorBadge sector={sector} />
                    <p className="font-display text-2xl font-bold text-foreground mt-3">
                      {count}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      inquiries
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            {inquiriesLoading ? (
              <div className="space-y-2" data-ocid="admin.loading_state">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            ) : (
              <InquiryTable inquiries={inquiries ?? []} />
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
