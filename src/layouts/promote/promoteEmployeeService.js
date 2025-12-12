export async function promoteEmployee(promotionData) {
  try {
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

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
