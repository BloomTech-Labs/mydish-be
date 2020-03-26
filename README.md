# Contributors

|                                                       [Katie Embrey-Farquhar](https://github.com/kmcknight1)                                                        |                                                             [Dan Hauer](https://github.com/dlhauer)                                                              |                                                           [Tanner Hawkins](https://github.com/dournbrood)                                                           |                                                          [Indigo Richards](https://github.com/domesticdingo)                                                           |                                                           [Devin Warrick](https://github.com/DevWarr)                                                            |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/47987809?s=460&u=16775e454c44054b8c7c88b4a2a899e78228df35&v=4" width = "200" />](https://github.com/kmcknight1) | [<img src="https://avatars0.githubusercontent.com/u/50860480?s=460&u=ab6997720219f59a214336ceb6088c308749c1f8&v=4" width = "200" />](https://github.com/dlhauer) | [<img src="https://avatars2.githubusercontent.com/u/19560915?s=460&u=9c3a07269ef4ab793a5f1029466e25d41d75ad49&v=4" width = "200" />](https://github.com/dournbrood) | [<img src="https://avatars2.githubusercontent.com/u/56006416?s=460&u=1e38c38a72eabbdb8ce8c596af3213ce58cbcc3b&v=4" width = "200" />](https://github.com/domesticdingo) | [<img src="https://avatars2.githubusercontent.com/u/49497246?s=460&u=2a0231a3d8358559c3bc7eb6c5617b1549da7582&v=4" width = "200" />](https://github.com/DevWarr) |

<br>

|                                                           [Megan Miller](https://github.com/smolDev-ai)                                                            |                                                           [James Bishop](https://github.com/jambis)                                                            |                                                            [Dustin Snoap](https://github.com/dustinsnoap)                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars1.githubusercontent.com/u/9338502?s=460&u=556b4dcad4d97e008787cd1d378984354559e8f3&v=4" width = "200" />](https://github.com/smolDev-ai) | [<img src="https://avatars0.githubusercontent.com/u/4674568?s=460&u=35069fc6456a2be448962d1643462cac596c6828&v=4" width = "200" />](https://github.com/jambis) | [<img src="https://avatars3.githubusercontent.com/u/45376430?s=460&u=2182ed52785e18d3044bd21a39bf7e3697cc9cf0&v=4" width = "200" />](https://github.com/dustinsnoap) |

<br>
<br>

<!-- |                                         [Tanner](https://github.com/Dournbrood)                                          |                                           [Dan](https://github.com/dlhauer)                                           |                                        [Indigo](https://github.com/domesticdingo)                                        |
| :----------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars2.githubusercontent.com/u/19560915?s=400&v=4" width = "200" />](https://github.com/Dournbrood) | [<img src="https://avatars0.githubusercontent.com/u/50860480?s=460&v=4" width = "200" />](https://github.com/dlhauer) | [<img src="https://avatars2.githubusercontent.com/u/56006416?s=460&v=4" width="200"/>](https://github.com/domesticdingo) |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Dournbrood)                  |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/dlhauer)                  |                [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/domesticdingo)                |
|      [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)       |     [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)     |      [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)       | -->

## Table of Contents

- [Getting Started](#getting-started)
- [Setting up a local database](#setting-up-a-local-postgresql-database)
- [Backend Framework](#back-end-framework)
- [Endpoints](#endpoints)

# Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

# Setting up a local PostgreSQL database

### Install PSQL

> If you already have PSQL installed, you can skip this step.

For Windows follow the steps in [this link](https://www.2ndquadrant.com/en/blog/pginstaller-install-postgresql/).

- [pgAdmin](https://www.pgadmin.org/) is recommended as the PSQL GUI for windows users

For Mac follow the steps in [this link](https://www.robinwieruch.de/postgres-sql-macos-setup).

- [Postico](https://eggerapps.at/postico/) is recommended as the PSQL GUI for Mac users

### Set up local database

- Create a database locally with your psql username and password, name it `mydishdb`
- Add `DB_NAME=mydishdb` `DB_USER=yourpsqlusername` and `DB_PASSWORD=yourpsqlpassword` to your .env file
- Add `ADMIN_PASSWORD=admin1234` to your .env file
- Make sure you have knex installed globally (run `nmp i -g knex` if not)
- Run `knex migrate:latest`
- Run `knex seed:run`

Now you should be set up with a development database

# Setting up AWS S3:

Note: It is only necessary for ONE person to create an account and share the key/secret key with trusted group members. This way, everyone's working environment is the same.

- Create a new AWS account, navigate to S3, and create a new bucket. Leave the settings at their default values.
- Create a file in the root directory of this project called `.env`.
- In the top-right of the AWS management window, go to `[user.name @ xxxx-xxxx] > My Security Credentials`,
- `Create access key` and copy both keys.
- In the `.env` file:

```
S3_BUCKET_NAME=your-exact-bucket-name
S3_IAM_USER_KEY=SOMEPUBLICKEYASDFGHJ
S3_IAM_USER_SECRET=yOUr+sUPER+s3cr3t+k3y+HER3+alkjLEKJRhsrh
```

As long as those values are set to the right keys and everything is saved, it will work without issue.
EVERYONE working on the backend needs to place the exact same credentials in their `.env` file.

## Tech Stack

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [KnexJS](http://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/)

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
  - [DELETE recipes/:id](#delete-recipe-by-id)
  - [POST /image-upload](#post-image-via-file)
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
URL: "baseURL/recipes?title=c";
method: GET;
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
URL: "baseURL/recipes/1";
method: GET;
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
      "name": "Breakfast"
    },
    {
      "id": 2,
      "name": "Brunch"
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
URL: "baseURL/cookbook;
method: GET;
```

Gets all Recipes linked to the logged user. If a recipe has more than one course tag, it will return once with each tag.

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
      "prep_time": null,
      "cook_time": 15,
      "img": "",
      "id": 1,
      "title": "Eggplant",
      "description": null,
      "forked_from": null,
      "tags": [
          {
              "id": 1,
              "name": "Breakfast"
          }
      ],
      "owner": {
          "user_id": 2,
          "username": "Lou"
      }
  },
  {
      "prep_time": null,
      "cook_time": 15,
      "img": "",
      "id": 1,
      "title": "Eggplant",
      "description": null,
      "forked_from": null,
      "tags": [
          {
              "id": 2,
              "name": "Brunch"
          }
      ],
      "owner": {
          "user_id": 2,
          "username": "Lou"
      }
  },
]

```

</details>

---

## GET Cookbook courses

```js
URL: "baseURL/cookbook?course={courseName};
method: GET;
```

Query with the name of a course to get back all recipes associated with the user with that course tag.

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
      "prep_time": 2,
      "cook_time": 10,
      "img": "",
      "id": 3,
      "title": "Hard Boiled Egg",
      "description": "Hard boil your eggs.",
      "forked_from": null,
      "owner": {
          "user_id": 2,
          "username": "Lou"
      }
  },
  {
      "prep_time": 30,
      "cook_time": 15,
      "img": "",
      "id": 4,
      "title": "New York Style Pizza",
      "description": "Pizza in the New York style.",
      "forked_from": null,
      "owner": {
          "user_id": 2,
          "username": "Lou"
      }
  },
  {
      "prep_time": 20,
      "cook_time": 1,
      "img": "",
      "id": 5,
      "title": "Caesar Salad",
      "description": "A lotta leaves.",
      "forked_from": null,
      "owner": {
          "user_id": 2,
          "username": "Lou"
      }
  }
]

```

</details>

---

## POST recipes/

```js
URL: "baseURL/recipes/";
method: POST;
```

Adds a new recipe to the database.

**Required Fields:**

- Title
- _Either_ prep_time or cook_time
- Tags (Array of strings)
- Ingredients (Array of objects)
- Instructions (Array of objects)
- Author Comment (string)

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
  "title": "Eggplant",
  "description": null,
  "forked_from": null,
  "prep_time": null,
  "cook_time": 15,
  "img": "https://image.shutterstock.com/image-photo/grilled-eggplants-seasoned-olive-oil-260nw-87708241.jpg",
  "ingredients": [
    {
      "name": "eggplant",
      "units": "whole",
      "quantity": 1
    }
  ],
  "instructions": [
    {
      "description": "take eggplant",
      "step_number": 1
    },
    {
      "description": "cook eggplant",
      "step_number": 2
    },
    {
      "description": "eat eggplant",
      "step_number": 3
    }
  ],
  "tags": [
    "Breakfast",
    "Brunch"
  ],
  "notes": [
    "Eggplant is healthy.",
   "Edit recipe to add parmesan"
  ],
	"author_comment": "New Recipe"
}
```

</details>
<details>
<summary>
Example Response:
</summary>

```js
res.data:

{
  "previous_versions_count": "0",
  "id": 48,
  "title": "Eggplant",
  "description": null,
  "forked_from": null,
  "prep_time": null,
  "cook_time": 15,
  "img": "https://image.shutterstock.com/image-photo/grilled-eggplants-seasoned-olive-oil-260nw-87708241.jpg",
  "author_comment": "New Recipe",
  "date_modified": "2020-01-29T19:03:52.701Z",
  "owner": {
    "user_id": 1,
    "username": "Catherine"
  },
  "ingredients": [
    {
      "name": "eggplant",
      "units": "whole",
      "quantity": 1,
      "units_short": null,
      "recipe_ingredients_id": 116
    }
  ],
  "instructions": [
    {
      "id": 47,
      "description": "take eggplant",
      "step_number": 1
    },
    {
      "id": 48,
      "description": "cook eggplant",
      "step_number": 2
    },
    {
      "id": 49,
      "description": "eat eggplant",
      "step_number": 3
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
      "id": 19,
      "description": "Eggplant is healthy."
    },
    {
      "id": 20,
      "description": "Edit recipe to add parmesan"
    }
  ]
}
```

</details>

---

## PUT recipes/

```js
URL: "baseURL/recipes/1";
method: PUT;
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

| Differences from a POST request:                                       |
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

## POST image via file

```js
URL: "baseURL/image_upload"
method: POST
body: form-data {
  image: "Path to image on the local machine"
}
```

Allows a user to add an image to the recipe, or overwrite an existing one.
Image path MUST be sent in the body as `form-data`.

<details>
<summary>
Example Response:
</summary>

```js
//Response body will be an object:
{
    "message": "Success!",
    "url": "your-hosted-image-location-here"
}
```

</details>

---

## DELETE Recipe By ID

```js
URL: "baseURL/recipes/1";
method: DELETE;
```

Allows a logged in user that owns the recipe to delete it from the database.

<details>
<summary>
Example Response:
</summary>

```js
res.data;
("Recipe Name has been terminated.");
```

</details>

---

# Version History Endpoints

## All Versions By Recipe ID

```js
URL: "baseURL/recipes/1/versions/";
method: GET;
```

Gets all versions of a recipe by the recipe's id.

<details>
<summary>
Example Response:
</summary>

`res.data`:

```js
[
  // First one in the array is the most current version of the recipe.
  {
    revision_number: 14,
    changes: {
      previous_versions_count: "13",
      id: 5,
      title: "This is a recipe edited TEST!!!!",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Does this return current version?\n",
      date_modified: "2020-01-27T22:35:20.845Z",
      owner: {
        user_id: 5,
        username: "Testing123"
      },
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 66
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test!!!!",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    date_modified: "2020-01-27T22:35:20.845Z"
  },
  {
    id: 3,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: null,
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 17
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 1,
    date_modified: "2020-01-27T22:35:35.125Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 4,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Edited recipe",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 18
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 2,
    date_modified: "2020-01-27T22:37:39.146Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 5,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited another one",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Another one!",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 19
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 3,
    date_modified: "2020-01-27T22:38:13.029Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 6,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited FOUR",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Four",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 20
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 4,
    date_modified: "2020-01-27T22:42:46.678Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 7,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited FIVE",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Test",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 21
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 5,
    date_modified: "2020-01-28T17:47:07.168Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 8,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited FIVE!",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 22
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 6,
    date_modified: "2020-01-28T17:48:52.207Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 10,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited FIVE!!!",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 23
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 7,
    date_modified: "2020-01-28T17:49:24.728Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 11,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited TEST",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 26
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 8,
    date_modified: "2020-01-28T17:49:45.436Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 13,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited TEST!!!",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 27
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 9,
    date_modified: "2020-01-28T17:51:32.208Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 14,
    recipe_id: 5,
    changes: {
      id: 5,
      title: "This is a recipe edited TEST!!! Test",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Test",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 30
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 10,
    date_modified: "2020-01-28T17:51:51.424Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 24,
    recipe_id: 5,
    changes: {
      previous_versions_count: "10",
      id: 5,
      title: "This is a recipe edited TEST!!! Test",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Testing",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 31
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 11,
    date_modified: "2020-01-28T21:12:23.002Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 25,
    recipe_id: 5,
    changes: {
      previous_versions_count: "11",
      id: 5,
      title: "This is a recipe that I changed!",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "I changed this",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 54
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 12,
    date_modified: "2020-01-28T21:15:33.498Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  },
  {
    id: 27,
    recipe_id: 5,
    changes: {
      previous_versions_count: "12",
      id: 5,
      title: "This is a recipe edited TEST",
      description: null,
      forked_from: null,
      prep_time: 1,
      cook_time: 1,
      img: null,
      author_comment: "Test",
      date_modified: "2020-01-27T22:35:20.845Z",
      ingredients: [
        {
          name: "1",
          units: "teaspoon",
          quantity: 1,
          units_short: "tsp",
          recipe_ingredients_id: 55
        }
      ],
      instructions: [
        {
          id: 18,
          description: "Test!!!!",
          step_number: 1
        }
      ],
      tags: [
        {
          id: 1,
          name: "Breakfast"
        }
      ],
      notes: [
        {
          id: 7,
          description: "Test"
        }
      ]
    },
    revision_number: 13,
    date_modified: "2020-01-28T21:55:37.417Z",
    owner: {
      user_id: 5,
      username: "Testing123"
    }
  }
];
```

</details>

---

## Version By Recipe and Revision ID

```js
URL: "baseURL/recipes/1/version/1";
method: GET;
```

Gets a single revision based on the revision id.

<details>
  <summary>
    Example Response
  </summary>

`res.data`:

```js
{
  "id": 4,
  "recipe_id": 5,
  "changes": {
    "id": 5,
    "title": "This is a recipe edited",
    "description": null,
    "forked_from": null,
    "prep_time": 1,
    "cook_time": 1,
    "img": null,
    "author_comment": "Edited recipe",
    "ingredients": [
      {
        "name": "1",
        "units": "teaspoon",
        "quantity": 1,
        "units_short": "tsp",
        "recipe_ingredients_id": 18
      }
    ],
    "instructions": [
      {
        "id": 18,
        "description": "Test",
        "step_number": 1
      }
    ],
    "tags": [
      {
        "id": 1,
        "name": "Breakfast"
      }
    ],
    "notes": [
      {
        "id": 7,
        "description": "Test"
      }
    ]
  },
  "revision_number": 2,
  "date_modified": "2020-01-27T22:37:39.146Z",
  "owner": {
    "user_id": 5,
    "username": "Testing123"
  }
}
```

</details>

---

## Version By Recipe ID and Revision Number

```js
URL: "baseURL/recipes/1/versions/2";
method: GET;
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
