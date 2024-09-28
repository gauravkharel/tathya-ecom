import { z } from "zod";
import { OrderSchema } from "../validators";

export type OrderType = z.infer<typeof OrderSchema>;
