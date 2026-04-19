

// Middleware function to protect routes (allow only logged-in users)
export const protectRoute = async (req, res, next) => {

  // Check if the user is authenticated (logged in)
  if (!req.auth().isAuthenticated) {

    // If not logged in, send 401 Unauthorized response
    return res.status(401).json({
      message: "Unauthorized - you must be logged in"
    });
  }

  // If logged in, move to the next function (controller or route handler)
  next();
};