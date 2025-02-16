exports.handler = async () => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json' // Add this to ensure JSON response
      },
      body: JSON.stringify([
        { id: 1, message: "New user registered!", date: "2025-02-17" },
        { id: 2, message: "Form submission received.", date: "2025-02-16" }
      ]),
    };
  };
  