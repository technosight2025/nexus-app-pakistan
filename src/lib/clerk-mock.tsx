"use client";

import React from "react";

// Mock ClerkProvider
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const MOCK_USER = {
  id: "user_mock",
  firstName: "Zoya",
  lastName: "Khan",
  fullName: "Zoya Khan",
  imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
  primaryEmailAddress: { emailAddress: "zoya@nexus.pk" },
  publicMetadata: {
    role: "owner",
    organization_id: "org_mock_vendor",
    onboarded: true
  }
};

const MOCK_USE_USER_RESULT = {
  isSignedIn: true,
  isLoaded: true,
  user: MOCK_USER
};

// Mock useUser hook
export const useUser = () => {
  return MOCK_USE_USER_RESULT;
};

const MOCK_USE_CLERK_RESULT = {
  signOut: async () => {
    console.log("Mock Clerk SignOut triggered.");
  },
  openUserProfile: () => {
    console.log("Mock Clerk OpenUserProfile triggered.");
  },
  client: {
    signIn: {
      authenticateWithRedirect: async (opts: any) => {
        console.log("Mock Clerk Google Sign-In Redirect triggered:", opts);
        window.location.href = opts.redirectUrlComplete || "/onboarding";
      }
    }
  },
  user: {
    id: "user_mock"
  },
  session: {
    user: {
      id: "user_mock"
    }
  }
};

// Mock useClerk hook
export const useClerk = () => {
  return MOCK_USE_CLERK_RESULT;
};

const MOCK_USE_AUTH_RESULT = {
  isSignedIn: true,
  isLoaded: true,
  userId: "user_mock",
  sessionId: "session_mock",
  orgId: "org_mock_vendor"
};

// Mock useAuth hook
export const useAuth = () => {
  return MOCK_USE_AUTH_RESULT;
};

const MOCK_SIGN_UP = {
  create: async (data: any) => {
    console.log("Mock Clerk SignUp Create triggered:", data);
    return { status: "complete", createdSessionId: "session_mock", createdUserId: "user_mock" };
  },
  prepareEmailAddressVerification: async (data: any) => {
    console.log("Mock Clerk prepareEmailAddressVerification triggered:", data);
    return { status: "verifying" };
  },
  attemptEmailAddressVerification: async (data: any) => {
    console.log("Mock Clerk attemptEmailAddressVerification triggered:", data);
    return { status: "complete", createdSessionId: "session_mock", createdUserId: "user_mock" };
  },
  status: "complete",
  createdSessionId: "session_mock",
  createdUserId: "user_mock"
};

const MOCK_USE_SIGN_UP_RESULT = {
  isLoaded: true,
  signUp: MOCK_SIGN_UP,
  setActive: async (data: any) => {
    console.log("Mock Clerk SignUp setActive triggered:", data);
  }
};

// Mock useSignUp hook (legacy or standard flow)
export const useSignUp = () => {
  return MOCK_USE_SIGN_UP_RESULT;
};

const MOCK_SIGN_IN = {
  create: async (data: any) => {
    console.log("Mock Clerk SignIn Create triggered:", data);
    return { status: "complete" };
  }
};

const MOCK_USE_SIGN_IN_RESULT = {
  isLoaded: true,
  signIn: MOCK_SIGN_IN
};

// Mock useSignIn hook
export const useSignIn = () => {
  return MOCK_USE_SIGN_IN_RESULT;
};

// Mock UserButton component
export const UserButton = () => {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:opacity-90">
      <img 
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" 
        alt="User Profile" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

// Mock SignUp component
export const SignUp = () => {
  return (
    <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-black mb-4">SignUp (Mocked)</h2>
      <p className="text-slate-500 mb-6 font-medium">Clerk sign-up is currently disabled for this development build.</p>
    </div>
  );
};

// Mock SignIn component
export const SignIn = () => {
  return (
    <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-black mb-4">SignIn (Mocked)</h2>
      <p className="text-slate-500 mb-6 font-medium">Clerk sign-in is currently disabled for this development build.</p>
    </div>
  );
};

// Mock AuthenticateWithRedirectCallback
export const AuthenticateWithRedirectCallback = () => {
  return <div className="p-8 text-center font-bold">Mock Authenticating Redirect Callback...</div>;
};
