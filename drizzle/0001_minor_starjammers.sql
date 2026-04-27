ALTER TABLE "transactions" ADD COLUMN "card_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "type" "type_enum";--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "operation_id" integer NOT NULL;