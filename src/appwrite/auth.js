import { Account, Client, ID,Databases } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
	client = new Client();
	account;
	database;
	
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
		this.database=new Databases(this.client)
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// call another method
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getUserByUserID(userId){
		try {
			await this.database.getUserName(userId) 
		} catch (error) {
			console.log("Appwrite serive :: getUserByUserId :: error", error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite serive :: getCurrentUser :: error", error);
		}

		return null;
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite serive :: logout :: error", error);
		}
	}
	
}

const authService = new AuthService();

export default authService;
