#Data Design

## Recipes
```js
recipe = {
  title,
  minutes: "(optional number) preparation time in minutes",
  notes: "(optional) free-form notes about the recipe",
  "(optional) categories": [
    "(string) category/tag name"
  ],
  ingredients: {
    name: {
      quantity: "(number)",
      unit
    }
  },
  likes: "(number) total likes",
  steps: [
    "string"
  ],
  innovator: "(number) ID of innovator who created or last edited this recipe",
  ancestor: "(optional number) the ID of the previous version of this recipe",
  timestamp: "the time that this recipe was created"
};
```
## Cooks
```js
cook = {
  username,
  password,
  edits: [
    {
      old_recipe_id,
      new_recipe_id,
      timestamp
    }
  ],
  likes: [
    recipe_id
  ],
  saved: [
    recipe_id
  ]
};
```

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
  message: "registration successful"
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
body = {};
```
DELETE `/cooks/self` delete account (auth)
GET `/cooks` get brief info on all cooks
GET `/cooks/:id` get detailed info about one cook

## Recipes

GET `/recipes?.....` get brief info on all recipes, filtered if given query string
```js
res = {
  recipes: [
    {
      title,
      innovator
    }
  ]
};
```
POST `/recipes` add a new recipe (auth)
```js
body = {
  title,
  minutes: "(optional number) preparation time in minutes",
  notes: "(optional) free-form notes about the recipe",
  "(optional) categories": [
    "(string) category/tag name"
  ],
  ingredients: {
    name: {
      quantity: "(number)",
      unit
    }
  },
  steps: [
    "string"
  ],
  ancestor: "(optional number) the ID of the previous version of this recipe"
};
```
GET `/recipes/:id` get detailed info about one recipe

## Cookbook

GET `/cookbook` (auth)
POST `/cookbook/:id` (auth)
DELETE `/cookbook/:id` (auth)

## Likes

POST `/likes/:id` like a recipe (auth)
DELETE `/likes/:id` unlike a recipe (auth)

## Info

<!-- GET `/info` get list of units of measure -->
GET `/units`

# Notes

- 
