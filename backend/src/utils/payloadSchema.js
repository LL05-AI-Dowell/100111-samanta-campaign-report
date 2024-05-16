import { z } from "zod"
import { reportInterval } from "./helper.js"

const campaignSchema = z.object({
    timeInterval: z.nativeEnum(Object.values(reportInterval)),
    startDate: z.string().optional(),
    endDate: z.string().optional()
});

export {
    campaignSchema
}