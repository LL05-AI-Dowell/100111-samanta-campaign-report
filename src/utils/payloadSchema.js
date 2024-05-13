import { z } from "zod"

const dataInsertionExample = z.object({
    name: z.string(),
    email: z.string().email(),
});

export {
    dataInsertionExample
}