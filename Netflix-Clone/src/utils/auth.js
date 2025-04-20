/**
 * Authentication utility functions
 */

/**
 * Checks if a user is currently authenticated
 * @returns {boolean} - Whether the user is authenticated
 */
export const isAuthenticated = () => {
    // In a real app, check for a valid token or session
    const token = localStorage.getItem("auth_token");
    return !!token;
  };
  
  /**
   * Redirects unauthenticated users away from protected routes
   * @param {Function} redirectCallback - Function to call for redirection
   * @returns {boolean} - Whether the user is authenticated
   */
  export const protectRoute = (redirectCallback) => {
    const authenticated = isAuthenticated();
    if (!authenticated && redirectCallback) {
      redirectCallback();
    }
    return authenticated;
  };
  
  /**
   * Mock login function
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data
   */
  export const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("auth_token", "mock_token_12345");
        resolve({
          id: 1,
          email,
          name: "Test User",
        });
      }, 500);
    });
  };
  
  /**
   * Mock logout function
   */
  export const logout = () => {
    localStorage.removeItem("auth_token");
  };
  