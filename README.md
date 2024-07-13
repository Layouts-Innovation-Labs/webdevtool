# Eduamor
---
Eduamor is a comprehensive web application designed to streamline the management of high school data in Nigeria, focusing on academic and financial records. This project caters to the needs of students, parents, and school administrators.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Roles and Permissions**: Different interfaces and permissions for students, parents, and administrators.
- **Academic Management**: Manage student records, view and update academic performance.
- **Financial Management**: Track tuition fees, payment status, and integrate with payment gateways.
- **Communication Tools**: Notifications and secure messaging between users.
- **Reporting and Analytics**: Generate and visualize reports on student performance and financial status.
- **Security and Privacy**: SSL encryption, secure data storage, and compliance with local data protection regulations.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB or MySQL
- **Hosting**: AWS, Google Cloud, or Azure
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Paystack, Flutterwave, or any other popular payment gateway

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/edumanage-ng.git
    cd edumanage-ng
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    PAYMENT_GATEWAY_API_KEY=your_payment_gateway_api_key
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Running the Application

- **Development**: 
    ```sh
    npm run dev
    ```
- **Production**:
    ```sh
    npm run build
    npm start
    ```

### Testing

Run the test suite using:
```sh
npm test
```

## Project Structure

```
|-- README.md
|-- middleware.ts
|-- models
|   `-- user.ts
|-- next-env.d.ts
|-- next.config.mjs
|-- package-lock.json
|-- package.json
|-- pages
|   `-- api
|       |-- auth
|       |   |-- login.ts
|       |   `-- register.ts
|       `-- protected-route.ts
|-- postcss.config.mjs
|-- public
|-- setup-auth.sh
|-- src
|   `-- app
|       |-- (main)
|       |   |-- app
|       |   |   |-- admin
|       |   |   |   |-- analytics
|       |   |   |   |   `-- pagel.tsx
|       |   |   |   |-- dashboard
|       |   |   |   |   `-- pagel.tsx
|       |   |   |   |-- reports
|       |   |   |   |   `-- pagel.tsx
|       |   |   |   `-- student-records
|       |   |   |       `-- pagel.tsx
|       |   |   |-- feedback
|       |   |   |   `-- pagel.tsx
|       |   |   |-- layout.tsx
|       |   |   |-- messaging
|       |   |   |   `-- pagel.tsx
|       |   |   |-- notifications
|       |   |   |   `-- pagel.tsx
|       |   |   |-- parent
|       |   |   |   |-- dashboard
|       |   |   |   |   `-- pagel.tsx
|       |   |   |   |-- financial-records
|       |   |   |   |   `-- pagel.tsx
|       |   |   |   `-- payment
|       |   |   |       `-- pagel.tsx
|       |   |   `-- student
|       |   |       |-- dashboard
|       |   |       |   `-- pagel.tsx
|       |   |       |-- request-update
|       |   |       |   `-- pagel.tsx
|       |   |       `-- results
|       |   |           `-- pagel.tsx
|       |   `-- auth
|       |       |-- login
|       |       |   `-- pagel.tsx
|       |       `-- register
|       |           `-- pagel.tsx
|       |-- _middleware.ts
|       |-- components
|       |   |-- Container.tsx
|       |   |-- Navbar.tsx
|       |   |-- SearchBar
|       |   |   `-- pagel.tsx
|       |   `-- Sidebar.tsx
|       |-- create.sh
|       |-- favicon.ico
|       |-- globals.css
|       |-- layout.tsx
|       |-- meta.tsx
|       `-- pagel.tsx
|-- tailwind.config.ts
|-- tree
|-- tsconfig.json
`-- utils
    `-- hash.ts
```

## Pages Overview

### Login Page

- **Path**: `/login`
- **Description**: Secure login interface for all user roles.

### Registration Page

- **Path**: `/register`
- **Description**: Registration form for new users (students, parents).

### Student Dashboard

- **Path**: `/student/dashboard`
- **Description**: Overview of academic performance, financial status, and notifications for students.

### Student Records Management

- **Path**: `/student/records`
- **Description**: Manage and view student personal and academic records.

### Administrator Dashboard

- **Path**: `/admin/dashboard`
- **Description**: Tools for managing student data, generating reports, and communicating with stakeholders.

## API Endpoints

### Authentication

- **POST /api/auth/login**: Login endpoint.
- **POST /api/auth/register**: Registration endpoint.

### User Management

- **GET /api/users**: Retrieve all users (admin only).
- **GET /api/users/:id**: Retrieve user by ID.
- **PUT /api/users/:id**: Update user by ID.
- **DELETE /api/users/:id**: Delete user by ID.

### Student Records

- **GET /api/students**: Retrieve all student records.
- **GET /api/students/:id**: Retrieve student record by ID.
- **POST /api/students**: Create new student record.
- **PUT /api/students/:id**: Update student record by ID.
- **DELETE /api/students/:id**: Delete student record by ID.

### Financial Records

- **GET /api/financials**: Retrieve all financial records.
- **GET /api/financials/:id**: Retrieve financial record by ID.
- **POST /api/financials**: Create new financial record.
- **PUT /api/financials/:id**: Update financial record by ID.
- **DELETE /api/financials/:id**: Delete financial record by ID.

## Contributing

We welcome contributions to the Eduamor project. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure that your code adheres to our coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

