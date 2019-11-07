# Data Design

(a conceptual summary of what properties things have, not precisely descriptive of the database or API or anything else)

## Recipes

```js
recipe = {
  title,
  minutes: "(optional number) total number of minutes it takes to cook the recipe",
  notes: "(optional) free-form notes about the recipe",
  categories: ["(string) category/tag name"],
  ingredients: [
    {
      name,
      quantity: "(number)",
      unit: "string: example- mL or g or cups"
    }
  ],
  likes: "(number) total likes",
  steps: [
    {
      ordinal: 1,
      body: "a string- step 1 blah blah blah"
    },
    {
      ordinal: 2,
      body: "a string- step 2 blah blah blah"
    }
  ],
  innovator: "(number) ID of innovator who created or last edited this recipe",
  ancestor: "(optional number) the ID of the previous version of this recipe",
  timestamp:
    "this will be created on the backend. does not need to exist in the req body."
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
      new_recipe_id
    }
  ],
  likes: [recipe_id],
  saved: [recipe_id]
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
      img: "(string) url for a photo of food",
      minutes,
      innovator_id: "(number) the ID of the innovator who created this recipe",
      total_saves,
      username
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

```js
res = {
  units: [
    "(string) name of legal unit, without regard to synonyms, abbreviations, or use cases"
  ]
};
```

# Notes

- Should any cook data be publicly accessible? Currently there's no getting detailed information about a particular cook by ID because there isn't more information to give.
- Is there any benefit to being able to get one's own information? The user's ID is supplied on login, and the username and password must be known on the front end to log in successfully in the first place.
