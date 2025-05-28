import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

/**
 * AuthGuard is a wrapper component that ensures the user is authenticated
 * before rendering protected content. If the user is not logged in,
 * it triggers the login modal and shows an access restriction message.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render if the user is authenticated.
 * @returns {React.ReactNode} Either the child components, a loading placeholder, or a login prompt.
 */
export default function AuthGuard({ children }) {
  const { user, isLoading, setShowAuthModal, setAuthModalTab } = useAuth();
  const [hasPromptedLogin, setHasPromptedLogin] = useState(false);

  useEffect(() => {
    if (!isLoading && !user && !hasPromptedLogin) {
      setAuthModalTab("login");
      setShowAuthModal(true);
      setHasPromptedLogin(true); 
    }
  }, [isLoading, user, hasPromptedLogin, setAuthModalTab, setShowAuthModal]);

  if (isLoading) {
    return null; 
  }

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto mt-12 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Authentication Required</h2>
        <p className="text-sm text-gray-600">
          You need to be logged in to access this page. Please sign in using the authentication modal, or return to the previous page.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => {
              setAuthModalTab("login");
              setShowAuthModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return children;
}
