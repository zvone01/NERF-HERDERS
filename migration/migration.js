import fs from 'fs';
import pkg from 'request';

const { post } = pkg;

// Configs

// set url of neo4j db
const neo4jUrl = 'http://localhost:7474/db/data/transaction/commit';

// set username and password for neo4j
const neo4jUser = 'neo4j';
const neo4jPass = '12345678';

// set file name to import
const inputFile = 'nerf-herders-data.json';

function migrate(query, params, cb) {
// make a post request to store data into db
  post(
    {
      uri: neo4jUrl,
      headers: {
        Authorization: `Basic ${Buffer.from(`${neo4jUser}:${neo4jPass}`).toString('base64')}`,
      },
      json: { statements: [{ statement: query, parameters: params }] },
    },
    (err, res) => {
      cb(err, res.body);
    },
  );
}

// query to instert data
const query = `WITH $json as value UNWIND value.data AS node
                MERGE (n:Node { name: node.name })
                ON CREATE SET n.description = node.description
                FOREACH ( i IN (CASE WHEN node.parent<>'' THEN [1] ELSE [] END) |
                MERGE (p:Node { name: node.parent })
                MERGE (p)-[:PARENT_OF]->(n)
                )`;

// read file
const json = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

migrate(query, { json }, (err, result) => {
  // eslint-disable-next-line no-console
  console.log(err, JSON.stringify(result));
});
