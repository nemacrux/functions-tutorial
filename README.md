#README

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

##### Upgrade dependencies to last versions

```
npm install firebase-admin@latest firebase-functions@latest
```

#### Using this repo

- Install and upgrade dependencies
- Run `npm install`
- Deploy

#### Deploy the function(s)

run `firebase deploy`
