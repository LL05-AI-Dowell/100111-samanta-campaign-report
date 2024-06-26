import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { campaignSchema,userInfoSchema, linkInfoSchema } from "../utils/payloadSchema.js"
import {calculateDateRanges, datacubeDetails} from "../utils/helper.js"
import Datacubeservices from '../services/datacubeservices.js';


const campaignlists = asyncHandler(async (req, res) => {
    const { timeInterval, startDate, endDate, creatorId, limit, offset } = req.body;

    const apiKey = req.headers['authorization'];
    if (!apiKey || !apiKey.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Please provide the API key",
        });
    }

    const datacube = new Datacubeservices(apiKey.split(' ')[1]);

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
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

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
            status: campaign.is_active,
            linkCount: campaign.leads_links.length
        };

        report.totalAudiences += campaignDetail.emailCount;
        report.totalLeadsLinks += campaignDetail.linkCount;
        report.campaignDetails.push(campaignDetail);
    });

    return res.status(200).json({
        success: true,
        message: "Campaign list fetched successfully",
        response: report
    });
});

const userInfo = asyncHandler( async(req, res) => {
    const creatorId  = req.query.creator_id;

    console.log(creatorId);

    const apiKey = req.headers['authorization'];
    if (!apiKey || !apiKey.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Please provide the API key",
        });
    }

    const datacube = new Datacubeservices(apiKey.split(' ')[1]);

    const validatePayload = PayloadValidationServices.validateData(userInfoSchema, {
        creatorId: creatorId,
        apiKey: apiKey
    });


    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

    const response = await datacube.dataRetrieval(
        datacubeDetails(creatorId).database_name,
        datacubeDetails(creatorId).user_info,
        {
            workspace_id: creatorId
        },
        1,
        0
    );
    console.log(response);

    if(!response.success) {
        return res.status(404).json({
            success: false,
            message: response.message
        });
    }

    return res.status(200).json({
        success: true,
        message: "User info fetched successfully",
        response: response.data
    });
})

const linksReportForCampaign = asyncHandler(async(req, res) => {

    const { campaignId, creatorId, limit, offset } = req.body;

    const apiKey = req.headers['authorization'];
    if (!apiKey || !apiKey.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Please provide the API key",
        });
    }

    const validatePayload = PayloadValidationServices.validateData(linkInfoSchema, {
        creatorId: creatorId,
        campaignId: campaignId,
        apiKey: apiKey,
        limit: limit,
        offset: offset
    });

    if (!validatePayload.isValid) {
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        }
    }

    const datacube = new Datacubeservices(apiKey.split(' ')[1]);
    const response = await datacube.dataRetrieval(
        datacubeDetails(creatorId).database_name,
        datacubeDetails(creatorId).links,
        {
            creator_id: creatorId,
            campaign_id: campaignId

        },
        limit,
        offset
    );

    if (!response.success) {
        return {
            success: false,
            message: "Failed to retrieve link data from databse",
        }
    }
    
    const linkData = response.data

    const report = linkData.map(link => ({
        campaignId: link.campaign_id,
        url: link.url,
        isCrawled: link.is_crawled,
        lengthOfLinks: link.links.length,
        added_at: link.added_at,
        links: link.links
    }));

    return res.status(200).json({
        success: true,
        message: "Link list fetched successfully",
        response: report
    });
})

export {
    campaignlists,
    userInfo,
    linksReportForCampaign
}