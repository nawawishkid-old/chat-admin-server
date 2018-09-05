# API

## POST /:version/:vendor

### Path params

| name   | type     | default | options | detail                  |
| ------ | -------- | ------- | ------- | ----------------------- |
| vendor | `string` | `null`  | -       | Marketplace vendor name |

### Query params

| name         | type      | default | options | detail                                                             |
| ------------ | --------- | ------- | ------- | ------------------------------------------------------------------ |
| action       | `string`  | `null`  | -       | Action to be executed.                                             |
|              |           |         | `'buy'` | Buy product                                                        |
| customerType | `string`  | `null`  | -       | Type of customer                                                   |
|              |           |         | `'new'` | Register customer's account before buying process                  |
|              |           |         | `'old'` | No need to sign up                                                 |
| screenshot   | `boolean` | `false` |         | Whether to take screenshot on each process of the specified action |
