/**
 * Loader.js
 * Read a list of users from a pg database and load it into Solace using SEMP
 * @author Andrew Roberts
 */

// load regenerator-runtime and env variables before anything else
import "regenerator-runtime";
import dotenv from "dotenv";
let result = dotenv.config();
if (result.error) {
  throw result.error;
}

import { Client } from "pg";
import SEMPClient from "./SEMPClient";

async function load() {
  // initialize a SEMP client for the message VPN we want to load users into
  let sempClient = SEMPClient("default");
  // initialize a Postgres client using variables loaded from .env file
  const pgConnectionConfig = {
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
  };
  let pgClient = new Client(pgConnectionConfig);
  // connect to the database
  await pgClient.connect(err => {
    if (err) {
      console.error("Could not connect to Postgres", err.stack);
      return;
    }
    console.log("Connected to Postgres!");
  });
  // query db for list of users
  let { rows } = await pgClient.query(`SELECT * FROM users;`);
  // process and upload list of users
  for (let row of rows) {
    let solaceUserObj = {
      clientUsername: row.email,
      password: row.password
    };
    try {
      let res = await sempClient.createClientUsername(solaceUserObj);
    } catch (e) {
      console.log(e);
    }
  }
}

load();
