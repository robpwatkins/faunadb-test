// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const q = faunadb.query;

const handler = async (event) => {
  try {
    const memory = { 
      data: JSON.parse(event.body) 
    }
    const req = await faunaClient.query(q.Create(q.Ref("classes/memories"), memory))
    console.log(req);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Successfully added memory!` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.message }
  }
}

module.exports = { handler }
