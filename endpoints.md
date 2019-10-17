#Data Design

```js
Recipe = {
  title,
  minutes,
  notes,
  category,
  ingredients: [
    {
      name,
      quantity: "(number)",
      unit
    }
  ],
  ingredients: {
    name: {
      quantity: "(number)",
      unit
    }
  },
  likes: "(number)",
  steps: ["string"],
  innovator,
  ancestor: "(optional)",
  timestamp
};
```
