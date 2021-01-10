# NERF-HERDERS
This is a project that contains three parts, migration, backend and frontend. First, run migration to populate the database, then run backend and finally frontend. You only need to run migration once.

First, install neo4j (https://neo4j.com/docs/operations-manual/current/installation/)
Then in it create a new database.

# migration
	This is used to migrate data from nerf-herders-data.json to the database.
you need to specify link database, username and password for the neo4j database in migration.js

```
// set url of neo4j db
const neo4jUrl = 'http://localhost:7474/db/data/transaction/commit';

// set username and password for neo4j
const neo4jUser = 'neo4j';
const neo4jPass = '12345678';
 ```
 
To install all dependencies firts use
```
npm install
```

Then run it using 
```
npm run migrate
```

# backend
you need to specify username and password for the neo4j database in index.js file
```

// setup your username and passford for neo4j database
const dbusername = 'neo4j username';
const dbpass = 'neo4j password';

```

To initialize dependencies first run

```
npm install
```
To run it use

```
npm start
```

# frontend
after starting backend service, you can start the frontend.

in  frontend\src\service\index.js file change  to address of your backend service
```
// path to service
const DATA_API_PATH = "http://localhost:5000";
```
To initialize dependencies first run
```
 npm install.
````

After that, run it using. 
````
npm serve 
```
