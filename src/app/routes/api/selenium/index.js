import buy from "./buy";

export default {
  method: "post",
  path: "v0/:vendor/:action",
  handler: async (req, res) => {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const action = req.params.action;

    // Pseudo code
    switch (action) {
      case "buy":
        await buy(req, res);
        break;

      default:
        res.json({
          msg: `Unknow vendor action '${action}'.`
        });
    }
  }
};
