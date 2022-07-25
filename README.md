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

### test users
user: alex1@test.com
password: secure

user: alex2@test.com
password: secure

user: alex4@test.com
password: secure

### Posman collection and environment.json
This repository include the postman collection `ddd360.postman_collection`
environment: `ddd360.postman_environment`


### Run project
Create a file `.env` at the root folder with the below vars
```txt
NODE_ENV=development
PORT=3000
TOKEN_KEY=sdgslkhlkh5345lkjlghklk34xzf!@#$

```
```bash
npm install
npm run dev
```

### Tests
```bash
npm run test
```


### TODO's
* change the console.log to morgan logger
* add inyection of dependencies
