ALTER TABLE "borrow_records" ALTER COLUMN "borrow_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "borrow_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "due_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "status" SET DEFAULT 'PENDING';