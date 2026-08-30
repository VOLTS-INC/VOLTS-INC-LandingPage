import { Check, Inbox, Trash2, Undo2, Zap } from "lucide-react";
import type { BookingRequest } from "../backend";
import {
  useDeleteBookingRequest,
  useListBookingRequests,
  useSetBookingRequestHandled,
} from "../hooks/useQueries";

function formatDate(createdAt: bigint): string {
  return new Date(Number(createdAt / 1_000_000n)).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function RequestCard({ request }: { request: BookingRequest }) {
  const setHandled = useSetBookingRequestHandled();
  const deleteRequest = useDeleteBookingRequest();

  return (
    <li
      data-ocid="admininbox.card"
      className={`rounded-2xl border p-6 transition-colors ${
        request.handled
          ? "border-border bg-card/40 opacity-70"
          : "border-primary/25 bg-card shadow-elevated"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {request.name}
          </h3>
          <p className="text-sm text-muted-foreground">{request.contact}</p>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {formatDate(request.createdAt)}
        </span>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-muted-foreground">Service</dt>
          <dd>{request.service || "Not sure yet"}</dd>
        </div>
        <div>
          <dt className="font-semibold text-muted-foreground">
            Preferred time
          </dt>
          <dd>{request.preferredTime || "—"}</dd>
        </div>
      </dl>
      {request.message && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {request.message}
        </p>
      )}
      <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm font-semibold">
        <button
          type="button"
          onClick={() =>
            setHandled.mutate({ id: request.id, handled: !request.handled })
          }
          disabled={setHandled.isPending}
          data-ocid="admininbox.toggle_handled_button"
          className="lift-glow flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
        >
          {request.handled ? (
            <>
              <Undo2 className="h-4 w-4" /> Mark as new
            </>
          ) : (
            <>
              <Check className="h-4 w-4" /> Mark as handled
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => deleteRequest.mutate(request.id)}
          disabled={deleteRequest.isPending}
          data-ocid="admininbox.delete_button"
          className="lift-glow flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" /> Delete
        </button>
      </div>
    </li>
  );
}

export default function AdminInbox() {
  const { data: requests = [], isPending } = useListBookingRequests(true);

  const sorted = [...requests].sort((a, b) => {
    if (a.handled !== b.handled) return a.handled ? 1 : -1;
    return Number(b.id - a.id);
  });

  return (
    <main className="container max-w-3xl py-12">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
          <Zap className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Booking inbox
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Requests sent through the website. Confirm them by phone or email,
            then mark them handled.
          </p>
        </div>
      </div>
      {isPending ? (
        <div
          className="mt-10 flex justify-center"
          data-ocid="admininbox.loading_state"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      ) : sorted.length === 0 ? (
        <div
          data-ocid="admininbox.empty_state"
          className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground"
        >
          <Inbox className="h-10 w-10 text-primary" />
          <p className="mt-4 font-medium text-foreground">
            No booking requests yet
          </p>
          <p className="mt-1 text-sm">
            New requests from the website will show up here.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {sorted.map((request) => (
            <RequestCard key={request.id.toString()} request={request} />
          ))}
        </ul>
      )}
    </main>
  );
}
