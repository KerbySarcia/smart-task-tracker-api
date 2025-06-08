import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, // 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
  message: "Wait for 10 minutes",
});

export default limiter;
