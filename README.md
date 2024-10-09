# Rental Wheels

<div align="center">
  <h1>Rental Wheels</h1>
  <p><a href="https://rental-wheels-a5.vercel.app/" target="_blank">Live Demo</a></p>
</div>

Rental Wheels is a full-stack application for renting cars. This project leverages Node.js, Express, MongoDB, Mongoose, and TypeScript to deliver a robust, scalable solution for managing car rentals.

## Table of Contents

- [Rental Wheels](#rental-wheels)
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

Rental Wheels is designed to streamline the process of renting cars. It provides an easy-to-use backend system for users to book cars and for admins to manage those bookings.

## Features

- User authentication and authorization (JWT-based).
- Secure password hashing with Bcrypt.
- Car add, update, delete features for admins.
- Car booking system for users.
- Car return management for admins, automatically calculating rental costs based on hours rented.
- RESTful API structure with proper error handling.
- Environment configuration for development and production setups.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **TypeScript**: Typed superset of JavaScript for safer and more scalable code.
- **Zod**: Schema declaration and validation library for TypeScript.

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
    git clone https://github.com/nahidul-fahim/rental-wheels-server.git
    cd rental-wheels-server
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
    CLIENT_URL=https://rental-wheels-a5.vercel.app
    ```

2. Replace the placeholder values with your actual configuration details.

## Usage

To run the application locally:

```bash
npm run dev
```

## Thank you for visiting.