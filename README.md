# TODO

## Selenium

- [ ] Collect page data in one place and attach to the HTTP response.

## REST API

- [ ] User HTTP Authorization header instead of query parameters.s
- [ ] Change resource path to be plural, if it's plural.
- [ ] /user
  - [ ] GET /:id -- with credential or access token
  - [x] POST /new
  - [x] POST /update/:id
  - [ ] POST /delete/:id
  - [ ] POST /
  - [ ] PUT /:id
  - [ ] PATCH /:id
  - [ ] DELETE /:id
- [ ] /template
  - [x] GET /:id?
  - [x] POST /new
  - [ ] POST /update/:id -- handle both PUT and PATCH
  - [ ] POST /delete/:id
  - [ ] POST /
  - [ ] PUT /:id
  - [ ] PATCH /:id
  - [ ] DELETE /:id
- [ ] /template/input
  - [x] GET /:id?
  - [ ] POST /new
  - [ ] POST /update/:id -- handle both PUT and PATCH
  - [ ] POST /delete/:id
  - [ ] POST /
  - [ ] PUT /:id
  - [ ] PATCH /:id
  - [ ] DELETE /:id
- [ ] /template/parser
  - [ ] GET /?templateId=TEMPLATE_ID&?

## Authentication

- [x] Add expiration for JWT.
- [x] Handle token expiration. (use refresh token?)

## Database

- [ ] Create User Mongo collection.
- [x] Create Template schema.
- [ ] Create TemplateInput schema.
- [ ] Validate schema type.
- [ ] Mongoose unique is not working.

## Frontend

### UI

- [ ] Create signup page.
- [ ] Customize Ant Design.
- [ ] Create page transition.

### Authentication

- [ ] Authenticate using expiration in token

---

# Requirements

- [ ] USER CAN create/update/delete CHAT-TEMPLATE.
- [ ] USER CAN buy a product on bahalf of CUSTOMER using Selenium.
