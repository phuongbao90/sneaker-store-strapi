"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.cart.findOne({ id }, [
      "order.sneaker.availability",
    ]);

    return sanitizeEntity(entity, { model: strapi.models.cart });
  },

  /**
   * updating user cart after successful payment
   * remove purchased orders
   */
  async removeItem(ctx) {
    console.log(ctx.state.user);
    const { cart: cartId } = ctx.state.user;

    const cartItemIdsToRemove = ctx.request.body.order; // [idNumber, idNumber, idNumber]
    // console.log("cartItemIdsToRemove: ", cartItemIdsToRemove);
    // expected order formats
    // "order": [
    //   {"id": 407},
    //   {"id": 409},
    // ]

    // const modifiedOrder = cartItemIdsToRemove.map((id) => ({
    //   id,
    // }));

    const { entity, message } = await strapi.services.cart.removeItem(
      { id: cartId },
      cartItemIdsToRemove
    );

    return sanitizeEntity(
      { cart: entity, message },
      { model: strapi.models.cart }
    );
  },

  /**
   * adding sneaker into user cart
   */
  async addItem(ctx) {
    const { cart: cartId } = ctx.state.user;

    const {
      sneaker: { id },
      size,
      quantity,
      maxQuantity,
    } = ctx.request.body.order;

    const { entity, message } = await strapi.services.cart.patch(
      { id: cartId },
      { sneaker: { id }, size, quantity, maxQuantity }
    );

    return sanitizeEntity(
      { cart: entity, message },
      { model: strapi.models.cart }
    );
  },
};
