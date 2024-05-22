// import conf from "../conf/conf";

// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Service {
//   client = new Client();
//   databases;
//   bucket;
//   constructor() {
//     this.client
//       .setEndpoint(conf.appwriteUrl)
//       .setProject(conf.appwriteProjectId);

//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//   }
//   async createPost({ title, slug, content, featuredImage, status, userId }) {
//     try {
//       return await this.databases.createDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug,
//         {
//           title,
//           content,
//           featuredImage,
//           status,
//           userId,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite service :: createPost :: error", error);
//     }
//   }

//   async updatePost(slug, { title, content, featuredImage, status }) {
//     try {
//       return await this.databases.updateDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug,
//         {
//           title,
//           content,
//           featuredImage,
//           status,
//         }
//       );
//     } catch (error) {
//       console.log("Appwrite service :: updatePost :: error", error);
//     }
//   }

//   async deletePost(slug) {
//     try {
//       return await this.databases.deleteDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug
//       );
//       return true;
//     } catch (error) {
//       console.log("Appwrite services :: deletePost :: error", error);
//       return false;
//     }
//   }

//   async getPost(slug) {
//     try {
//       await this.databases.getDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteCollectionId,
//         slug
//       );
//     } catch (error) {
//       console.log("Appwrite service :: getPost :: error ", error);
//       return false;
//     }
//   }

//   async getPosts(queries = [Query.equal("status", "active")]){
//     try {
//         return await this.databases.listDocuments(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             queries,

//         )
//     } catch (error) {
//         console.log("Appwrite serive :: getPosts :: error", error);
//         return false
//     }
// }

//   // File upload services

//   async uploadFile(file) {
//     try {
//       return await this.bucket.createFile(
//         conf.appwriteBucketId,
//         ID.unique(),
//         file
//       );
//     } catch (error) {
//       console.log("Appwrite service :: uploadFile :: error", error);
//       return false;
//     }
//   }

//   async deleteFile(fileID) {
//     try {
//       return await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
//       return true;
//     } catch (error) {
//       console.log("Appwrite services :: deletePost :: error", error);
//       return false;
//     }
//   }

//   getFilePreview(fileID) {
//     return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
//   }
// }

// export const service = new Service();
// export default service;

import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ titles, slug, content, featuredImage, status, userID }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					titles,
					content,
					featuredImage,
					status,
					userID,
				}
			);
		} catch (error) {
			console.log("Appwrite serive :: createPost :: error", error);
		}
	}

	async updatePost(slug, { titles, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					titles,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log("Appwrite serive :: updatePost :: error", error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite serive :: deletePost :: error", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite serive :: getPost :: error", error);
			return false;
		}
	}

	async getPosts() {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId
				// queries
			);
		} catch (error) {
			console.log("Appwrite serive :: getPosts :: error", error);
			return false;
		}
	}

	// file upload service

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite serive :: uploadFile :: error", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite serive :: deleteFile :: error", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Appwrite serive :: getFilePreview :: error", error);
			return false;
		}
	}
	
}

const service = new Service();
export default service;
