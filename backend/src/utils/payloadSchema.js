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

const userInfoSchema = z.object({
    creatorId: z.string(),
    apiKey: z.string()
});

const linkInfoSchema = z.object({
    creatorId: z.string(),
    campaignId: z.string(),
    apiKey: z.string(),
    limit: z.number(),
    offset: z.number()
})

export {
    campaignSchema,
    userInfoSchema,
    linkInfoSchema
}