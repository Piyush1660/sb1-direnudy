exports.handler = async () => {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        { id: 1, activity: "Admin logged in", timestamp: "2025-02-17T10:00:00Z" },
        { id: 2, activity: "User banned", timestamp: "2025-02-16T14:30:00Z" }
      ]),
    };
  };
  