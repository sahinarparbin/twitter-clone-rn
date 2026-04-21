import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    const userAgent = req.headers["user-agent"] || "";
    const origin = req.headers.origin || "";

    // ✅ Allow trusted environments (VERY IMPORTANT)
    const isTrusted =
      userAgent.includes("Mozilla") ||       // browsers
      userAgent.includes("Chrome") ||
      userAgent.includes("Postman") ||
      userAgent.includes("vercel") ||        // Vercel
      origin.includes("localhost") ||        // local dev
      origin.includes("vercel.app");         // deployed frontend

    if (decision.isDenied()) {
      // 🚫 Rate limit (keep strict)
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        });
      }

      // 🤖 Bot detection (but allow trusted)
      if (decision.reason.isBot()) {
        if (isTrusted) {
          return next(); // ✅ allow legit requests
        }

        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated requests are not allowed.",
        });
      }

      // 🔒 Other security issues
      return res.status(403).json({
        error: "Forbidden",
        message: "Access denied by security policy.",
      });
    }

    // 🚨 Spoofed bots (keep strict)
    const isSpoofedBot = decision.results?.some(
      (result) => result.reason.isBot() && result.reason.isSpoofed()
    );

    if (isSpoofedBot) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);

    // ✅ Fail-safe: don’t block users if Arcjet fails
    next();
  }
};