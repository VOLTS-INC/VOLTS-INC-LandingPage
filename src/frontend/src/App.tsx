import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AdminBar from "./components/AdminBar";
import AdminInbox from "./components/AdminInbox";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SignInPage from "./components/SignInPage";
import { useIsCallerAdmin } from "./hooks/useQueries";

function App() {
  const { isInitializing, identity } = useInternetIdentity();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const [showInbox, setShowInbox] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (!isInitializing) {
      queryClient.invalidateQueries();
    }
  }, [isAuthenticated, isInitializing, queryClient]);

  useEffect(() => {
    if (!isAdmin) {
      setShowInbox(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAuthenticated) {
      setShowSignIn(false);
    }
  }, [isAuthenticated]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (showSignIn && !isAuthenticated) {
    return <SignInPage onBack={() => setShowSignIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isAdmin && (
        <AdminBar
          showInbox={showInbox}
          onToggleInbox={() => setShowInbox((open) => !open)}
        />
      )}
      {isAdmin && showInbox ? (
        <AdminInbox />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
          </main>
          <Footer onOwnerSignIn={() => setShowSignIn(true)} />
        </>
      )}
    </div>
  );
}

export default App;
