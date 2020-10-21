"use strict";
const { isEmpty } = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  // only need to provide newly purchase sneaker Id
  // no need to provide existing sneaker ids of purchase obj
  async update(params, data) {
    const purchase = await strapi.query("purchase").findOne(params);

    let entry;

    if (purchase && !isEmpty(purchase.items)) {
      entry = await strapi.query("purchase").update(params, {
        items: [...purchase.items, data],
      });
    } else {
      entry = await strapi.query("purchase").update(params, {
        items: [data],
      });
    }

    return entry;
  },
};
