const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  type: 'sqlite',
  database: `${process.env.DB_NAME}.sqlite`,
  logging: JSON.parse(process.env.DB_LOG),
  entities: [
      "src/**/*entity.ts"
  ],
  migrations: ["migrations/files/*.ts"],
  cli: {
    migrationsDir: 'migrations/files'
  }
}
