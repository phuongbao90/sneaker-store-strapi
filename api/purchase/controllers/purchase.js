"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { create } = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { id: userId, purchase: purchaseId } = ctx.state.user;

    if (purchaseId) {
      const purchaseHistory = await strapi.services.purchase.findOne({
        id: purchaseId,
      });

      return sanitizeEntity(purchaseHistory, { model: strapi.models.purchase });
    } else {
      const entity = await strapi.services.purchase.create({
        user: userId,
      });

      return sanitizeEntity(entity, { model: strapi.models.purchase });
    }
  },
  async update(ctx) {
    // only need to provide newly purchase sneaker Id
    // no need to provide existing sneaker ids of purchase obj

    const { id: userId, purchase: purchaseId } = ctx.state.user;

    // returned User
    if (purchaseId) {
      const entity = await strapi.services.purchase.update(
        { id: purchaseId },
        ctx.request.body
      );

      return sanitizeEntity(entity, { model: strapi.models.purchase });
    } else {
      // newly registered user -> create purchase obj
      const res = await strapi.services.purchase.create({
        user: userId,
      });

      const entity = await strapi.services.purchase.update(
        { id: res.user.purchase },
        ctx.request.body
      );

      return sanitizeEntity(entity, { model: strapi.models.purchase });

      // return {
      //   status: "error",
      //   message: "something went wrong. Customer has no purchase history obj",
      //   statusCode: 400,
      // };
    }
  },

  async findOne(ctx) {
    const { id: userId, purchase: purchaseId } = ctx.state.user;
    // console.log(ctx.state.user);

    if (purchaseId) {
      const entity = await strapi.services.purchase.findOne({ id: purchaseId });
      return sanitizeEntity(entity, { model: strapi.models.purchase });
    } else {
      const res = await strapi.services.purchase.create({
        user: userId,
      });

      const entity = await strapi.services.purchase.findOne({
        id: res.user.purchase,
      });
      return sanitizeEntity(entity, { model: strapi.models.purchase });

      // return {
      //   status: "error",
      //   message: "something went wrong. Customer has no purchase history obj",
      //   statusCode: 400,
      // };
    }
  },
};
