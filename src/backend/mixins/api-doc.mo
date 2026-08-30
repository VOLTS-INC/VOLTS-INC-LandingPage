mixin () {
  public query func getApiDoc() : async Text {
    "# VOLTS Backend API\n" #
    "\n" #
    "## Purpose\n" #
    "The backend is a single Motoko actor that powers the VOLTS landing page. It serves the " #
    "public business content (business info, services, team, testimonials, gallery) and " #
    "collects booking requests from visitors. Booking requests are managed by an admin " #
    "through role-guarded CRUD. The actor also exposes its persisted data through OQL " #
    "(`schema` / `execute`) and this API documentation (`getApiDoc`).\n" #
    "\n" #
    "## Public methods\n" #
    "\n" #
    "### Content (public, no auth)\n" #
    "- `getBusinessInfo() : async BusinessInfo` — the salon's name, tagline, phone, email, address and opening hours.\n" #
    "- `getServices() : async [Service]` — the list of services offered.\n" #
    "- `getTeam() : async [TeamMember]` — the team member profiles.\n" #
    "- `getTestimonials() : async [Testimonial]` — customer testimonials.\n" #
    "- `getGallery() : async [GalleryImage]` — gallery images.\n" #
    "\n" #
    "### Booking requests\n" #
    "- `submitBookingRequest(name, contact, service, preferredTime, message) : async Nat` — " #
    "any caller (including anonymous) may submit a booking request. Returns the new request's `id`. " #
    "Traps with `Name and contact details are required` if `name` or `contact` is empty.\n" #
    "- `listBookingRequests() : async [BookingRequest]` — **admin only**. Returns all booking requests.\n" #
    "- `setBookingRequestHandled(id, handled) : async ()` — **admin only**. Marks a request handled. " #
    "Traps with `Booking request not found` if `id` does not exist.\n" #
    "- `deleteBookingRequest(id) : async ()` — **admin only**. Deletes a request by `id`.\n" #
    "\n" #
    "### Authorization\n" #
    "- `_initialize_access_control() : async ()` — registers the caller. The first signed-in caller " #
    "becomes `#admin`; every subsequent caller becomes `#user`. Anonymous callers are ignored.\n" #
    "- `getCallerUserRole() : async UserRole` — returns the caller's role (`#admin`, `#user`, or `#guest` " #
    "for anonymous callers). Traps with `User is not registered` for a signed-in caller who has not registered.\n" #
    "- `assignCallerUserRole(user, role) : async ()` — **admin only**. Assigns a role to another principal. " #
    "Traps with `Unauthorized: Only admins can assign user roles` for a non-admin caller.\n" #
    "- `isCallerAdmin() : async Bool` — whether the caller is an admin.\n" #
    "- `_internet_identity_sign_in_start() : async Blob` and `_internet_identity_sign_in_finish() : async Result` — " #
    "Internet Identity sign-in flow used by the frontend.\n" #
    "\n" #
    "### Data Intelligence (OQL)\n" #
    "- `schema() : async Text` — the JSON schema of all queryable entities the caller may read.\n" #
    "- `execute(qJson : Text) : async Result` — runs an OQL query against the exposed entities.\n" #
    "\n" #
    "### Documentation\n" #
    "- `getApiDoc() : async Text` — this document.\n" #
    "\n" #
    "## Authentication and authorization\n" #
    "The app's frontend pins an Internet Identity derivation origin, published at " #
    "`/.well-known/ii-derivation-origin` when available. An agent already holding the user's " #
    "Internet Identity authorization derives the correct per-app principal against that origin " #
    "(for example `icp identity link web <name> --app <host>`). Such a delegation acts with the " #
    "user's full authority in this app until it expires.\n" #
    "\n" #
    "Registration gates role-guarded access. A direct API caller registers by calling " #
    "`_initialize_access_control` once as a signed-in caller before any role-guarded call " #
    "(guarded queries included). The first initializer receives `#admin`; subsequent callers " #
    "receive `#user`. An unregistered signed-in caller receives a trap on guarded endpoints — " #
    "`getCallerUserRole` traps with `User is not registered`, and admin-guarded methods trap with " #
    "`Unauthorized: Admin access required`. An anonymous caller receives `#guest` from " #
    "`getCallerUserRole` and is denied admin access.\n" #
    "\n" #
    "A caller can be unregistered while the app already knows it: registration happens only when " #
    "a caller signs in through the app's own frontend, so a principal that never did so is " #
    "unregistered even when it belongs to the app's owner, and a signed-in caller derived against " #
    "a different origin is a different principal than the one the frontend registered.\n" #
    "\n" #
    "## Units and encodings\n" #
    "- `id` fields are `Nat` (0-based). `nextRequestId` increments per submitted request.\n" #
    "- `createdAt` on a `BookingRequest` is a `Time.Time` value — nanoseconds since the Unix epoch " #
    "(an `Int`).\n" #
    "- `handled` on a `BookingRequest` is a `Bool`.\n" #
    "- `price` and `duration` on a `Service` are display `Text` strings (e.g. `\"$65\"`, `\"60 min\"`).\n" #
    "- `photo` on a `TeamMember` and `url` on a `GalleryImage` are absolute `Text` URLs.\n" #
    "- `openingHours` is an array of `{ days : Text; hours : Text }` records.\n" #
    "- `UserRole` is the variant `#admin`, `#user`, or `#guest`.\n" #
    "\n" #
    "## Lifecycle and polling\n" #
    "Booking requests are created via `submitBookingRequest` and transition from `handled = false` " #
    "to `handled = true` via `setBookingRequestHandled`. There is no polling endpoint; the frontend " #
    "reads the current state with `listBookingRequests` (admin) as needed. OQL `execute` is a query " #
    "and can be polled safely.\n" #
    "\n" #
    "## Mutation retry safety\n" #
    "`submitBookingRequest` is not idempotent: each call creates a new request with a fresh `id` and " #
    "increments `nextRequestId`. Retrying a submission duplicates the request. `setBookingRequestHandled` " #
    "and `deleteBookingRequest` are idempotent in effect (setting the same handled value or deleting an " #
    "already-deleted id is harmless), though `setBookingRequestHandled` traps if the id does not exist. " #
    "`deleteBookingRequest` on a missing id is a no-op.\n" #
    "\n" #
    "## Errors, traps, and limits\n" #
    "- `submitBookingRequest` traps with `Name and contact details are required` when `name` or `contact` is empty.\n" #
    "- `setBookingRequestHandled` traps with `Booking request not found` for an unknown `id`.\n" #
    "- `getCallerUserRole` traps with `User is not registered` for an unregistered signed-in caller.\n" #
    "- `assignCallerUserRole` traps with `Unauthorized: Only admins can assign user roles` for a non-admin caller.\n" #
    "- Admin-guarded methods trap with `Unauthorized: Admin access required` for a non-admin caller.\n" #
    "- `execute` traps with `OQL: invalid query — <detail>` for malformed query JSON.\n" #
    "\n" #
    "## OQL entities\n" #
    "The following persisted collections are queryable through `schema` / `execute`:\n" #
    "- `service` (public) — services.\n" #
    "- `teamMember` (public) — team members.\n" #
    "- `testimonial` (public) — testimonials.\n" #
    "- `galleryImage` (public) — gallery images.\n" #
    "- `bookingRequest` (controller-only) — booking requests; only the platform controller reads them.\n" #
    "\n" #
    "## Non-obvious gotchas\n" #
    "- `execute` is named so because `query` is a reserved keyword in Motoko.\n" #
    "- OQL `schema` and `execute` are queries and do not mutate state.\n" #
    "- The `bookingRequest` entity is controller-only: end users cannot read it through OQL; " #
    "admin reads go through `listBookingRequests`.\n"
  };
};
