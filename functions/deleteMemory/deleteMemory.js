// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

const q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    const memory = JSON.parse(event.body);
    const memId = memory.ref['@ref'].id;
    const req = await faunaClient.query(q.Delete(q.Ref(`classes/memories/${memId}`)));
    return { statusCode: 200, body: JSON.stringify({ mem: req }) };
    } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}