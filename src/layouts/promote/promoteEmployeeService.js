export async function promoteEmployee(promotionData) {
  const response = await fetch("http://localhost:8080/employees/promote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotionData),
  });

  if (!response.ok) {
    // Handle known status codes explicitly
    if (response.status === 400) {
      throw new Error("Invalid input. Please check your entries and try again.");
    }

    if (response.status === 404) {
      throw new Error("Employee not found.");
    }

    // Fallback for other errors
    throw new Error("Failed to promote employee. Please try again later.");
  }

  // Backend may or may not return body
  try {
    return await response.json();
  } catch {
    return null;
  }
}
