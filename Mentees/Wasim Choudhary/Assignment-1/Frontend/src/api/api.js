const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

export async function fetchUser() {
  const res = await fetch(`${BASE}/api/user`);
  if (!res.ok) throw new Error("Failed to fetch the user, Try again!");
  return res.json();
}

export async function updateUser(payload) {
  const res = await fetch(`${BASE}/api/user`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data.errors
      ? data.errors.join("; ")
      : data.error || "Update failed";
    throw new Error(message);
  }
  return data;
}
