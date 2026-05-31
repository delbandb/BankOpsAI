const BASE_URL = "http://localhost:8000";

export async function getCases() {
    const res = await fetch(`${BASE_URL}/cases/`);
    if (!res.ok) throw new Error("Failed to fetch cases")
        return res.json();
}

export async function getCase(id) {
    const res = await fetch(`${BASE_URL}/cases/${id}/`);
    if (!res.ok) throw new Error("Case not found")
        return res.json();
}

export async function createCase(data) {
    const res = await fetch(`${BASE_URL}/cases/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create case")
        return res.json();
}

export async function updateCase(id, data) {
    const res = await fetch(`${BASE_URL}/cases/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update case")
        return res.json();
}