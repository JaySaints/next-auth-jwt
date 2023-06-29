# Login-App

### Simple authentication app with Next 13 and next-auth using jwt strategy

Download or clone from repository:

```
> git clone https://github.com/JaySaints/next-auth-jwt.git
```

Enter the `next-auth-jwt` directory:

```
> cd next-auth-jwt
```

Install the dependencies:

```
> npm install
```

Put the mongodb URI in the `.env` file:

```
MONGODB_URI=mongodb://127.0.0.1:27017/
```

Define the database name in the `.env` file:

```
MONGODB_DB_NAME=auth_next
```

Define a keyword for the next auth secret in the `.env` file:

```
NEXTAUTH_SECRET=secret
```

Now start the application:

```
> npm run dev
```

### There are three types of routing:

- For ordinary users;
- For admin users;
- For guest users (unauthenticated);

> Note: To access the admin pages you must change the user rule type to `admin` in the database.
