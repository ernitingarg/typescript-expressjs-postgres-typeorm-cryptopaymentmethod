import { MigrationInterface, QueryRunner } from "typeorm";
import { PaymentMethod } from "../entities/PaymentMethod";
import { PaymentOption } from "../enums/PaymentOption";

const paymentMethodsSeedData = [
  {
    id: PaymentOption.Nets,
    description: "Pay by NETS (Network for Electronic Transfers)",
  },
  {
    id: PaymentOption.Visa,
    description: "Pay by Visa/Master card",
  },
  {
    id: PaymentOption.Crypto,
    description: "Pay by Cryptos",
  },
];

export class MigrationSeed1689427418203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const repository = queryRunner.manager.getRepository(PaymentMethod);
      await repository.insert(paymentMethodsSeedData);
      console.log("Payment options seed data inserted successfully!");
    } catch (error) {
      console.error("Error inserting seed data:", error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      const repository = queryRunner.manager.getRepository(PaymentMethod);
      const paymentMethods = await repository.find({
        where: paymentMethodsSeedData.map((data) => ({ id: data.id })),
      });
      await repository.remove(paymentMethods);
      console.log("Payment options seed data removed successfully!");
    } catch (error) {
      console.error("Error removing seed data:", error);
    }
  }
}
