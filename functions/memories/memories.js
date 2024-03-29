// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 500, body: 'GET OUTTA HERE!' }
  }
  try {
    const req = await faunaClient.query(q.Map(q.Paginate(q.Match(q.Index('all_memories'))), q.Lambda('attr', q.Get(q.Var('attr')))));
    return { statusCode: 200, body: JSON.stringify(req.data) };
    } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}