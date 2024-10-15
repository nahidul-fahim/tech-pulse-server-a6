# Tech Pulse

<div align="center">
  <h1>Tech Pulse</h1>
  <p><a href="https://tech-pulse-a6.vercel.app" target="_blank">Live Demo</a></p>
</div>

Tech Pulse is a full-stack application  to help tech enthusiasts navigate and master the ever-evolving world of technology. This project leverages Node.js, Express, MongoDB, Mongoose, TypeScript and aamar pay to deliver a robust, scalable solution for managing car rentals.

## Table of Contents

- [Tech Pulse](#tech-pulse)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Thank you for visiting.](#thank-you-for-visiting)

## Introduction

Tech Pulse is a full-stack web app that empowers users with expert advice, practical tech solutions, and user-generated content. Explore tutorials, reviews, and recommendations, or share your own tips to enhance your digital life

## Features

- User authentication and authorization (JWT-based).
- Secure password hashing with Bcrypt.
- POsting, filter post, payment integration and commenting system.
- Forgot password recovery system.
- RESTful API structure with proper error handling.
- Environment configuration for development and production setups.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **TypeScript**: Typed superset of JavaScript for safer and more scalable code.
- **Zod**: Schema declaration and validation library for TypeScript.
- **Aamarpay**: Bangladesh-based online payment gateway

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **MongoDB** (v4.x or later)
- **Cloudinary** account for car images (optional, if you're using cloud image storage).

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/nahidul-fahim/tech-pulse-server-a6.git
    cd tech-pulse-server
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up your MongoDB database and update the configuration file accordingly.

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=your_mongodb_uri
    BCRYPT_SALT=12
    JWT_ACCESS_SECRET=your_jwt_secret
    JWT_ACCESS_EXPIRES_IN=1d
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_password
    SMTP_FROM_EMAIL=your_email_address
    CLIENT_URL=https://tech-pulse-a6.vercel.app
    STORE_ID=aamarpay_store_id
    SIGNATURE_KEY=aamarpay_signature_key
    PAYMENT_URL=https://sandbox.aamarpay.com/jsonpost.php
    ```

1. Replace the placeholder values with your actual configuration details.

## Usage

To run the application locally:

```bash
npm run dev
```

## Thank you for visiting.