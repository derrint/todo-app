This is a Todo App, created using [Next.js](https://nextjs.org/), combined with [Redux](https://redux.js.org/).

## Start on your local machine

First, run the Back-End server:

```bash
# pull & install the image to the local machine
docker pull ghcr.io/kangaroohealthscience/fe-assessment-test:latest
# run the container
docker run -it -p 3000:3000 --rm ghcr.io/kangaroohealthscience/fe-assessment-test --network host
```

And then, run the Front-End server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Demo Account

For testing purposes, you may use these credentials

- Username : `kangaroohealth`
- Password : `the magnificent chicken`
