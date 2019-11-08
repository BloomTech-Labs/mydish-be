🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.
# Title: RecipeShare

You can find the deployed project at WORK IN PROGRESS(REACT-NATIVE) [🚫URL NAME GOES HERE](🚫copy and paste URL here).

## Contributors

|                                       [Yurika](https://github.com/yuri77)                                        |                                       [Lou](https://github.com/antilou86)                                        |                                       [Catherine](https://github.com/ katerinjo)                                        |                                       [Amir](https://github.com/https://github.com/ayunas)                                        |                                                      |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/)                       |                      [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)

more info on using badges [here](https://github.com/badges/shields), [make your own] (https://shields.io/#your-badge)
# API Documentation

#### 1️⃣ Backend delpoyed at Heroku (https://recipeshare-development.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend framework goes here

 NodeJs/Express/knex

-    at the beginning of the project about hald the devs knew Node/express and half knew Java/spring. Team concensus was that Node would be easier to learn for the Java folk
-    Sticking to a Javascript language framework on the front end and back end would make transitioning between front and back end teams easier when roles would need to change.

# Endpoints

## Account

POST `/cooks/register`

```js
body = {
  username,
  password
};
res = {
  id: "(number) the ID of the user/cook",
  token: "authentication token for the session"
};
```

POST `/cooks/login`

```js
body = {
  username,
  password
};
res = {
  id: "(number) the ID of the user/cook",
  token: "authentication token for the session"
};
```

PUT `/cooks/self` modify account details e.g. password (auth)

```js
body = {
  username: "(optional string)",
  password: "(optional string)"
};
res = {
  message: `cook updated`
};
```

DELETE `/cooks/self` delete account (auth)

```js
res = {
  message: "account deleted"
};
```

GET `/cooks` get brief info on all cooks

```js
res = {
  cooks: [
    {
      id,
      username
    }
  ]
};
```

GET `/cooks/:id` get detailed info about one cook

## Recipes

GET `/recipes/all` get brief info on all recipes, filtered if given query string

```js
res = {
  recipes: [
    {
      id,
      title,
      img: "(string) url of the food photo",
      minutes,
      innovator_id:
        "(number) the ID of the cook who created or modified the recipe",
      total_saves,
      username
    }
  ]
};
```

GET `/recipes?title=foo` search for recipes with given string in the name

```js
res = {
  recipes: [
    {
      id,
      title,
      img: "(string) url for a photo of food",
      minutes,
      innovator_id: "(number) the ID of the innovator who created this recipe",
      total_saves,
      username
    }
  ]
};
```

POST `/recipes` add a new recipe (auth)

```js
  body = {
    title,
    minutes: "(optional number) time to make, adding more types of minutes in the works",
    img: "(optional string) url of an image of the food"
    notes: "(optional string) free-form notes about the recipe",
    categories: [
      "(string) category/tag name"
    ],
    ingredients: [
      {
        name,
        quantity: "(number)",
        unit: "(string) example- mL or g or cups"
      }
    ],
    steps: [
      body: "(string) step 1 blah blah blah"
    ],
    ancestor: "(optional number) the ID of the previous version of this recipe"
  };
```

GET `/recipes/:id` get detailed info about one recipe

```js
res = {
  title,
  minutes: "(optional number) preparation time in minutes",
  img: "(string) url of an image of food prepared with the recipe"
  notes: "(optional) free-form notes about the recipe",
  "(optional) categories": [
    "(string) category/tag name"
  ],
  ingredients: [
    {
      name,
      quantity: "(number)",
      unit: "(string) example- mL or g or cups"
    }
  ],
  total_saves: "(number) total saves",
  steps: [
    "(string) list of steps in order"
  ],
  innovator: "(number) ID of innovator who created or last edited this recipe",
  ancestor: "(optional number) the ID of the previous version of this recipe",
  innovator_name: "(string) the username of the innovator"
};
```

# Data Model

🚫This is just an example. Replace this with your data model


## 2️⃣ Actions

# cooks

`insert(cook)` -> adds a cook to cooks table

`findByUsername(username) ` -> Returns a single cook by username

`all()` -> Returns the all cooks

`findById(id)` -> returns a single cook by ID

`remove(id)` -> Delete a cook by ID

`update(id, changes)` -> Find a user by ID and update by specified changes
<br>
<br>
<br>

# recipes

`insertRecipe({ steps, ingredients, ancestor, innovator, categories, ...recipesEntry })` -> adds recipe to the appropriate tables on the DB

`findRecipeById(id)` -> Returns a single recipe by recipe ID

`findByTitle(title)` -> returns a recipe by exact title match

`searchByTitle(title)` -> returns all recipes that match a fuzzy search
<br>
<br>
<br>

# cookbook

`cookbookFindById(cookId)` -> returns an array of recipeIDs for recipes saved by cook id

`cookbookInsert(recipeId, cookId)` -> adds recipe_id and cook_id to saves table

`cookbookRecipeDelete(recipeId, cookId)` -> deletes entry from the saves table

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  PORT - local port for development
    *  NODE_ENV - set to "development" until ready for "production"
    *  DB_NAME - set this to the name of your local development database
    *  DB_USERNAME - set this to the name of your local development database username, in production this is set in heroku settings. 
    *  DB_PASSWORD - set this to the name of your local development database password, in production this is set in heroku settings. 
    *  DATABASE_URL - set to your localhost and port number in development and deployment URL in production
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.     

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/cooking-recipe-source-control-fe/blob/master/README.md) for details on the fronend of our project.
