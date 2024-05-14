import config from "../config/index.js";
import Datacubeservices from '../services/datacubeservices.js';

const initDatacube = () => {
    const datacube = new Datacubeservices(config.API_KEY);
    const database = config.DATABASE;
    const collection = config.COLLECTION;
    return { datacube, database, collection };
};

export default initDatacube;