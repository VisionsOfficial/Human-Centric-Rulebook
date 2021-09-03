# Contributing

## Development

Create `.env` file in the root directory with the environment variables below:

```
APP_ENV=development
APP_SECRET=
API_HOST=localhost
API_PORT=4445
MONGO_URL=mongodb://localhost:27017
MONGO_DB=dapsi
MONGO_POOL=50
PAGE_DEFAULT_LIMIT=25
PAGE_MAX_LIMIT=100
PRIVATE_KEY=
CONTRACT_ADDRESS=
ETH_ACCESS_KEY_ID=
ETH_SECRET_ACCESS_KEY=
ETH_RPC=
```

## Commands

Follow these commands to start:

```bash
# Migrate the database. Make sure that the metadata.wallet-address-nonce contains the latest nonce number of the executor wallet.
npm run upgrade
# Generate JWT token.
npm run generate:token $ETH_ADDRESS $CONTRACT_ID
# Start server
npm run start:rest
# See package.json for more.
```

Post a signature:

```bash
npm run generate:token auth 1
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: JWTXXX" \
    -d '{"hash":"0xXXX","signature":"0xXXX"}' \
    http://localhost:4445/contracts/1/sign/provider
```

Verify a contract (id: 1):

```bash
curl \
    -X GET \
    -H "Content-Type: application/json" \
    http://localhost:4445/contracts/1/verify
```

Revoke an existing contract:

```bash
npm run generate:token revoke 1
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: JWTXXX" \
    http://localhost:4445/contracts/1/revoke
```

## Deployment

If everything is properly set up, we should be able to deploy lambda functions by running the commands below:

```sh
$ MONGO_URL="..." MONGO_DB="" npm run upgrade
$ npm run build
$ npm run deploy -- --stage test
```

We can remove an already deployed lambda function:

```sh
$ npm run deploy:remove -- --stage test
```
