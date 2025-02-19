import { Client, Account, OAuthProvider, Storage , ID, Databases }  from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_API_END_POINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);
const projectID = import.meta.env.VITE_PROJECT_ID;
const endPoint = import.meta.env.VITE_API_END_POINT;

//db 
const databases = new Databases(client);
const databaseId = import.meta.env.VITE_DATABASE_ID;

//userdbInfo
const collectionId = import.meta.env.VITE_USER_COLLECTION_ID;

//db for withdrawal
const withdrawalCollectionId = import.meta.env.VITE_WITHDRAWALS_COLLECTION_ID;

//storage
const storage = new Storage(client);
const bucket = import.meta.env.VITE_STORAGE_BUCKET;


export {client, account, databases, OAuthProvider, databaseId,withdrawalCollectionId, collectionId, storage, bucket, projectID, endPoint};

export { ID } from "appwrite";