const requestCounts = <Record<string, { count: number, lastRequest: number }>>{};


export const rateLimiter = (
  ip: string,
  MAX_LIMIT: number,
  TIME_WINDOW: number
) => {
  const now = Date.now();

  // unseen ip -> initialize window + count
  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, lastRequest: now }
    console.log(requestCounts);
  } else { // seen ip -> update window and limiter
    const timeSinceLastReq = now - requestCounts[ip].lastRequest;

    if (timeSinceLastReq < TIME_WINDOW) { // update limiter
      requestCounts[ip].count += 1;
    } else { // reinitialize limiter
      requestCounts[ip] = {
        count: 1,
        lastRequest: now
      }
    }
  }

  if (requestCounts[ip].count > MAX_LIMIT) {
    return true;
  }


  return false;
}