#Data Design

(a conceptual summary of what properties things have, not precisely descriptive of the database or API or anything else)

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
  message: `registration successful`
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
  password: "(optional string)",
  email: "(optional string)"
};
res = {
  message: `account updated`
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

GET `/recipes?.....` get brief info on all recipes, filtered if given query string
```js
res = {
  recipes: [
    {
      id,
      title,
      innovator_id: "(number) the ID of the cook who created or modified the recipe",
      innovator_name
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
```js
res = {
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
    "(string) list of steps in order"
  ],
  innovator: "(number) ID of innovator who created or last edited this recipe",
  ancestor: "(optional number) the ID of the previous version of this recipe",
  timestamp: "the time that this recipe was created"
};
```

## Cookbook

GET `/cookbook` (auth)
```js
res = {
  recipes: [
    {
      id,
      title,
      innovator_id: "(number) the ID of the cook who created or modified the recipe",
      innovator_name
    }
  ]
};
```

POST `/cookbook/:id` (auth)
```js
res = {
  message: `recipe ${id} added to your cookbook`
};
```

DELETE `/cookbook/:id` (auth)
```js
res = {
  message: `recipe ${id} removed`
};
```

## Likes

POST `/likes/:id` like a recipe (auth)
```js
res = {
  message: `recipe ${id} liked`
};
```

DELETE `/likes/:id` unlike a recipe (auth)
```js
res = {
  message: `you no longer like recipe ${id}`
};
```

## Info

GET `/units`

# Notes

- no images handled yet 
- Should any cook data be publicly accessible?
