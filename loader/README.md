# loader

A Node.js application that can be used to bulk load client usernames from an existing Postgres database into a Solace router's internal database.

## Getting Started

First, you need to follow the instructions in the [EDIT-ME.env](/loader/EDIT-ME.env) file included in this directory so that the application can connect to your Postgres database and your Solace router.

Once you've filled out the configuration details, you have two options to run this application:

- Docker
- Node.js

### Docker

```
docker build -t <INSERT TAG NAME> .
docker run <INSERT TAG NAME>
```

### Node.js

```
npm i
npm run start
```
