import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class AddFKTransactionsCategories1605051475030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                name: 'FKTransactionCategory',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'FKTransactionCategory');
    }

}
