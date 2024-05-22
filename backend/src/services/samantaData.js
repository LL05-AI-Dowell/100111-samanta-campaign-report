import initDatacube from "./datacubeservices.js";
import PayloadValidationServices from "./validationservices.js";
import { campaignSchema } from "../utils/payloadSchema.js"
import {formatDateTime, calculateDateRange} from "../utils/helper.js"
import { campaigns } from "../utils/dummydata.js";


const fetchDataFromDatacube = async(timeInterval, startDate, endDate,workspaceId,userId)=>{

    // const { datacube, database, collection } = initDatacube();

    const validatePayload = PayloadValidationServices.validateData(campaignSchema, {
        timeInterval: timeInterval,
        startDate: startDate,
        endDate: endDate,
        workspaceId: workspaceId,
        userId: userId
    });

    if (!validatePayload.isValid) {
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        }
    }

    const dateInterval = calculateDateRange(timeInterval, startDate, endDate);

    const filteredCampaigns = campaigns.filter(campaign => {
        const campaignDate = new Date(campaign.date);
        const startDate = new Date(dateInterval.start_date);
        const endDate = new Date(dateInterval.end_date);
        
        return campaignDate >= startDate && campaignDate <= endDate;
    });

    const data = campaigns;

    return {
        success: true,
        message: "Campaign list fetched successfully",
        response: {
            data,
            filteredCampaigns
        }
    }
}


export {
    fetchDataFromDatacube
}