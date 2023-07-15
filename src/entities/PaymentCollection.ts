import { Entity, Column, PrimaryColumn } from "typeorm";

/**
 * Represents a payment collection entity in the application's ORM context.
 * This entity class is used for ORM to map to a database table.
 */
@Entity()
export class PaymentCollection {
  @PrimaryColumn()
  payment_reference: string;

  @Column()
  order_currency: string;

  @Column("decimal", { precision: 10, scale: 2 })
  order_amount: number;

  @Column({ type: "timestamp" })
  expiry_date: Date;

  @Column()
  notify_secret: string;

  @Column()
  access_token: string;

  @Column()
  token_type: string;

  @Column()
  expires_in: number;

  @Column()
  hosted_url: string;

  @Column({ nullable: true })
  crypto_currency: string | null;

  @Column("decimal", { precision: 20, scale: 8, nullable: true })
  crypto_amount: number | null;
}
