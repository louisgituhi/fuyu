CREATE TYPE "public"."expense_category" AS ENUM('Groceries', 'Transport', 'Grooming', 'Healthcare', 'Airtime', 'Food', 'Utilities', 'Entertainment', 'Savings', 'Investments', 'Lending');--> statement-breakpoint
CREATE TYPE "public"."expense_type" AS ENUM('Need', 'Want', 'Saving');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"budget_id" serial NOT NULL,
	"expenses_type" "expense_type" NOT NULL,
	"expenses_category" "expense_category" NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"transaction_cost" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monthly_budget_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"net_salary" numeric(10, 2) NOT NULL,
	"entry_date" date DEFAULT now() NOT NULL,
	"period_start" date NOT NULL,
	"period_end" date NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses_table" ADD CONSTRAINT "expenses_table_budget_id_monthly_budget_table_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."monthly_budget_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_budget_table" ADD CONSTRAINT "monthly_budget_table_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;