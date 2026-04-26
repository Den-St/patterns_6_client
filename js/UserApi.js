/**
 * Single Responsibility: Only knows about user-related API endpoints.
 * Dependency Inversion: Depends on HttpClient abstraction, not fetch directly.
 */
class UserApi {
  constructor(httpClient) {
    this._http = httpClient;
  }

  getAll() {
    return this._http.get('/users');
  }

  searchByNickname(query) {
    return this._http.get(`/users/search?nickname=${encodeURIComponent(query)}`);
  }

  getById(id) {
    return this._http.get(`/users/${id}`);
  }

  create(userData) {
    return this._http.post('/users', userData);
  }

  update(id, userData) {
    return this._http.put(`/users/${id}`, userData);
  }

  delete(id) {
    return this._http.delete(`/users/${id}`);
  }
}
