const { MongoClient } = require('mongodb');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('interview_logs');
    await db.collection('logs').insertOne(data);
    
    client.close();
    return { statusCode: 200, body: JSON.stringify({ message: 'Log saved successfully' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save log', details: error.message }) };
  }
};
