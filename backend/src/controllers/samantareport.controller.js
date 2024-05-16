import { asyncHandler } from "../utils/asyncHandler.js";
import initDatacube from "../utils/datacubeHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { campaignSchema } from "../utils/payloadSchema.js"
import {formatDateTime, calculateDateRange} from "../utils/helper.js"
import { campaigns } from "../utils/dummydata.js"

const campaignlist = asyncHandler(async (req, res) => {
    const { timeInterval, startDate, endDate } = req.body;

    const validatePayload = PayloadValidationServices.validateData(campaignSchema, {
        timeInterval: timeInterval,
        startDate: startDate,
        endDate: endDate
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

    const dateInterval = calculateDateRange(timeInterval, startDate, endDate);

    const filteredCampaigns = campaigns.filter(campaign => {
        const campaignDate = new Date(campaign.date);
        const startDate = new Date(dateInterval.start_date);
        const endDate = new Date(dateInterval.end_date);
        
        return campaignDate >= startDate && campaignDate <= endDate;
    });

    return res.status(200).json({
        success: true,
        message: "Campaign list fetched successfully",
        response: filteredCampaigns
    });
});

export {
    campaignlist
}