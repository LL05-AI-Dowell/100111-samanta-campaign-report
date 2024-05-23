import { z } from "zod"
import { reportInterval } from "./helper.js"

const campaignSchema = z.object({
    timeInterval: z.nativeEnum(Object.values(reportInterval)),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    creatorId: z.string(),
    limit: z.number(),
    offset: z.number(),
    apiKey: z.string()
});


export {
    campaignSchema
}