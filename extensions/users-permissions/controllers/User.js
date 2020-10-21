"use strict";
// users/me with media and relational fields
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const userQuery = await strapi.query("user", "users-permissions");
    const userWithMedia = await userQuery.findOne({ id: ctx.state.user.id }, [
      "avatar",
      "cart.order.sneaker.availability",
      "cart.order.sneaker.images",
    ]);

    // await strapi.plugins["email"].services.email.send({
    //   to: "testing123@mailsac.com",
    //   from: "phuongbao90@gmail.com",
    //   subject: "Use strapi email provider successfully",
    //   text: "Hello world!",
    //   html: "Hello world!",
    // });

    const data = sanitizeUser(userWithMedia, { model: userQuery.model });

    ctx.body = sanitizeUser(user);
    ctx.send(data);
  },
};
