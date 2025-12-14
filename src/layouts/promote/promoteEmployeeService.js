export async function promoteEmployee(promotionData) {
  const response = await fetch("http://localhost:8080/employees/promote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotionData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to promote employee");
  }

  // backend may or may not return body
  try {
    return await response.json();
  } catch {
    return null;
  }
}
