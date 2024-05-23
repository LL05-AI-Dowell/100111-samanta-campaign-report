import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { campaignSchema } from "../utils/payloadSchema.js"
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


export {
    campaignlists
}