"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async find(params, populate) {
    return strapi.query("sneaker").find({ _limit: 9, ...params }, populate);
  },

  async findOne(params, populate) {
    return await strapi.query("sneaker").findOne(params, populate);
  },

  async verifyStockQuantity({ id, size, purchasingQuantity }) {
    const { availability } = await strapi.query("sneaker").findOne({ id });
    const { quantity: availableQuantity } = availability.find(
      (el) => el.size === size
    );
    return {
      available: purchasingQuantity <= availableQuantity,
      availableQuantity,
    };
  },

  async updateSoldQuantity({ id, quantity }) {
    const sneaker = await strapi.query("sneaker").findOne({ id });
    return await strapi
      .query("sneaker")
      .update({ id }, { sold: sneaker.sold + quantity });
  },

  async updateAvailability({ sneaker, quantity, size }) {
    const { availability } = await strapi
      .query("sneaker")
      .findOne({ id: sneaker.id });

    const updatedAvailability = availability.map((el) => {
      if (el.size === size) {
        el.quantity = el.quantity - quantity;
      }
      return el;
    });

    return await strapi.query("sneaker").update(
      { id: sneaker.id },
      {
        availability: updatedAvailability,
      }
    );
  },

  // async verifyStockQuantity(orders) {
  //   return Promise.all(
  //     orders.map(async ({ sneaker, size, quantity }) => {
  //       const { availability } = await strapi
  //         .query("sneaker")
  //         .findOne({ id: sneaker.id });
  //       const { quantity: availableQuantity } = availability.find(
  //         (el) => el.size === size
  //       );
  //       return {
  //         available: quantity <= availableQuantity,
  //         availableQuantity,
  //       };
  //     })
  //   );
  // },
};
