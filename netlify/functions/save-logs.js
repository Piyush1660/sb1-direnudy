import { MongoClient } from 'mongodb';

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the incoming data from the request body
    const data = JSON.parse(event.body);

    // Connect to MongoDB using the connection URI stored in environment variables
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Access the 'interview_logs' database
    const db = client.db('interview_logs');

    // Insert the incoming data into the 'logs' collection
    await db.collection('logs').insertOne(data);
    
    // Close the database connection
    client.close();

    // Return a success response
    return { statusCode: 200, body: JSON.stringify({ message: 'Log saved successfully' }) };
  } catch (error) {
    // Return an error response if something goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save log', details: error.message }),
    };
  }
};
