exports.connect = (options, callback = null) => async () => {
  const mongoose = require("mongoose");
  const { username, password, host, port, name, authSrc, isDebug } = options;
  const { readyState } = mongoose.connection;
  const authSource = authSrc ? `?authSource=${authSrc}` : "";
  const url = `mongodb://${username}:${password}@${host}:${port}/${name}${authSource}`;

  if (isDebug) {
    mongoose.set("debug", true);
  }

  // If already connected.
  if (readyState > 0 && readyState < 3) {
    return mongoose.connection;
  }

  await mongoose.connect(
    url,
    { useNewUrlParser: true },
    callback
  );

  const connection = mongoose.connection;

  // connection.on("error", err => {
  //   console.log("Connection error: " + err);
  //   console.log("Ready state: " + mongoose.connection.readyState);
  // });
  // connection.once("open", () => {
  //   console.log("Connected to " + url);
  //   console.log("Ready state: " + mongoose.connection.readyState);
  // });

  return connection;
};
