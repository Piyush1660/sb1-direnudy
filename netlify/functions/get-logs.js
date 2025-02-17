const { MongoClient } = require('mongodb');

exports.handler = async function (event, context) {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('interview_logs');
    const logs = await db.collection('logs').find({}).toArray();

    client.close();
    return { statusCode: 200, body: JSON.stringify(logs) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch logs', details: error.message }) };
  }
};
