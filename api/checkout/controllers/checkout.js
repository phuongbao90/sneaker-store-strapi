"use strict";
const { isEmpty } = require("lodash");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async checkout(ctx) {
    // console.log(ctx.headers.host);
    // console.log(ctx.req);
    // console.log(ctx.res);
    // console.log(ctx.request);
    const {
      cart: cartId,
      purchase: purchaseId,
      username,
      email,
    } = ctx.state.user;
    const checkoutOrderIds = ctx.request.body.order; // checkoutOrderIds: [orderId, orderId]

    /* -------------------------------------------------------------------------- */
    /*                                verification                                */
    /* -------------------------------------------------------------------------- */

    const { order: existingCartItems } = await strapi
      .query("cart")
      .findOne({ id: cartId });

    /* ---------------- verify checkout items exist in user cart ---------------- */

    const matching = checkoutOrderIds.every((orderId) =>
      existingCartItems.map((el) => el.id).includes(orderId)
    );

    if (!matching) {
      ctx.send({
        entity: null,
        status: 404, // not found
        message: "Something went wrong! Checkout items don't exist.",
      });
    }

    /* ------------- verify stock quantity available for purchasing ------------- */

    const matchingOrders = existingCartItems.filter((el) =>
      checkoutOrderIds.includes(el.id)
    );

    // const remainingOrders = existingCartItems.filter(
    //   (el) => !checkoutOrderIds.includes(el.id)
    // );

    const stockError = await Promise.all(
      matchingOrders.map(async (el) => {
        const {
          available,
          availableQuantity,
        } = await strapi.services.sneaker.verifyStockQuantity({
          id: el.sneaker.id,
          size: el.size,
          purchasingQuantity: el.quantity,
        });

        if (!available) {
          return {
            sneaker: el.sneaker.name,
            size: el.size,
            availableQuantity,
            purchasingQuantity: el.quantity,
          };
        }
      })
    );

    if (!isEmpty(stockError.filter(Boolean))) {
      return ctx.send({
        status: 406, // not acceptable
        message: `Unable to process further! ${stockError
          .filter(Boolean)
          .map(
            (el) =>
              `${el.sneaker} at size ${el.size} has only ${el.availableQuantity} units left.`
          )
          .join(" & ")}. Please reduce the ordering quantity.`,
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                              initiate function                             */
    /* -------------------------------------------------------------------------- */

    /* ------------------------- increase sold quantity ------------------------- */

    function increaseSoldQuantityPromise(order) {
      return new Promise((resolve, reject) => {
        const status = strapi.services.sneaker.updateSoldQuantity({
          id: order.sneaker.id,
          quantity: order.quantity,
        });

        resolve(status);
      });
    }

    matchingOrders.reduce(async (previousPromise, nextOrder) => {
      // return previousPromise.then(() => {
      //   return increaseSoldQuantityPromise(nextOrder);
      // });
      await previousPromise;
      return increaseSoldQuantityPromise(nextOrder);
    }, Promise.resolve());

    /* ------------------------- update purchase history ------------------------ */
    function updatePurchaseHistoryPromise(order) {
      return new Promise((resolve, reject) => {
        const entity = strapi.services.purchase.update(
          { id: purchaseId },
          {
            size: order.size,
            quantity: order.quantity,
            sneaker: {
              id: order.sneaker.id,
            },
          }
        );

        resolve(entity);
      });
    }

    matchingOrders.reduce(async (previousPromise, nextOrder) => {
      await previousPromise;
      return updatePurchaseHistoryPromise(nextOrder);
    }, Promise.resolve());

    /* -------------------------- reduce stock quantity ------------------------- */

    function updateStockQuantityPromise(order) {
      return new Promise((resolve, reject) => {
        const entity = strapi.services.sneaker.updateAvailability(order);

        resolve(entity);
      });
    }

    matchingOrders.reduce(async (previousPromise, nextOrder) => {
      await previousPromise;
      return updateStockQuantityPromise(nextOrder);
    }, Promise.resolve());

    /* ---------------------- remove order items from cart ---------------------- */

    await strapi.services.cart.removeItem(
      { id: cartId },
      matchingOrders.map((el) => el.id)
    );

    /* --------------------------- send receipt email --------------------------- */

    const total = matchingOrders.reduce((acc, curr) => {
      acc = acc + curr.sneaker.price * curr.quantity;
      return acc;
    }, 0);
    await strapi.services.email.sendReceipt({
      username,
      to: email,
      orderItems: matchingOrders,
      total,
      baseUrl: ctx.headers.host,
    });

    return {
      status: 200,
      message: "Checkout successful.",
    };
  },
};
