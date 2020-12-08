## Notes-API

## To Set up the env

1. Clone `.env.example` file then rename it to `.env`
   Add your personal values

2. Install dependencies

```
yarn install
```

3. Download nad install MongoDB:
   via `brew`:

```
brew tap mongodb/brew
$ brew install mongodb-community@4.2
```

## To Run the Application

1. Start your local MongoDB:

```
brew services start mongodb-community
```
or
```
brew services start mongodb-community@4.2
```

`Note`: that once you started local mongoDB it's working berofe you shotdown it manually

2. To start the app by running:

```
npm run dev
```

## Related Repositories

- [WEB 🗄️ ](https://github.com/vlad-serdyuk/notes-web)