import PayloadValidationServices from "./validationservices.js";
import { campaignSchema, userInfoSchema, linkInfoSchema } from "../utils/payloadSchema.js";
import { calculateDateRanges, datacubeDetails, logError, logInfo } from "../utils/helper.js";
import Datacubeservices from './datacubeservices.js';

const organizationReports = async (timeInterval, startDate, endDate, creatorId, apiKey, limit, offset) => {
    logInfo(`Starting organizationReports with parameters: ${JSON.stringify({ timeInterval, startDate, endDate, creatorId, apiKey, limit, offset })}`);

    const validatePayload = PayloadValidationServices.validateData(campaignSchema, {
        timeInterval,
        startDate,
        endDate,
        creatorId,
        limit,
        offset,
        apiKey
    });

    if (!validatePayload.isValid) {
        logError(`Invalid payload for organizationReports: ${JSON.stringify(validatePayload.errors)}`);
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        };
    }

    const datacube = new Datacubeservices(apiKey);
    const dateInterval = calculateDateRanges(timeInterval, startDate, endDate);

    try {
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

        if (!response.success) {
            logError(`Data retrieval failed for organizationReports: ${response.message}`);
            return {
                success: false,
                message: response.message
            };
        }

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

        logInfo('Organization report fetched successfully');
        return {
            success: true,
            message: "Campaign list fetched successfully",
            response: report
        };
    } catch (error) {
        logError(`Error in organizationReports: ${error.message}`);
        return {
            success: false,
            message: "Failed to fetch organization report",
            error: error.message
        };
    }
};

const userInfo = async (creatorId, apiKey) => {
    logInfo(`Starting userInfo with parameters: ${JSON.stringify({ creatorId, apiKey })}`);

    const validatePayload = PayloadValidationServices.validateData(userInfoSchema, {
        creatorId,
        apiKey
    });

    if (!validatePayload.isValid) {
        logError(`Invalid payload for userInfo: ${JSON.stringify(validatePayload.errors)}`);
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        };
    }

    const datacube = new Datacubeservices(apiKey);

    try {
        const response = await datacube.dataRetrieval(
            datacubeDetails(creatorId).database_name,
            datacubeDetails(creatorId).user_info,
            { workspace_id: creatorId },
            1,
            0
        );

        if (!response.success) {
            logError(`Data retrieval failed for userInfo: ${response.message}`);
            return {
                success: false,
                message: "Failed to retrieve user data from database",
            };
        }

        logInfo('User data retrieved successfully');
        return {
            success: true,
            message: "User data retrieve from the database was successful",
            response: response.data
        };
    } catch (error) {
        logError(`Error in userInfo: ${error.message}`);
        return {
            success: false,
            message: "Failed to fetch user info",
            error: error.message
        };
    }
};

const linksReport = async (creatorId, campaignId, apiKey, limit, offset) => {
    logInfo(`Starting linksReport with parameters: ${JSON.stringify({ creatorId, campaignId, apiKey, limit, offset })}`);

    const validatePayload = PayloadValidationServices.validateData(linkInfoSchema, {
        creatorId,
        campaignId,
        apiKey,
        limit,
        offset
    });

    if (!validatePayload.isValid) {
        logError(`Invalid payload for linksReport: ${JSON.stringify(validatePayload.errors)}`);
        return {
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        };
    }

    const datacube = new Datacubeservices(apiKey);

    try {
        const response = await datacube.dataRetrieval(
            datacubeDetails(creatorId).database_name,
            datacubeDetails(creatorId).links,
            { creator_id: creatorId, campaign_id: campaignId },
            limit,
            offset
        );

        if (!response.success) {
            logError(`Data retrieval failed for linksReport: ${response.message}`);
            return {
                success: false,
                message: "Failed to retrieve link data from database",
            };
        }

        const linkData = response.data;

        const report = linkData.map(link => ({
            campaignId: link.campaign_id,
            url: link.url,
            isCrawled: link.is_crawled,
            lengthOfLinks: link.links.length,
            added_at: link.added_at,
            links: link.links
        }));

        logInfo('Link report fetched successfully');
        return {
            success: true,
            message: "Link list fetched successfully",
            response: report
        };
    } catch (error) {
        logError(`Error in linksReport: ${error.message}`);
        return {
            success: false,
            message: "Failed to fetch links report",
            error: error.message
        };
    }
};

export {
    organizationReports,
    userInfo,
    linksReport
};
