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

## **Question section**

### Ques1 : What does it mean for Next.js to run on edge cases?

Next.js running on edge cases means it is hosted on an Edge Network. Edge Networks use geographically distributed servers to deliver content quickly and efficiently to users.

### Benefits of running Next.js on Edge Networks

1. **Low Latency**: Closer servers result in faster response times for users.
2. **Scalability**: Easily handles high traffic by distributing the load.
3. **Reliability**: Distributed nature ensures high availability and fault tolerance.

Next.js can be deployed on Edge Networks using providers like Vercel or Cloudflare.

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
