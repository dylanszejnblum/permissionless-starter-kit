
# Permissionless.js Starter kit

This starter kit is designed to help you quickly get up and running with smart accounts (Account abstraction) powered by Permissionless.js and Pimlico. It utilizes Vite, React, shadcn/ui, and Viem.

Bear in mind this still very much a work in progress and will improve over time

![alt text](https://github.com/dylanszejnblum/permissionless-starter-kit/blob/main/banner.png?raw=true)
## Run Locally

Clone the project

```bash
  git clone https://github.com/dylanszejnblum/permissionless-starter-kit.git
```

Go to the project directory

```bash
  cd permissionless-starter-kit
```

Install dependencies

```bash
  npm install
```

Add your provider and api keys

```javascript
const paymasterClient = createPimlicoPaymasterClient({
  transport: http(`https://api.pimlico.io/v2/sepolia/rpc?apikey=YOUR-API-KEY`),
});

const bundlerClient = createPimlicoBundlerClient({
  transport: http(`https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR-API-KEY`),
});

const publicClient = createPublicClient({
  transport: http("YOUR-ALCHEMY-URL"),
});

const smartAccountClient = createSmartAccountClient({
  account: simpleAccount,
  chain: sepolia,
  transport: http(`https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR-API-KEY`),
  sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
});

```

Start the server

```bash
  npm run dev
```


## Authors

- [Dylan Szejnblum](https://www.github.com/dylanszejnblum)



## Roadmap

- Add support for Biconomy Accounts 
- Add vite env variables
- Create a wizard for userOps

