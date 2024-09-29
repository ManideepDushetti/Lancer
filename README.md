This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack

Next.js as fullstack framework. (used app directory)

MongoDB for database. (Mongoose)

Tailwind CSS for styling.

Session management and authentication is done using a custom auth setup with the help of jose library. (auth.ts in lib folder)

## Requirements

A mongoDB server is needed for backend. you can use a Atlas cloud database or your local database here.

A secret key is needed to create JWT token.

create a .env.local file in the root directory and add MONGO_URI and SECRET_KEY variables to it.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Interface

Home Page

![Home page](https://drive.google.com/uc?id=1E2CdsilwX-HtcP3-t9V3T2L-NA8Sdr8A)

Registration Page

![Registration page](https://drive.google.com/uc?id=1g2hhOXRLAGc9cwdnziImAvaVR19yxUiD)

Buyer Dashboard

![Buyer Dashboard](https://drive.google.com/uc?id=1P9_ahXaRaI6Y78M2AqRhrd5c7udca411)

Seller Profile

![Seller Profile](https://drive.google.com/uc?id=1Zzfo6y_sxkaVeBKX4wEq-z0M90pc2HBm)

## Features

1. Buyer can view seller profiles and their gigs.
2. Buyer can order any service (gig)
3. Seller can add and edit their gigs.
4. State of the gig is displayed in orders section of both seller and buyer. The state of a gig can be __Completed__, __Accepted__, __Rejected__

Check out [Feature Screenshots](https://drive.google.com/drive/folders/1XmieRcCebjkG8hLvGPqY-prw-uWqEin1?usp=sharing) 



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
