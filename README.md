Personal notes on Cloud Functions for Firebase tutorials

#### Required dependencies

- nodejs [(install with nvm)](https://github.com/nvm-sh/nvm)
- firebase-tools: `npm install -g firebase-tools`

#### Steps to start a project new project

- Create a new Firebase project
- Make a new folder and `cd` into it
- Login into Firebase: `firebase login`
- Initialize the project: `firebase init`
- Select **Functions** and **typescript** as language
- Install dependencies: `npm install`

#### Upgrade dependencies to last versions

```
npm install firebase-admin@latest firebase-functions@latest
```

#### Using this repo

- Install and upgrade dependencies
- Run `npm install`
- Deploy

#### Deploy the function(s)

run `firebase deploy`

#### Run the project locally (for testing)

You can run the function(s) locally on your computer to test the code:

- Check for errors: `npm run-script lint`
- Compile typescript: `npm run-script build`

Now emulate the function(s):

```
firebase serve --only functions
```

#### Environment variables

```
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```

Only lowercase characters are accepted in keys.

##### Check environment variables (console)

```
firebase functions:config:get
```

##### Remove environment variables (console)

```
firebase functions:config:unset [path]
```

##### Get environment variables in the code

```
functions.config().someservice.id
```

##### Environment variables in local environment

You have to load the configuration in a JSON file

```
firebase functions:config:get > .runtimeconfig.json
```

#### Test the function(s)

Use your browser or `curl` to check the URL given by the command line
