import PayloadValidationServices from "./validationservices.js";
import { campaignSchema, userInfoSchema } from "../utils/payloadSchema.js"
import {calculateDateRanges, datacubeDetails} from "../utils/helper.js"
import Datacubeservices from './datacubeservices.js';


const organizationReports = async(timeInterval, startDate, endDate,creatorId ,apiKey,limit,offset)=>{
    
    const validatePayload = PayloadValidationServices.validateData(campaignSchema, {
        timeInterval: timeInterval,
        startDate: startDate,
        endDate: endDate,
        creatorId: creatorId,
        limit: limit,
        offset: offset,
        apiKey: apiKey
    });

    if (!validatePayload.isValid) {
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        }
    }
    const datacube = new Datacubeservices(apiKey);
    const dateInterval = calculateDateRanges(timeInterval, startDate, endDate);
   
    const response = await datacube.dataRetrieval(
        datacubeDetails(creatorId).database_name,
        datacubeDetails(creatorId).campaign_details,
        {
            creator_id: creatorId,
            created_at: {
                $gte: dateInterval.start_date,
                $lte: dateInterval.end_date
            }
        },
        limit,
        offset
    );
  
    const campaignsData = response.data;
    const report = {
        totalCampaigns: campaignsData.length,
        broadcastTypeCount: { EMAIL: 0, SMS: 0 },
        frequencyCount: { DAILY: 0, WEEKLY: 0, FORTNIGHTLY: 0, MONTHLY: 0, QUARTERLY: 0 },
        totalAudiences: 0,
        totalLeadsLinks: 0,
        activeCampaigns: 0,
        inactiveCampaigns: 0,
        campaignDetails: []
    };
    
    campaignsData.forEach(campaign => {
        if (campaign.broadcast_type === 'EMAIL') {
            report.broadcastTypeCount.EMAIL++;
        } else if (campaign.broadcast_type === 'SMS') {
            report.broadcastTypeCount.SMS++;
        }

        if (campaign.is_active) {
            report.activeCampaigns++;
        } else {
            report.inactiveCampaigns++;
        }

        switch (campaign.frequency) {
            case 'DAILY':
                report.frequencyCount.DAILY++;
                break;
            case 'WEEKLY':
                report.frequencyCount.WEEKLY++;
                break;
            case 'FORTNIGHTLY':
                report.frequencyCount.FORTNIGHTLY++;
                break;
            case 'MONTHLY':
                report.frequencyCount.MONTHLY++;
                break;
            case 'QUARTERLY':
                report.frequencyCount.QUARTERLY++;
                break;
        }

        const campaignDetail = {
            id: campaign._id,
            title: campaign.title,
            emailCount: campaign.audiences.length,
            linkCount: campaign.leads_links.length
        };

        report.totalAudiences += campaignDetail.emailCount;
        report.totalLeadsLinks += campaignDetail.linkCount;
        report.campaignDetails.push(campaignDetail);
    });

    return {
        success: true,
        message: "Campaign list fetched successfully",
        response: report
    }
}

const userInfo = async (creatorId ,apiKey) => {
    const validatePayload = PayloadValidationServices.validateData(userInfoSchema, {
        creatorId: creatorId,
        apiKey: apiKey
    });

    if (!validatePayload.isValid) {
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        }
    }
    const datacube = new Datacubeservices(apiKey);
    const response = await datacube.dataRetrieval(
        datacubeDetails(creatorId).database_name,
        datacubeDetails(creatorId).user_info,
        {
            workspace_id: creatorId
        },
        1,
        0
    );

    if(!response.success){
        return {
            success: false,
            message: "Failed to retrieve user data from databse",
        }
    }

    return {
        success: true,
        message: "User data retrieve from the databse was successful",
        response: response.data
    }
}

export {
    organizationReports,
    userInfo
}