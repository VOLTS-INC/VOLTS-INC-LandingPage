import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose       "mo:caffeineai-oql/Expose";
import Entity       "mo:caffeineai-oql/Entity";
import MapEntity    "mo:caffeineai-oql/MapEntity";
import ArrayEntity  "mo:caffeineai-oql/ArrayEntity";
import RecordValue  "mo:caffeineai-oql/RecordValue";
import NatValue     "mo:caffeineai-oql/NatValue";
import TextValue    "mo:caffeineai-oql/TextValue";
import BoolValue    "mo:caffeineai-oql/BoolValue";
import IntValue     "mo:caffeineai-oql/IntValue";
import ApiDocMixin  "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);
  include ApiDocMixin();

  type DayHours = {
    days : Text;
    hours : Text;
  };

  type BusinessInfo = {
    name : Text;
    tagline : Text;
    phone : Text;
    email : Text;
    address : Text;
    openingHours : [DayHours];
  };

  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    price : Text;
    duration : Text;
  };

  type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
    photo : Text;
  };

  type Testimonial = {
    id : Nat;
    author : Text;
    quote : Text;
  };

  type GalleryImage = {
    id : Nat;
    url : Text;
    caption : Text;
  };

  type BookingRequest = {
    id : Nat;
    name : Text;
    contact : Text;
    service : Text;
    preferredTime : Text;
    message : Text;
    createdAt : Time.Time;
    handled : Bool;
  };

  let businessInfo : BusinessInfo;
  let services : [Service];
  let team : [TeamMember];
  let testimonials : [Testimonial];
  let gallery : [GalleryImage];
  let bookingRequests : Map.Map<Nat, BookingRequest>;
  var nextRequestId : Nat;

  include Expose({
    entities = [
      services.toEntity<Service>("service", "Service", "id")
        .sample({ id = 0; name = ""; description = ""; price = ""; duration = "" })
        .public_()
        .build(),
      team.toEntity<TeamMember>("teamMember", "TeamMember", "id")
        .sample({ id = 0; name = ""; role = ""; bio = ""; photo = "" })
        .public_()
        .build(),
      testimonials.toEntity<Testimonial>("testimonial", "Testimonial", "id")
        .sample({ id = 0; author = ""; quote = "" })
        .public_()
        .build(),
      gallery.toEntity<GalleryImage>("galleryImage", "GalleryImage", "id")
        .sample({ id = 0; url = ""; caption = "" })
        .public_()
        .build(),
      bookingRequests.toEntity("bookingRequest", "BookingRequest", "id")
        .sample({ id = 0; name = ""; contact = ""; service = ""; preferredTime = ""; message = ""; createdAt = 0; handled = false })
        .controllerOnly()
        .build(),
    ];
  });

  func requireAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
  };

  public query func getBusinessInfo() : async BusinessInfo {
    businessInfo;
  };

  public query func getServices() : async [Service] {
    services;
  };

  public query func getTeam() : async [TeamMember] {
    team;
  };

  public query func getTestimonials() : async [Testimonial] {
    testimonials;
  };

  public query func getGallery() : async [GalleryImage] {
    gallery;
  };

  public shared func submitBookingRequest(name : Text, contact : Text, service : Text, preferredTime : Text, message : Text) : async Nat {
    if (name == "" or contact == "") {
      Runtime.trap("Name and contact details are required");
    };

    let request : BookingRequest = {
      id = nextRequestId;
      name;
      contact;
      service;
      preferredTime;
      message;
      createdAt = Time.now();
      handled = false;
    };

    bookingRequests.add(request.id, request);
    nextRequestId += 1;
    request.id;
  };

  public shared query ({ caller }) func listBookingRequests() : async [BookingRequest] {
    requireAdmin(caller);
    bookingRequests.values().toArray();
  };

  public shared ({ caller }) func setBookingRequestHandled(id : Nat, handled : Bool) : async () {
    requireAdmin(caller);
    switch (bookingRequests.get(id)) {
      case (null) { Runtime.trap("Booking request not found") };
      case (?request) {
        bookingRequests.add(id, { request with handled = handled });
      };
    };
  };

  public shared ({ caller }) func deleteBookingRequest(id : Nat) : async () {
    requireAdmin(caller);
    bookingRequests.remove(id);
  };
};
