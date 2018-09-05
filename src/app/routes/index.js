import router from "./router";
import tokenRoute from "./token";
import seleniumRoute from "./api/selenium/index";
import template from "./api/template";

export const token = router[tokenRoute.method](
  tokenRoute.path,
  tokenRoute.handler
);
export const api = {
  selenium: router[seleniumRoute.method](
    seleniumRoute.path,
    seleniumRoute.handler
  ),
  template
};

export default {
  api,
  token
};
