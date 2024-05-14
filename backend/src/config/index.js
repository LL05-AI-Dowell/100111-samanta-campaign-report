import dotenv from 'dotenv';

dotenv.config()

const config = {
    PORT : process.env.PORT,
    API_KEY : process.env.API_KEY,
    DATABASE : process.env.DATABASE,
    COLLECTION : process.env.COLLECTIONNAME,
}


export default config