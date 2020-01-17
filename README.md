# Main Endpoints

<details>
    <summary>
        <strong>
            <code>GET recipes/</code>
        </strong>
    </summary>

Gets all Recipes from the database.

Search Query: Search by Title

Example Response:

```js
URL: "baseURL/recipes?title=c"
method: GET

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

<details>
    <summary>
        <strong>
            <code>GET recipes/:id</code>
        </strong>
    </summary>

Gets one Recipe from the database, with ingredients, instructions, tags, and notes.

Request Params: id of the single recipe to receive

Example Response:

```js
URL: "baseURL/recipes/1"
method: GET

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

<details>
    <summary>
        <strong>
            <code>GET cookbook/</code>
        </strong>
    </summary>

Gets all Recipes linked to the logged user.

Search Query: Search by course

Example Response:

```js
URL: "baseURL/cookbook?course=breakfast"
method: GET

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

<details>
    <summary>
        <strong>
            <code>POST recipes/</code>
        </strong>
    </summary>

Adds a new recipe to the database.

Required Fields:

- Title
- _Either_ prep_time or cook_time
- Tags (Array of strings)
- Ingredients (Array of objects)
- Instructions (Array of objects)

Optional Fields:

- Description (recipe description)
- Notes (Array of Strings)
- prep_time or cook_time (Can have both properties)
- img (url linking to a recipe image)

Example Request:

```js
URL: "baseURL/recipes/"
method: POST

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

<details>
    <summary>
        <strong>
            <code>PUT recipes/</code>
        </strong>
    </summary>

Updates an existing recipe in the database.

Required Fields:

- Title
- _Either_ prep_time or cook_time
- Tags (Array of strings)
- Ingredients (Array of objects)
- Instructions (Array of objects)

Optional Fields:

- Description (recipe description)
- Notes (Array of Strings)
- prep_time or cook_time (Can have both properties)
- img (url linking to a recipe image)

**Differences from a POST request:**

- Existing ingredients need their `id` included in the object
- Existing notes need their `id` included in the object
- Existing tags need their `id` included in the object
- Existing instructions **don't** need their `id` included in the object
- New entries do not need an `id`

Example Request:

```js
URL: "baseURL/recipes/1"
method: PUT

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
