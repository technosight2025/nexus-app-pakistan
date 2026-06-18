import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#0A3B2A] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Authenticating with Google...</p>
      </div>
      
      {/* 
        This Clerk component automatically handles the OAuth callback.
        If it's a new user (signup), they go to /onboarding.
        If it's an existing user (login), they go to /dashboard.
      */}
      <div className="hidden">
        <AuthenticateWithRedirectCallback 
          signUpForceRedirectUrl="/onboarding"
          signInForceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
