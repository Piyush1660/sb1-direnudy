import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { username, password } = JSON.parse(event.body || "{}");

  // Retrieve credentials from Netlify environment variables
  const staffUsers = [
    { username: process.env.STAFF_USER_1, password: process.env.STAFF_PASS_1 },
    { username: process.env.STAFF_USER_2, password: process.env.STAFF_PASS_2 },
    // Add more users as needed
  ];

  const isValidUser = staffUsers.some(
    (staff) => staff.username === username && staff.password === password
  );

  if (isValidUser) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } else {
    return { statusCode: 401, body: JSON.stringify({ success: false }) };
  }
};
