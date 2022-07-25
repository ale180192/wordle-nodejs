import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database",
    migrationsRun: false,
    entities: [
        "src/adapters/orm/schemas/*.{ts,js}"
    ],
    migrations: [
        "src/adapters/orm/migrations/*.{ts,js}"
    ],
});


export default AppDataSource;
