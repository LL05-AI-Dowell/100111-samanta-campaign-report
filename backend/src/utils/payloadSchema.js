import { z } from "zod"
import { reportInterval } from "./helper.js"

const campaignSchema = z.object({
    timeInterval: z.nativeEnum(Object.values(reportInterval)),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    workspaceId: z.string(),
    userId: z.string()
});
const campaignTestSchema = z.object({
    timeInterval: z.nativeEnum(Object.values(reportInterval)),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    workspaceId: z.string().optional(),
    userId: z.string().optional()
});

export {
    campaignSchema,
    campaignTestSchema
}