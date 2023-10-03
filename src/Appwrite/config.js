import conf from './Conf/conf.js';
import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';


export class DatabaseService {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl) // Your API Endpoint
            .setProject(conf.projectid) // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createpost({ title, slug, content, featuredimage, status, userID }) {

        try {

            return await this.databases.createDocument(
                conf.databaseid,
                conf.collectionid,
                slug, {
                    title,

                    content,
                    featuredimage,
                    status,
                    userID

                }
            )
        } catch (error) {
            throw new Error(error);
        }

    }

    async updatepost(slug, { title, content, featuredimage, status }) {

        try {
            await this.databases.updateDocument(
                conf.databaseid,
                conf.collectionid,
                slug, {
                    title,
                    content,
                    featuredimage,
                    status
                }
            );



        } catch (error) {
            throw new Error(error);

        }

    }

    async deletepost(slug) {
        try {

            await this.databases.deleteDocument(
                conf.databaseid,
                conf.collectionid,
                slug
            );
            return true;
        } catch (error) {
            throw new Error(error);

        }
    }

    async getpost(slug) {
        try {
            await this.databases.getDocument(
                conf.databaseid,
                conf.collectionid,
                slug
            );


        } catch (error) {
            throw new Error(error);

        }
    }

    async getwithstatus(queries = [Query.equal("status", "active")]) {
        try {

            return await this.databases.listDocuments(
                conf.databaseid,
                conf.collectionid,
                queries


            );



        } catch (error) {
            throw new Error(error);


        }
    }


    //uploading the image/file

    async uploadfile(file) {
        try {
            await this.bucket.createFile(
                conf.bucketid,
                ID.unique,
                file,


            );
            return true;

        } catch (error) {
            throw new Error(error);
            return false;

        }

    }

    async deletfile(fileId) {
        try {

            await this.bucket.deleteFile(
                conf.bucketid,
                fileId
            );
            return true;

        } catch (error) {
            throw new Error(error);

        }

    }

    async getfilepreview(fileId) {

        try {
            await this.bucket.getFilePreview(
                conf.bucketid,
                fileId,

            );

            return true;

        } catch (error) {
            throw new Error(error);
            return false;
        }

    }

}

const dataservice = new DatabaseService();;

export default dataservice;