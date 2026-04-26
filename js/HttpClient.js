/**
 * Single Responsibility: Only handles HTTP communication.
 * Open/Closed: Can be extended for new HTTP methods without modification.
 * Dependency Inversion: Higher-level modules depend on this abstraction.
 */
class HttpClient {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this._baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  }

  put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}
