/**
 * Prevents duplicate simultaneous requests to the same endpoint
 */
class RequestDeduplicator {
  private activeRequests = new Map<string, Promise<any>>();

  async dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    // If request is already in progress, return existing promise
    if (this.activeRequests.has(key)) {
      console.log(`[DEDUP] Using existing request for: ${key}`);
      return this.activeRequests.get(key)!;
    }

    console.log(`[DEDUP] Starting new request for: ${key}`);
    
    // Create new request and store it
    const promise = fetcher().finally(() => {
      // Clean up after request completes
      this.activeRequests.delete(key);
      console.log(`[DEDUP] Request completed for: ${key}`);
    });

    this.activeRequests.set(key, promise);
    return promise;
  }

  clear() {
    this.activeRequests.clear();
  }
}

export const requestDeduplicator = new RequestDeduplicator();
