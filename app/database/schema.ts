import { pgTable, timestamp, numeric, pgEnum, text, serial, date, boolean } from "drizzle-orm/pg-core"

export const expensesCategory = pgEnum("exp_category", 
    ["Rent", "Shopping", "Groceries", "Transport", "Wi-Fi", "Clothing", "Healthcare", "Hair grooming", "Airtime", "Snacks", "Launch", "Utility", "Outing", "Lending"]
)
export const expensesType = pgEnum("exp_type", ["Need", "Want", "Savings"])

export const user = pgTable("user", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const monthlyBudgetTable = pgTable("monthly_budget_table", {
    id: serial().primaryKey(),
    user_id: text().references(() => user.id, { onDelete: 'cascade'}),
    net_salary: numeric({ precision: 10, scale: 2 }).notNull(),
    entry_date: date().notNull().defaultNow(),
    period_start: date().notNull(),
    period_end: date().notNull(),
    label: text().notNull(),
    created_at: timestamp().defaultNow()
});

export const expensesTable = pgTable("expenses_table", {
    id: serial().primaryKey(),
    budget_id: serial().references(() => monthlyBudgetTable.id, { onDelete: 'cascade' }),
    expenses_type: expensesType().notNull(),
    expenses_category: expensesCategory().notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    transaction_cost: numeric({ precision: 10, scale: 2 }).notNull(),
    created_at: timestamp().defaultNow()
})

