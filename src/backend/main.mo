import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Inquiry Management
  type InquiryId = Nat;
  type Sector = { #NBFC; #BFSI; #BPO; #Other };

  type Inquiry = {
    id : InquiryId;
    name : Text;
    company : Text;
    sector : Sector;
    staffCount : Nat;
    message : Text;
    timestamp : Int;
  };

  let inquiries = Map.empty<InquiryId, Inquiry>();
  var nextId : InquiryId = 1;

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray();
  };

  public shared ({ caller }) func submitInquiry(
    name : Text,
    company : Text,
    sector : Sector,
    staffCount : Nat,
    message : Text,
    timestamp : Int,
  ) : async () {
    // No authorization check - public function accessible to anyone including guests
    let newInquiry : Inquiry = {
      id = nextId;
      name;
      company;
      sector;
      staffCount;
      message;
      timestamp;
    };

    inquiries.add(nextId, newInquiry);
    nextId += 1;
  };

  public shared ({ caller }) func deleteInquiry(id : InquiryId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };

    inquiries.remove(id);
  };
};
