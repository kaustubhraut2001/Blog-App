import { conf } from '../Conf/conf';
import { Client, Account, ID } from 'appwrite';

export class Authservice {

    client = new Client();
    account;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl) // Your API Endpoint
            .setProject(conf.projectid) // Your project ID
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {

        try {
            const useraccount = this.account.create(ID.unique, email, password, name);

            if (useraccount) {
                // we can directly login that user

                return useraccount;

            } else {
                throw new Error('Error creating account');
            }

        } catch (error) {
            throw new Error(error);

        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw new Error(error);
        }

    }

    async getcurrentuser() {
        try {
            // for getting the current user
            return await this.account.get();

        } catch (error) {
            throw new Error(error);

        }

        return null;
    }


    async logout() {
        try {

            await this.account.deleteSessions();

        } catch (error) {

            throw new Error(error);

        }
    }

}

const authservice = new Authservice();







export default authservice;