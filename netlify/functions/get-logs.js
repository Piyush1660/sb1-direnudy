import { MongoClient } from 'mongodb';

exports.handler = async function (event, context) {
  try {
    // Connect to MongoDB using the URI in environment variables
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access the 'interview_logs' database
    const db = client.db('interview_logs');

    // Retrieve all logs from the 'logs' collection
    const logs = await db.collection('logs').find({}).toArray();

    // Close the connection to the database
    client.close();

    // Return the logs in the response
    return { statusCode: 200, body: JSON.stringify(logs) };
  } catch (error) {
    // Return an error response if something goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch logs', details: error.message }),
    };
  }
};
