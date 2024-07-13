// import { MongoClient, ObjectId } from "mongodb";

// interface Collection {
//   name: string;
//   validator?: object;
// }

// /**
//  * Represents a MongoDB client for interacting with the database.
//  */
// class DBClient {
//   private client: MongoClient;
//   private db: any;
//   private databaseName: string;

//   constructor() {
//     const database = process.env.DB_DATABASE || "FarmCon";
//     const username = process.env.DB_USERNAME || "FarmCon";
//     const password = process.env.DB_PASSWORD;

//     if (!password) {
//       throw new Error("Database password is not defined");
//     }

//     const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.qpa4khn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//     this.client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     this.databaseName = database;
//     this.connect();
//   }

//   /**
//    * Connects to the MongoDB database.
//    * @returns {Promise<void>} A promise that resolves when the connection is established.
//    */
//   async connect(): Promise<void> {
//     try {
//       await this.client.connect();
//       this.db = this.client.db(this.databaseName); // Assign the database instance
//       console.log("Connected to MongoDB");
//       await this.createCollections(); // Create collections after connecting
//     } catch (error) {
//       console.error("Failed to connect to MongoDB:", error);
//     }
//   }

//   /**
//    * Checks if a collection already exists in the database.
//    * @param {string} name The name of the collection to check.
//    * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the collection exists.
//    */
//   async collectionExists(name: string): Promise<boolean> {
//     const collections = await this.db.listCollections().toArray();
//     return collections.some((collection: any) => collection.name === name);
//   }

//   /**
//    * Creates collections with specified validators.
//    */
//   async createCollections(): Promise<void> {
//     const collections: Collection[] = [
//       { name: "feedbacks" },
//       { name: "products" },
//       { name: "users" },
//     ];

//     for (const collection of collections) {
//       await this.createCollection(collection.name, collection.validator);
//     }
//   }

//   /**
//    * Creates a collection with the specified name and validator if it doesn't already exist.
//    * @param {string} name The name of the collection to create.
//    * @param {object} validator The validator object for the collection.
//    */
//   async createCollection(name: string, validator?: object): Promise<void> {
//     try {
//       // Check if the collection already exists
//       const collectionExists = await this.collectionExists(name);
//       if (!collectionExists) {
//         await this.db.createCollection(name, { validator });
//         console.log(`Collection '${name}' created successfully.`);
//       } else {
//         console.log(`Collection '${name}' already exists.`);
//       }
//     } catch (error) {
//       console.error(`Error creating collection '${name}':`, error);
//     }
//   }

//   /**
//    * Retrieves the total number of objects in a collection.
//    * @param {string} collectionName - The name of the collection.
//    * @returns {Promise<number>} A promise that resolves with the total number of objects in the collection.
//    * @throws {Error} If an error occurs while retrieving the total number of objects.
//    */
//   async count(collectionName: string): Promise<number> {
//     try {
//       return await this.db.collection(collectionName).countDocuments();
//     } catch (error) {
//       console.error(`Error counting objects in ${collectionName}:`, error);
//       throw error;
//     }
//   }

//   /**
//    * Checks if the database connection is alive.
//    * @returns {boolean} Returns true if the database connection is alive, otherwise false.
//    */
//   isAlive(): boolean {
//     return this.client.isConnected();
//   }

//   /**
//    * Creates a new document in the specified collection.
//    * @param {string} collectionName - The name of the collection.
//    * @param {Object} data - The data for the new document.
//    * @returns {Promise<Object>} A promise that resolves with the created document.
//    * @throws {Error} If an error occurs while creating the document.
//    */
//   async create(collectionName: string, data: object): Promise<object> {
//     try {
//       const result = await this.db.collection(collectionName).insertOne(data);
//       return result.ops[0];
//     } catch (error) {
//       console.error(`Error creating document in ${collectionName}:`, error);
//       throw error;
//     }
//   }

//   /**
//    * Updates an existing document in the specified collection.
//    * @param {string} collectionName - The name of the collection.
//    * @param {string} id - The ID of the document to update.
//    * @param {Object} newData - The new data for the document.
//    * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the document was updated.
//    * @throws {Error} If an error occurs while updating the document.
//    */
//   async update(collectionName: string, id: string, newData: object): Promise<boolean> {
//     try {
//       if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
//         const result = await this.db
//             .collection(collectionName)
//             .updateOne({ _id: new ObjectId(id) }, { $set: newData });
//         return result.modifiedCount > 0;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error(`Error updating document in ${collectionName}:`, error);
//       throw error;
//     }
//   }

//   /**
//    * Deletes a document from the specified collection.
//    * @param {string} collectionName - The name of the collection.
//    * @param {string} id - The ID of the document to delete.
//    * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the document was deleted.
//    * @throws {Error} If an error occurs while deleting the document.
//    */
//   async delete(collectionName: string, id: string): Promise<boolean> {
//     try {
//       if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
//         const result = await this.db
//             .collection(collectionName)
//             .deleteOne({ _id: new ObjectId(id) });
//         return result.deletedCount > 0;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error(`Error deleting document in ${collectionName}:`, error);
//       return false; // Return false in case of an error to ensure application stability
//     }
//   }

//   /**
//    * Retrieves a document by its ID from the specified collection.
//    * @param {string} collectionName - The name of the collection.
//    * @param {string} id - The ID of the document to retrieve.
//    * @returns {Promise<Object|null>} A promise that resolves with the retrieved document, or null if not found.
//    * @throws {Error} If an error occurs while retrieving the document.
//    */
//   async getById(collectionName: string, id: string): Promise<object | null> {
//     try {
//       if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
//         const result = await this.db
//             .collection(collectionName)
//             .findOne({ _id: new ObjectId(id) });
//         if (!result) {
//           return null;
//         }
//         return result;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error(
//           `Error getting document by ID in ${collectionName}:`,
//           error,
//       );
//       throw error;
//     }
//   }

//   /**
//    * Retrieves a document from the "users" collection by email.
//    * @param {string} email - The email of the document to retrieve.
//    * @returns {Promise<Object|null>} - A promise that resolves to the retrieved document if found, or null if not found.
//    * @throws {Error} - If there is an error retrieving the document.
//    */
//   async getByEmail(email: string): Promise<object | null> {
//     if (email !== undefined) {
//       try {
//         const result = await this.db
//             .collection("users")
//             .findOne({ email });
//         if (!result) {
//           return null;
//         }
//         return result;
//       } catch (error) {
//         console.error(
//             `Error getting document by Email in users collection:`,
//             error,
//         );
//         throw error;
//       }
//     }
//     return null;
//   }

//   /**
//    * Retrieves all documents from the specified collection.
//    * @param {string} collectionName - The name of the collection.
//    * @param {number} page - The page number for pagination.
//    * @param {number} pageSize - The number of documents per page.
//    * @returns {Promise<Array<Object>>} A promise that resolves with an array of all documents in the collection.
//    * @throws {Error} If an error occurs while retrieving the documents.
//    */
//   async getAll(collectionName: string, page = 1, pageSize = 10): Promise<object[]> {
//     try {
//       const skip = (page - 1) * pageSize;
//       return await this.db.collection(collectionName).find().skip(skip).limit(pageSize).toArray();
//     } catch (error) {
//       console.error(`Error getting all documents in ${collectionName}:`, error);
//       throw error;
//     }
//   }

//   /**
//    * Retrieves documents based on multiple criteria.
//    * @param {string} collectionName - The name of the collection.
//    * @param {Object} filters - The filter criteria for retrieving documents.
//    * @returns {Promise<Array<Object>>} A promise that resolves with an array of documents matching the criteria.
//    * @throws {Error} If an error occurs while retrieving the documents.
//    */
//   async getByCriteria(collectionName: string, filters: object): Promise<object[]> {
//     try {
//       return await this.db.collection(collectionName).find(filters).toArray();
//     } catch (error) {
//       console.error(
//           `Error getting documents by criteria in ${collectionName}:`,
//           error,
//       );
//       throw error;
//     }
//   }
// }

// const dbClient = new DBClient();

// export default dbClient;
