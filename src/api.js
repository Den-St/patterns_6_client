const BASE_URL = "http://localhost:4000";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export const api = {
  searchUsers: (nickname) =>
    request(`/users/search?nickname=${encodeURIComponent(nickname)}`),
  getAllUsers: () => request("/users"),
  getSuperAdminContent: () => request("/roles/super-admin"),
  getAdminContent: () => request("/roles/admin"),
  getUserContent: () => request("/roles/user"),
};
