import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ArrowLeft, Inbox, LogOut, Zap } from "lucide-react";

export default function AdminBar({
  showInbox,
  onToggleInbox,
}: {
  showInbox: boolean;
  onToggleInbox: () => void;
}) {
  const { clear } = useInternetIdentity();

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            <Zap className="h-4 w-4 text-primary" />
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            Signed in as <span className="text-primary">owner</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleInbox}
            data-ocid="adminbar.inbox_button"
            className="lift-glow animate-float flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            {showInbox ? (
              <>
                <ArrowLeft className="h-4 w-4" /> Back to site
              </>
            ) : (
              <>
                <Inbox className="h-4 w-4" /> Booking inbox
              </>
            )}
          </button>
          <button
            type="button"
            onClick={clear}
            data-ocid="adminbar.signout_button"
            className="lift-glow flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
