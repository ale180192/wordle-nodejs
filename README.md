# wordle-nodejs


## Migrations
We use typeORM as our ORM and with this one we handle the migrations of the database

#### Generate migrations
When we do some change to our models, we need to generate the migrations, here we are creating a new file of migrations with the name newChanges, make sure to generate the migrations on the path src/adapters/repositories/orm/migrations
```bash
npm run migration:generate -n src/adapters/orm/migrations/newChanges
```

#### Run migrations
In order to be able of reflect the migrations on the database we need to run this migrations before created.
migrations
```bash
npm run migration:run
```

#### Load dummy data
```bash
npm run db:seed
```
