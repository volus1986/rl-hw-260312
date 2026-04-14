const store = new Map<string, number[]>();

/**
 * Sliding window rate limiter based on in-memory timestamp array.
 * Returns { limited: true } if the key has exceeded maxAttempts within windowMs.
 * Returns retryAfterMs — how many ms to wait before next allowed attempt.
 */

// interface
interface IProps {
  key: string;
  maxAttempts: number;
  windowMs: number;
}

// function
export function rateLimit(props: IProps) {
  const { key, maxAttempts, windowMs } = props;

  const now = Date.now();
  const timestamps = store.get(key) ?? [];

  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxAttempts) {
    const oldest = recent[0];
    const retryAfterMs = windowMs - (now - oldest);

    // return
    return { limited: true, retryAfterMs };
  }

  recent.push(now);
  store.set(key, recent);

  // return
  return { limited: false, retryAfterMs: 0 };
}
