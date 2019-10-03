# Helpers for Migrating Client Auth from Postgres to Solace

## [loader](/loader)

A Node.js application that can be used to bulk load client usernames from an existing Postgres database into a Solace router's internal database.

## [shell-scripts](/shell-scripts)

Basic shell scripts that leverage SEMP, Solace's management API, to interact with client usernames stored in a Solace router's internal database. These scripts are written in a way that makes it easy to plug them into an existing pipeline.
