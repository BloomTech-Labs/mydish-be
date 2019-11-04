#Data Design

(a conceptual summary of what properties things have, not precisely descriptive of the database or API or anything else)

## Recipes
```js
recipe = {
  title,
  minutes: {
    prepTime, 
	  cookTime,
	  totalTime, 
    },
  
  notes: "(optional) free-form notes about the recipe",
  categories: [
    "(string) category/tag name"
  ],
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
  timestamp: "this will be created on the backend. does not need to exist in the req body."
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

GET `/recipes/all` get brief info on all recipes, filtered if given query string
```js
res = {
  recipes: [
    {
      id,
      title,
      img: "(string) url of the food photo",
      minutes,
      innovator_id: "(number) the ID of the cook who created or modified the recipe"
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
      innovator_id: "(number) the ID of the innovator who created this recipe"
    }
  ]
};
```

POST `/recipes` add a new recipe (auth)
```js
  body = {
    title,
    minutes: "(number) time to make, adding more types of minutes in the works",
    img: "(string) url of an image of the food"
    notes: "(optional) free-form notes about the recipe",
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
  likes: "(number) total likes",
  steps: [
    "(string) list of steps in order"
  ],
  innovator: "(number) ID of innovator who created or last edited this recipe",
  ancestor: "(optional number) the ID of the previous version of this recipe",
  innovator_name: "(string) the username of the innovator"
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
```js
res = {
  units: [
    "(string) name of legal unit, without regard to synonyms, abbreviations, or use cases"
  ]
};
```

# Notes

- Images aren't handled at all yet. 
- Should any cook data be publicly accessible? Currently there's no getting detailed information about a particular cook by ID because there isn't more information to give.
- Is there any benefit to being able to get one's own information? The user's ID is supplied on login, and the username and password must be known on the front end to log in successfully in the first place.
