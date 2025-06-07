import { z } from "zod"

export const budgetSchema = z.object({
    net_salary: z.string()
        .min(1, "Amount is required")
        .transform((val) => Number.parseFloat(val))
        .refine((val) => !Number.isNaN(val) && val >= 0, {
            message: "Amount must be a valid number >= 0"
        }),
    period_start: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Must be a valid date",
    }),
    period_end: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Must be a valid date",
    }),

    label: z.string().min(3, 'Label is required (e.g., "June 2025")'),
    }).refine(
  (data) => new Date(data.period_start) < new Date(data.period_end),
  {
    message: "Start must be before end",
    path: ["period_start"],
  }
)

export const expenseSchema = z.object({
    expenses_type: z.enum(["Need", "Want", "Savings"]),
    expenses_category: z.enum([
        "Lending",
        "Outing",
        "Utility",
        "Lunch",
        "Snacks",
        "Airtime",
        "Hair grooming",
        "Healthcare",
        "Clothing",
        "Wi-Fi",
        "Transport",
        "Groceries",
        "Shopping",
        "Rent"
    ]),
    amount: z
        .string()
        .min(1, "Amount is required")
        .transform((val) => Number.parseFloat(val))
        .refine((val) => !Number.isNaN(val) && val >= 0, {
            message: "Amount must be a valid number >= 0"
        }),
    transaction_cost: z
        .string()
        .min(1, "Transaction amount is required")
        .transform((val) => Number.parseFloat(val))
        .refine((val) => !Number.isNaN(val) && val >= 0, {
        message: "Transaction amount must be a valid number ≥ 0",
        }),
})

export type expenseFormValues = z.infer<typeof expenseSchema>