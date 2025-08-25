const API_BASE = 'http://localhost:5000/api';


export async function api(path, { method = 'GET', body, token } = {}) {
const res = await fetch(API_BASE + path, {
method,
headers: {
'Content-Type': 'application/json',
...(token ? { Authorization: `Bearer ${token}` } : {})
},
body: body ? JSON.stringify(body) : undefined,
});
if (!res.ok) throw new Error((await res.json()).message || 'Request failed');
return res.json();
}