# Contributors

|                                                  [Lou](https://github.com/antilou86)                                                  |                                        [Catherine](https://github.com/Katerinjo)                                        |                                         [Yurika](https://github.com/yuri77)                                          |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
|        [<img src="https://avatars2.githubusercontent.com/u/26258589?s=460&v=4" width = "200" />](https://github.com/antilou86)        | [<img src="https://avatars1.githubusercontent.com/u/36314601?s=460&v=4" width = "200" />](https://github.com/Katerinjo) | [<img src="https://avatars1.githubusercontent.com/u/12836541?s=460&v=4" width = "200" />](https://github.com/yuri77) |
|                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/antilou86)                         |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Katerinjo)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/yuri77)                  |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/luis-guzman-52b93b73/) |      [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)      |    [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)     |

## Table of Contents

- [Getting Started](#getting-started)
- [Backend Framework](#back-end-framework)
- [Endpoints](#endpoints)

# Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

## Back-end Framework

- NodeJS
- Express
- KnexJS
- Postgres

# Endpoints

#### Table of Contents

- [Accounts](#accounts)
  - [Register](#users-register)
  - [Login](#users-login)
- [Recipe Routes](#recipe-routes)
  - [GET recipes/](#get-recipes)
  - [GET recipes/:id](#recipes-by-id)
  - [GET /cookbook](#get-cookbook)
  - [POST recipes/](#post-recipes)
  - [PUT recipes/:id](#put-recipes)
- [Version History](#version-history-endpoints)
  - [GET recipes/:id/versions](#all-versions-by-recipe-id)
  - [GET recipes/:id/version/:rev_id](#version-by-recipe-and-revision-id)
  - [GET recipes/:id/versions/:rev_num](#version-by-recipe-id-and-revision-number)

# Accounts

## Users Register

```js
URL: "baseURL/users/register/",
Method: POST
```

Allows a user to register.

**Required Fields:**

- Username
- Password

<details>
  <summary>
    Example Successful Response:
  </summary>

```js
{
  "message": "Welcome, new user.",
  "user": {
    "id": 8,
    "username": "Testing35"
  },
  "token": {
    "token": "user token",
    "expiration_date": "2020-01-24T19:30:44.000Z"
  }
}
```

  </details>

## Users Login

```js
URL: "baseURL/users/login/",
Method: POST
```

Allows a user to login.

**Required Fields:**

- Username
- Password

<details>
  <summary>
    Example Successful Response:
  </summary>

```js
{
  "message": "Welcome, new user.",
  "user": {
    "id": 8,
    "username": "Testing35"
  },
  "token": {
    "token": "user token",
    "expiration_date": "2020-01-24T19:30:44.000Z"
  }
}
```

  </details>

---

# Recipe Routes

## GET recipes/

```js
URL: "baseURL/recipes?title=c"
method: GET
```

Gets all Recipes from the database.

Search Query: Search by Title

<details>
  <summary>
  Example Response:
  </summary>

```js
res.data:

[
  {
    "id": 3,
    "title": "Scrambled Eggs",
    "description": null,
    "forked_from": null,
    "owner": {
      "user_id": 2,
      "username": "Lou"
    }
  },
  {
    "id": 2,
    "title": "Cereal",
    "description": null,
    "forked_from": null,
    "owner": {
      "user_id": 1,
      "username": "Catherine"
    }
  }
]

```

</details>

---

## Recipe By ID

```js
URL: "baseURL/recipes/1"
method: GET
```

Gets one Recipe from the database, with ingredients, instructions, tags, and notes.

Request Params: id of the single recipe to receive

<details>
<summary>
Example Response:
</summary>

```js
res.data:

{
  "id": 1,
  "title": "Eggplant",
  "description": null,
  "forked_from": null,
  "prep_time": null,
  "cook_time": 15,
  "img": "https://image.shutterstock.com/image-photo/grilled-eggplants-seasoned-olive-oil-260nw-87708241.jpg",
  "owner": {
    "user_id": 2,
    "username": "Lou"
  },
  "ingredients": [
    {
      "name": "eggplant",
      "units": "whole",
      "quantity": 1,
      "units_short": null,
      "recipe_ingredients_id": 1
    }
  ],
  "instructions": [
    {
      "id": 1,
      "description": "take eggplant",
      "step_number": 1
    },
    {
      "id": 2,
      "description": "cook eggplant",
      "step_number": 2
    },
    {
      "id": 3,
      "description": "eat eggplant",
      "step_number": 3
    }
  ],
  "tags": [
    {
      "id": 1,
      "name": "breakfast"
    },
    {
      "id": 2,
      "name": "brunch"
    }
  ],
  "notes": [
    {
      "id": 1,
      "description": "Eggplant is healthy."
    },
    {
      "id": 2,
      "description": "Edit recipe to add parmesan"
    }
  ]
}

```

</details>

---

## GET /cookbook

```js
URL: "baseURL/cookbook?course=breakfast"
method: GET
```

Gets all Recipes linked to the logged user.

Search Query: Search by course

<details>
    <summary>
        <strong>
            Example Response:
        </strong>
    </summary>

```js

res.data:

[
    {
    "id": 3,
    "title": "Scrambled Eggs",
    "description": null,
    "forked_from": null,
    "owner": {
      "user_id": 2,
      "username": "Lou"
    }
  },
  {
    "id": 1,
    "title": "Eggplant",
    "description": null,
    "forked_from": null,
    "owner": {
      "user_id": 2,
      "username": "Lou"
    }
  },
  {
    "id": 2,
    "title": "Cereal",
    "description": null,
    "forked_from": null,
    "owner": {
      "user_id": 1,
      "username": "Catherine"
    }
  }
]

```

</details>

---

## POST recipes/

```js
URL: "baseURL/recipes/"
method: POST
```

Adds a new recipe to the database.

**Required Fields:**

- Title
- _Either_ prep_time or cook_time
- Tags (Array of strings)
- Ingredients (Array of objects)
- Instructions (Array of objects)

**Optional Fields:**

- Description (recipe description)
- Notes (Array of Strings)
- prep_time or cook_time (Can have both properties)
- img (url linking to a recipe image)

<details>
<summary>
Example Request:
</summary>

```js
req.body:

{
	"title": "Test Recipe",
	"img": "http://naturopathyclinic.ie/wp-content/uploads/2012/12/foodintolerance.jpg",
	"cook_time": 12,
	"description": "Creating a test recipe",
	"ingredients": [
		{
			"name": "eggs",
			"quantity": 3,
			"unit": "whole"
		},
		{
			"name": "matcha",
			"quantity": 3,
			"unit": "g"
		}
	],
	"instructions": [
		{
			"step_number": 1,
			"description": "cook them"
		}
	],
	"tags": ["breakfast", "lunch"],
	"notes": ["Eat healthy.", "Be mighty", "Drink orange juice"]
}
```

</details>

---

## PUT recipes/

```js
URL: "baseURL/recipes/1"
method: PUT
```

Updates an existing recipe in the database.

**Required Fields:**

- Title
- _Either_ prep_time or cook_time
- Tags (Array of strings)
- Ingredients (Array of objects)
- Instructions (Array of objects)

**Optional Fields:**

- Description (recipe description)
- Notes (Array of Strings)
- prep_time or cook_time (Can have both properties)
- img (url linking to a recipe image)

### Differences from a POST request:

|                                                                        |
| ---------------------------------------------------------------------- |
| Existing ingredients need their `id` included in the object            |
| Existing notes need their `id` included in the object                  |
| Existing tags need their `id` included in the object                   |
| Existing instructions **don't** need their `id` included in the object |
| New entries do not need an `id`                                        |

<details>
    <summary>
      Example Request:
    </summary>

```js
req.body:

{
  "id": 1,
  "title": "Eggplant",
  "cook_time": 15,
  "ingredients": [
    {
      "name": "eggplant",
      "units": "whole",
      "quantity": 1,
      "units_short": null,
      "recipe_ingredients_id": 1
    },
    {
        "name": "parmesan",
        "units": "cup",
        "quantity": 0.5
    }
  ],
  "instructions": [
    {
      "id": 1,
      "description": "takem eggplant",
      "step_number": 1
    },
    {
      "id": 2,
      "description": "cook eggplant",
      "step_number": 2
    },
    {
        "description": "EATEM",
        "step_number": 3
    }
  ],
  "tags": [
    {
      "id": 1,
      "name": "breakfast"
    },
    {
      "id": 2,
      "name": "brunch"
    }
  ],
  "notes": [
    {
      "id": 1,
      "description": "Eggplants are healthy."
    },
    {
      "id": 2,
      "description": "Edit the recipe recipe to add parmesan"
    },
    {
        "description": "new note"
    }
  ]
}
```

</details>

---

# Version History Endpoints

## All Versions By Recipe ID

```js
URL: "baseURL/recipes/1/versions/"
method: GET
```

Gets all versions of a recipe by the recipe's id.

<details>
<summary>
Example Response:
</summary>

`res.data`:

```js
;[
  {
    id: 1,
    recipe_id: 2,
    changes: {
      id: 2,
      title: "Cereal",
      description: null,
      forked_from: null,
      prep_time: 45,
      cook_time: null,
      img:
        "https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg",
      ingredients: [
        {
          name: null,
          units: null,
          quantity: null,
          units_short: null,
          recipe_ingredients_id: null
        }
      ],
      instructions: [
        {
          id: null,
          description: null,
          step_number: null
        }
      ],
      tags: [
        {
          id: null,
          name: null
        }
      ],
      notes: [
        {
          id: null,
          description: null
        }
      ]
    },
    date_modified: "2020-01-21T22:11:10.950Z",
    revision_number: 1,
    author_comment: null
  },
  {
    id: 2,
    recipe_id: 2,
    changes: {
      id: 2,
      title: "Cereal",
      description: null,
      forked_from: null,
      prep_time: 45,
      cook_time: null,
      img:
        "https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg",
      ingredients: [
        {
          name: "milk",
          units: "cup",
          quantity: 1,
          units_short: "c",
          recipe_ingredients_id: 2
        }
      ],
      instructions: [
        {
          id: 7,
          description: null,
          step_number: 1
        },
        {
          id: 8,
          description: null,
          step_number: 2
        },
        {
          id: 9,
          description: null,
          step_number: 3
        }
      ],
      tags: [
        {
          id: null,
          name: null
        }
      ],
      notes: [
        {
          id: 3,
          description:
            "Cereal is one the most delicate and complex recipes known throughout the history of mankind..."
        }
      ]
    },
    date_modified: "2020-01-21T22:11:10.950Z",
    revision_number: 2,
    author_comment: null
  },
  {
    id: 3,
    recipe_id: 2,
    changes: {
      id: 2,
      title: "Cereal",
      description: null,
      forked_from: null,
      prep_time: 45,
      cook_time: null,
      img:
        "https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg",
      ingredients: [
        {
          name: "macha",
          units: "cup",
          quantity: 1,
          units_short: "c",
          recipe_ingredients_id: 3
        }
      ],
      instructions: [
        {
          id: 7,
          description: null,
          step_number: 1
        },
        {
          id: 8,
          description: null,
          step_number: 2
        },
        {
          id: 9,
          description: null,
          step_number: 3
        }
      ],
      tags: [
        {
          id: null,
          name: null
        }
      ],
      notes: [
        {
          id: 4,
          description:
            "Cereal is one the most delicate and complex recipes known throughout the history of mankind..."
        }
      ]
    },
    date_modified: "2020-01-21T22:11:10.950Z",
    revision_number: 3,
    author_comment: null
  }
]
```

</details>

---

## Version By Recipe and Revision ID

```js
URL: "baseURL/recipes/1/version/1"
method: GET
```

Gets a single revision based on the revision id.

<details>
  <summary>
    Example Response
  </summary>

`res.data`:

```js
{
  "id": 1,
  "recipe_id": 2,
  "changes": {
    "id": 2,
    "title": "Cereal",
    "description": null,
    "forked_from": null,
    "prep_time": 45,
    "cook_time": null,
    "img": "https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg",
    "ingredients": [
      {
        "name": null,
        "units": null,
        "quantity": null,
        "units_short": null,
        "recipe_ingredients_id": null
      }
    ],
    "instructions": [
      {
        "id": null,
        "description": null,
        "step_number": null
      }
    ],
    "tags": [
      {
        "id": null,
        "name": null
      }
    ],
    "notes": [
      {
        "id": null,
        "description": null
      }
    ]
  },
  "date_modified": "2020-01-21T22:11:10.950Z",
  "revision_number": 1,
  "author_comment": null
}
```

</details>

---

## Version By Recipe ID and Revision Number

```js
URL: "baseURL/recipes/1/versions/2"
method: GET
```

Gets a single revision based on the revision number.

<details>
  <summary>
    Example Response:
  </summary>

`res.data`:

```js
{
  "id": 1,
  "recipe_id": 2,
  "changes": {
    "id": 2,
    "title": "Cereal",
    "description": null,
    "forked_from": null,
    "prep_time": 45,
    "cook_time": null,
    "img": "https://image.shutterstock.com/z/stock-photo-cornflakes-with-milk-in-the-white-bowl-322906217.jpg",
    "ingredients": [
      {
        "name": null,
        "units": null,
        "quantity": null,
        "units_short": null,
        "recipe_ingredients_id": null
      }
    ],
    "instructions": [
      {
        "id": null,
        "description": null,
        "step_number": null
      }
    ],
    "tags": [
      {
        "id": null,
        "name": null
      }
    ],
    "notes": [
      {
        "id": null,
        "description": null
      }
    ]
  },
  "date_modified": "2020-01-21T22:11:10.950Z",
  "revision_number": 1,
  "author_comment": null
}
```

</details>
