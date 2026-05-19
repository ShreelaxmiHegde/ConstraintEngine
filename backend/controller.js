import { createConvo } from "./query";


export const firstConvo = async (req, res) => {
  console.log("Request got: ", req.body);

  // create a convo

  // store query/message in that convo

  return res.json({
    message: "Your conversation saved successfully"
  })
}