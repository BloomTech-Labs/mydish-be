#Data Design

## Recipes
```js
recipe = {
  title,
  minutes: "(optional number) preparation time in minutes",
  notes: "(optional) free-form notes about the recipe",
  categories: [
    "string"
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
}
```

# Endpoints

## Account

POST `/cooks/register`
```js
body = {
  username,
  password
}
res = {
  id: "(number) the ID of the user/cook"
  token: "authentication token for the session"
}
```
POST `/cooks/login`
PUT `/cooks/self` modify account details e.g. password (auth)
DELETE `/cooks/self` delete account (auth)
GET `/cooks` get brief info on all cooks
GET `/cooks/:id` get detailed info about one cook

## Recipes

maybe this way:
GET `/recipes?.....` get brief info on all recipes, filtered if given query string
POST `/recipes` add a new recipe (auth)
GET `/recipes/:id` get detailed info about one recipe

<!-- or maybe this instead: -->
<!-- GET `/categories` get a list of available categories -->
<!-- GET `/categories/:category` -->
<!-- POST `/categories/:category` (auth) -->

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

