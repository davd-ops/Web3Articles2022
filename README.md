## Introduction

This is my first project using [NEXT.JS](https://nextjs.org). The goal was to test next's capabilities and get myself familiarized with it.

The app contains fully usable interface where user is able to read & publish articles, all done using web3 authentication.

## Getting Started

First, setup a MongoDB database and import the data from `database_export` folder. 

After that, setup your env variables in `.env.local` file.

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production setup

In order to run the app in production, use:
```bash
npm run build
# AND THEN
npm run start
```
or 
```bash
yarn run build
# AND THEN
yarn run start
```

