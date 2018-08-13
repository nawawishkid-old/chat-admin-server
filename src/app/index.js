import "babel-polyfill";
// import app from "./app";
import server from "./modules/server";

server
  .start()
  .then(() => {
    console.log(`Server running at: ${server.info.uri}`);
  })
  .catch(err => {
    console.log("Error: ", err.message);
    process.exit(1);
  });
