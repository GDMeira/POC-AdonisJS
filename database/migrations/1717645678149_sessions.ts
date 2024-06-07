import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SessionsSchema extends BaseSchema {
  protected tableName = 'sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token', 64).notNullable()
      table.integer('user_id').notNullable().unsigned().references('users.id')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
