# **NOTES**

## **Dependency Section**

### [ 1 ] Mongoose: Overview

- **Definition**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Purpose**: It provides a schema-based solution to model application data.

#### Key Features

1. **Schemas**: Define the structure and types of data in a MongoDB collection.
2. **Models**: Use schemas to create models for querying and interacting with the database.
3. **Validation**: Built-in validation rules to ensure data integrity.
4. **Middleware**: Supports pre and post hooks for logic before and after database operations.
5. **Population**: Allows referencing documents in other collections, enabling join-like queries.

#### Usage

1. **Install**: `npm install mongoose`
2. **Connect**: `mongoose.connect('mongodb://localhost/mydatabase')`
3. **Define Schema**:
   ```javascript
   const Schema = mongoose.Schema;
   const UserSchema = new Schema({
     name: String,
     age: Number,
     email: String,
   });
   ```
4. **Create Model**:
   ```javascript
   const User = mongoose.model("User", UserSchema);
   ```
5. **CRUD Operations**:

   ```javascript
   // Create
   const newUser = new User({
     name: "John",
     age: 30,
     email: "john@example.com",
   });
   newUser.save();

   // Read
   User.find({}, (err, users) => {
     console.log(users);
   });

   // Update
   User.updateOne({ name: "John" }, { age: 31 });

   // Delete
   User.deleteOne({ name: "John" });
   ```

### [ 2 ] Zod: Overview

- **Definition**: Zod is a TypeScript-first schema declaration and validation library.
- **Purpose**: Provides a way to define and validate data schemas in a type-safe manner.

#### Key Features

1. **Type Safety**: Strong TypeScript support for defining and inferring types.
2. **Validation**: Built-in validation for various data types and custom validation rules.
3. **Parsing**: Safe parsing with detailed error messages.
4. **Transformation**: Allows transformation of parsed data.
5. **Interoperability**: Works well with other libraries and frameworks.

#### Usage

1. **Install**: `npm install zod`
2. **Define Schema**:

   ```javascript
   import { z } from "zod";

   const userSchema = z.object({
     name: z.string(),
     age: z.number().int(),
     email: z.string().email(),
   });
   ```

3. **Parse and Validate**:

   ```javascript
   const result = userSchema.safeParse({
     name: "John",
     age: 30,
     email: "john@example.com",
   });

   if (result.success) {
     console.log(result.data); // Valid data
   } else {
     console.log(result.error); // Validation errors
   }
   ```

4. **Type Inference**:
   ```typescript
   type User = z.infer<typeof userSchema>;
   ```

#### Key Benefits

1. **Ease of Use**: Simple API for schema definitions and validations.
2. **Type Inference**: Automatically infers TypeScript types from schemas.
3. **Comprehensive Validations**: Supports complex validation rules and custom logic.
4. **Error Handling**: Provides detailed and user-friendly error messages.

### [ 3 ]  bcrypt in Brief

**bcrypt** is a password hashing function designed for secure password storage. It is widely used due to its strength and resistance to attacks. Here’s a concise overview of bcrypt:

1. **Purpose**:
   - bcrypt is used to hash passwords securely before storing them in a database.

2. **Strengths**:
   - **Salted Hashing**: Each password is hashed with a unique salt, preventing rainbow table attacks.
   - **Adaptive**: bcrypt can adjust its computational cost to stay ahead of attackers by increasing the number of iterations.
   - **Slow Hashing**: Deliberately slow to thwart brute-force attacks.

3. **How It Works**:
   - **Salt Generation**: Generates a random salt for each password.
   - **Key Expansion**: Uses the Blowfish cipher to perform key expansion and the expensive key setup to produce the hash.
   - **Hashing**: Combines the password and salt, then applies the hashing function multiple times.

4. **Usage**:
   - In most programming languages and frameworks, bcrypt is available through libraries (e.g., `bcrypt` in Python, `BCrypt.Net` in .NET).
   - Common usage involves generating a hash when a password is created and verifying the hash when a user logs in.


**Conclusion**:
bcrypt is a robust choice for password hashing due to its security features like salting, adaptive work factor, and resistance to brute-force attacks. It is widely adopted in many applications to ensure that passwords are stored securely.



## **Question section**

<ol> 
<li>

###  What does it mean for Next.js to run on edge cases?

Next.js running on edge cases means it is hosted on an Edge Network. Edge Networks use geographically distributed servers to deliver content quickly and efficiently to users.

### Benefits of running Next.js on Edge Networks

1. **Low Latency**: Closer servers result in faster response times for users.
2. **Scalability**: Easily handles high traffic by distributing the load.
3. **Reliability**: Distributed nature ensures high availability and fault tolerance.

Next.js can be deployed on Edge Networks using providers like Vercel or Cloudflare.</li>

<li>

### Dependencies vs. DevDependencies

- **Dependencies**:
  - **Purpose**: Required for the application to run in production.
  - **Installation**: Installed when running `npm install`.

- **DevDependencies**:
  - **Purpose**: Required only for development and testing (e.g., build tools, linters).
  - **Installation**: Installed when running `npm install` with the `--save-dev` flag or `npm install --dev`.

In essence, **dependencies** are for production use, while **devDependencies** are for development purposes only.
</li>

<li>

### HTTP status codes:

- **1xx (Informational)**:
  - **100 Continue**: Continue with the request.
  - **101 Switching Protocols**: Protocol switch as requested.

- **2xx (Success)**:
  - **200 OK**: Request succeeded.
  - **201 Created**: Resource created.
  - **204 No Content**: No content to return.

- **3xx (Redirection)**:
  - **301 Moved Permanently**: Resource moved permanently.
  - **302 Found**: Resource temporarily at a different URL.
  - **304 Not Modified**: Resource not modified (cached).

- **4xx (Client Error)**:
  - **400 Bad Request**: Invalid request.
  - **401 Unauthorized**: Authentication required.
  - **403 Forbidden**: Access denied.
  - **404 Not Found**: Resource not found.
  - **405 Method Not Allowed**: Method not allowed.

- **5xx (Server Error)**:
  - **500 Internal Server Error**: Server error.
  - **501 Not Implemented**: Functionality not supported.
  - **502 Bad Gateway**: Invalid response from upstream server.
  - **503 Service Unavailable**: Service unavailable.
  - **504 Gateway Timeout**: Timed out waiting for response.

These codes help indicate the result of HTTP requests.</li>

<li>Here</li>

</ol>

## **Important Terms**

<ol>

<li>

 ### Regex: Brief Introduction

- **Definition**: Regex, short for Regular Expression, is a sequence of characters that define a search pattern.
- **Purpose**: Used for matching, searching, and manipulating text. Common in tasks like form validation, search and replace, and data extraction.
- **Examples**:
  - `\d+` matches one or more digits.
  - `^[A-Z]` matches a string that starts with an uppercase letter.

Regex is widely used in programming, text editors, and tools for handling text data efficiently.

</li>

<li>
Here
 </li>

</ol>
