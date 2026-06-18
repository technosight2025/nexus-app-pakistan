import { NextResponse } from "next/server";

// Mock auth helper for server components / server actions
export const auth = async () => {
  return {
    userId: "user_mock",
    orgId: "org_mock_vendor",
    sessionId: "session_mock"
  };
};

// Mock currentUser helper for server components / server actions
export const currentUser = async () => {
  return {
    id: "user_mock",
    firstName: "Zoya",
    lastName: "Khan",
    fullName: "Zoya Khan",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
    primaryEmailAddress: { emailAddress: "zoya@nexus.pk" },
    emailAddresses: [{ emailAddress: "zoya@nexus.pk" }],
    publicMetadata: {
      role: "owner",
      organization_id: "org_mock_vendor",
      onboarded: true
    }
  };
};

// Mock clerkClient helper
export const clerkClient = async () => {
  return {
    users: {
      updateUserMetadata: async (userId: string, data: any) => {
        console.log("Mock clerkClient.users.updateUserMetadata called:", userId, data);
        return { id: userId, ...data };
      },
      getUser: async (userId: string) => {
        console.log("Mock clerkClient.users.getUser called:", userId);
        return {
          id: userId,
          firstName: "Zoya",
          lastName: "Khan",
          fullName: "Zoya Khan",
          primaryEmailAddress: { emailAddress: "zoya@nexus.pk" }
        };
      }
    }
  };
};

// Mock clerkMiddleware for nextjs middleware
export const clerkMiddleware = (callback: any) => {
  return async (req: any, event: any) => {
    return NextResponse.next();
  };
};

// Mock createRouteMatcher
export const createRouteMatcher = (routes: string[]) => {
  return (req: any) => {
    return true;
  };
};
