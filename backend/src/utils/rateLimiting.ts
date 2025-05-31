import rateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware for aggregated data endpoints
 * Limits each client to 5 requests per minute
 */
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message: 'Too many requests, please wait before retrying.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Use IP address for rate limiting
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  // Custom handler for when limit is exceeded
  // handler: (req, res) => {
  //   res.status(429).json({
  //     error: 'Too many requests, please wait before retrying.',
  //     retryAfter: Math.ceil(60) // seconds until reset
  //   });
  // }
});

