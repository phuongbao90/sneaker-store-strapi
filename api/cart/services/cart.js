"use strict";

const { removeItem } = require("../controllers/cart");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async patch(params, data) {
    const {
      sneaker,
      size,
      quantity,
    } = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.cart,
      data
    );
    let message = null;

    // get existing cart items
    const { order: existingCartItems } = await strapi
      .query("cart")
      .findOne(params);

    // check if sneaker with same id & size exists
    const alreadyExist = existingCartItems.some(
      (el) => el.sneaker.id === sneaker.id && el.size === size
    );

    // if duplicate not exist -> update immediately
    if (!alreadyExist) {
      return await strapi.query("cart").update(params, {
        order: [
          ...existingCartItems,
          { sneaker: { id: sneaker.id }, size, quantity },
        ],
      });
    }

    // if duplicate exist
    // get the max quantity for sneaker of that size
    let maxQuantity;
    if (!data.maxQuantity) {
      const { availability } = await strapi
        .query("sneaker")
        .findOne({ id: data.sneaker.id });
      // console.log("avail: ", availability);
      availability.map((el) => {
        if (el.size === size) {
          maxQuantity = el.quantity;
        }
      });
    } else {
      maxQuantity = data.maxQuantity;
    }

    // update the quantity
    // make sure quantity cannot go above max quantity
    const updatedCartItems = existingCartItems.reduce((acc, curr) => {
      if (curr.sneaker.id === sneaker.id && curr.size === size) {
        if (curr.quantity + quantity <= 0) {
          // remove item from cart || dont add to cart
          message = "Sneaker removed successfully!";
          return acc;
        }

        if (curr.quantity + quantity > maxQuantity) {
          // set quantity = maxQuantity and notify user reaching max stock quantity
          curr.quantity = maxQuantity;
          message = "You have reached the maximum stock quantity!";
        }

        if (curr.quantity + quantity <= maxQuantity) {
          curr.quantity = curr.quantity + quantity;
          // message = "Update cart successfully!";
        }
      }

      acc.push(curr);
      return acc;
    }, []);

    return {
      entity: await strapi
        .query("cart")
        .update(params, { order: [...updatedCartItems] }),
      message,
    };
  },
  async removeItem(params, cartItemIdsToRemove) {
    // get existing cart items
    const { order: existingCartItems } = await strapi
      .query("cart")
      .findOne(params);

    // console.log(cartItemIdsToRemove);
    // console.log(existingCartItems);

    // check if remove items exist?
    const matching = cartItemIdsToRemove.every((removedId) =>
      existingCartItems.map((el) => el.id).includes(removedId)
    );

    // if not => return error message
    if (!matching) {
      return {
        entity: existingCartItems,
        message:
          "Something went wrong! Trying to remove cart items that don't exist!",
      };
    }
    // if yes => remove from existing cart items
    const remainingCartItems = existingCartItems.filter(
      (e) => !cartItemIdsToRemove.includes(e.id)
    );
    // return the data
    return {
      entity: await strapi.query("cart").update(params, {
        order: remainingCartItems,
      }),
      message: "Cart items removed successfully!",
    };
  },
};
