import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database",
    migrationsRun: false,
    entities: [
        "dist/adapters/orm/schemas/*.{ts,js}"
    ],
    migrations: [
        "dist/adapters/orm/migrations/*.{ts,js}"
    ],
});


export default AppDataSource;
