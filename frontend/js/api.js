const API_BASE = "http://localhost:5001/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(method, endpoint, data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = getToken();
  if (token) options.headers["Authorization"] = `Bearer ${token}`;
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  const json = await res.json();

  if (!res.ok) {
    // Shows meaningful error message from backend
    throw new Error(json.message || "Request failed");
  }

  return json;
}
