import { UserRole, type backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  __accessControlState: async () => undefined,
  __bookingRequests: async () => [],
  __businessInfo: async () => ({
    name: "VOLTS",
    tagline: "Powering the next wave of intelligent technology",
    phone: "+1 (555) 010-2030",
    email: "hello@volts.tech",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    openingHours: [
      { days: "Mon - Fri", hours: "9:00 AM - 6:00 PM" },
      { days: "Sat", hours: "10:00 AM - 4:00 PM" },
    ],
  }),
  __gallery: async () => [
    { id: BigInt(1), url: "https://picsum.photos/seed/volts1/800/600", caption: "Quantum compute lab" },
    { id: BigInt(2), url: "https://picsum.photos/seed/volts2/800/600", caption: "Neural interface studio" },
    { id: BigInt(3), url: "https://picsum.photos/seed/volts3/800/600", caption: "Energy grid control room" },
  ],
  __nextRequestId: async () => BigInt(1),
  __services: async () => [
    { id: BigInt(1), name: "AI Infrastructure", description: "Scalable machine-learning platforms built for the enterprise.", price: "Custom", duration: "Ongoing" },
    { id: BigInt(2), name: "Cloud Engineering", description: "Resilient, cost-optimized cloud architectures.", price: "Custom", duration: "Ongoing" },
    { id: BigInt(3), name: "Data Intelligence", description: "Turn raw data into decisions with real-time analytics.", price: "Custom", duration: "Ongoing" },
  ],
  __team: async () => [
    { id: BigInt(1), name: "Ada Volkov", role: "Chief Executive Officer", bio: "Visionary leader scaling frontier technology.", photo: "https://picsum.photos/seed/ada/400/400" },
    { id: BigInt(2), name: "Marcus Chen", role: "Chief Technology Officer", bio: "Architect of our core AI platforms.", photo: "https://picsum.photos/seed/marcus/400/400" },
    { id: BigInt(3), name: "Priya Nair", role: "Head of Design", bio: "Crafting premium, human-centered experiences.", photo: "https://picsum.photos/seed/priya/400/400" },
  ],
  __testimonials: async () => [
    { id: BigInt(1), author: "Sofia Reyes", quote: "VOLTS transformed how we scale our data platform. Truly world-class." },
    { id: BigInt(2), author: "David Okafor", quote: "The most forward-thinking engineering team we've partnered with." },
  ],
  _initialize_access_control: async () => undefined,
  _internet_identity_sign_in_finish: async () => ({ __kind__: "ok", ok: null }),
  _internet_identity_sign_in_start: async () => new Uint8Array(),
  assignCallerUserRole: async () => undefined,
  deleteBookingRequest: async () => undefined,
  execute: async () => ({
    hasMore: false,
    rows: [
      [
        { name: "name", value: { __kind__: "text", text: "AI Infrastructure" } },
        { name: "description", value: { __kind__: "text", text: "Scalable machine-learning platforms built for the enterprise." } },
        { name: "price", value: { __kind__: "text", text: "Custom" } },
      ],
      [
        { name: "name", value: { __kind__: "text", text: "Cloud Engineering" } },
        { name: "description", value: { __kind__: "text", text: "Resilient, cost-optimized cloud architectures." } },
        { name: "price", value: { __kind__: "text", text: "Custom" } },
      ],
    ],
  }),
  getApiDoc: async () =>
    [
      "# VOLTS Data Intelligence API",
      "",
      "Query the VOLTS platform data with a JSON query language.",
      "",
      "## Tables",
      "",
      "- `services` — the services VOLTS offers (columns: `id`, `name`, `description`, `price`, `duration`)",
      "- `team` — the VOLTS leadership team (columns: `id`, `name`, `role`, `bio`, `photo`)",
      "- `testimonials` — client testimonials (columns: `id`, `author`, `quote`)",
      "- `gallery` — the VOLTS showcase gallery (columns: `id`, `url`, `caption`)",
      "",
      "## Example",
      "",
      "```json",
      '{ "table": "services", "filter": { "price": "Custom" }, "order": { "name": "asc" } }',
      "```",
      "",
      "Call `execute` with a JSON query string to receive rows back.",
    ].join("\n"),
  getBusinessInfo: async () => ({
    name: "VOLTS",
    tagline: "Powering the next wave of intelligent technology",
    phone: "+1 (555) 010-2030",
    email: "hello@volts.tech",
    address: "1600 Amphitheatre Parkway, Mountain View, CA",
    openingHours: [
      { days: "Mon - Fri", hours: "9:00 AM - 6:00 PM" },
      { days: "Sat", hours: "10:00 AM - 4:00 PM" },
    ],
  }),
  getCallerUserRole: async () => UserRole.guest,
  getGallery: async () => [
    { id: BigInt(1), url: "https://picsum.photos/seed/volts1/800/600", caption: "Quantum compute lab" },
    { id: BigInt(2), url: "https://picsum.photos/seed/volts2/800/600", caption: "Neural interface studio" },
    { id: BigInt(3), url: "https://picsum.photos/seed/volts3/800/600", caption: "Energy grid control room" },
  ],
  getServices: async () => [
    { id: BigInt(1), name: "AI Infrastructure", description: "Scalable machine-learning platforms built for the enterprise.", price: "Custom", duration: "Ongoing" },
    { id: BigInt(2), name: "Cloud Engineering", description: "Resilient, cost-optimized cloud architectures.", price: "Custom", duration: "Ongoing" },
    { id: BigInt(3), name: "Data Intelligence", description: "Turn raw data into decisions with real-time analytics.", price: "Custom", duration: "Ongoing" },
  ],
  getTeam: async () => [
    { id: BigInt(1), name: "Ada Volkov", role: "Chief Executive Officer", bio: "Visionary leader scaling frontier technology.", photo: "https://picsum.photos/seed/ada/400/400" },
    { id: BigInt(2), name: "Marcus Chen", role: "Chief Technology Officer", bio: "Architect of our core AI platforms.", photo: "https://picsum.photos/seed/marcus/400/400" },
    { id: BigInt(3), name: "Priya Nair", role: "Head of Design", bio: "Crafting premium, human-centered experiences.", photo: "https://picsum.photos/seed/priya/400/400" },
  ],
  getTestimonials: async () => [
    { id: BigInt(1), author: "Sofia Reyes", quote: "VOLTS transformed how we scale our data platform. Truly world-class." },
    { id: BigInt(2), author: "David Okafor", quote: "The most forward-thinking engineering team we've partnered with." },
  ],
  isCallerAdmin: async () => false,
  listBookingRequests: async () => [],
  schema: async () =>
    JSON.stringify(
      {
        tables: [
          {
            name: "services",
            columns: [
              { name: "id", type: "nat" },
              { name: "name", type: "text" },
              { name: "description", type: "text" },
              { name: "price", type: "text" },
              { name: "duration", type: "text" },
            ],
          },
          {
            name: "team",
            columns: [
              { name: "id", type: "nat" },
              { name: "name", type: "text" },
              { name: "role", type: "text" },
              { name: "bio", type: "text" },
              { name: "photo", type: "text" },
            ],
          },
          {
            name: "testimonials",
            columns: [
              { name: "id", type: "nat" },
              { name: "author", type: "text" },
              { name: "quote", type: "text" },
            ],
          },
          {
            name: "gallery",
            columns: [
              { name: "id", type: "nat" },
              { name: "url", type: "text" },
              { name: "caption", type: "text" },
            ],
          },
        ],
      },
      null,
      2
    ),
  setBookingRequestHandled: async () => undefined,
  submitBookingRequest: async () => BigInt(1),
};
