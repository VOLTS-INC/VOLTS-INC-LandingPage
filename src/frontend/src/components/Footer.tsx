import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Zap } from "lucide-react";
import { useIsCallerAdmin } from "../hooks/useQueries";

export default function Footer({
  onOwnerSignIn,
}: {
  onOwnerSignIn: () => void;
}) {
  const { identity, clear } = useInternetIdentity();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const isAuthenticated = !!identity;

  return (
    <footer className="border-t border-border bg-card">
      <div className="container flex flex-col gap-8 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Zap className="h-4 w-4" fill="currentColor" />
              </span>
              <span className="font-display text-lg font-bold tracking-[0.18em] text-foreground">
                VOLTS
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Powering the next era of clean, connected energy.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} VOLTS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {isAuthenticated && !isAdmin && (
              <span className="text-muted-foreground/70">
                Signed in (not the owner)
              </span>
            )}
            {isAuthenticated ? (
              <button
                type="button"
                data-ocid="footer.sign_out"
                onClick={clear}
                className="font-semibold text-foreground underline-offset-4 transition-smooth hover:text-primary hover:underline"
              >
                Sign out
              </button>
            ) : (
              <button
                type="button"
                data-ocid="footer.owner_sign_in"
                onClick={onOwnerSignIn}
                className="font-semibold text-foreground underline-offset-4 transition-smooth hover:text-primary hover:underline"
              >
                Owner sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
