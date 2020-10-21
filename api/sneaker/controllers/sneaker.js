"use strict";

const { uniqBy } = require("lodash");

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    console.log(ctx.query);

    if (ctx.query._q) {
      entities = await strapi.services.sneaker.search(ctx.query);
    } else {
      entities = await strapi.services.sneaker.find(ctx.query, [
        "id",
        "name",
        "price",
        "slug",
        "brand",
        "brand.logo",
        "sold",
        "created_at",
        "images",
      ]);
    }

    return entities.map(
      ({ id, name, price, slug, brand, sold, images, created_at }) =>
        sanitizeEntity(
          {
            id,
            name,
            price,
            slug,
            brand,
            sold,
            images,
            created_at,
          },
          { model: strapi.models.sneaker }
        )
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.sneaker.findOne({ slug: id });
    return sanitizeEntity(entity, { model: strapi.models.sneaker });
  },
  async updateAvailability(ctx) {
    const { id } = ctx.params;
    let entity;
    const sneaker = await strapi.services.sneaker.findOne({ id });

    const updatedAvailability = ctx.request.body.availability;
    entity = await strapi.services.sneaker.update(
      { id },
      {
        availability: uniqBy(
          [...updatedAvailability, ...sneaker.availability],
          function (e) {
            return e.id;
          }
        ),
        // availability: [
        //   ...sneaker.availability.map((el) => {
        //     if (el.id === cur.id) {
        //       return {
        //         ...el,
        //         quantity: cur.quantity,
        //       };
        //     }

        //     return el;
        //   }),
        // ],
      }
    );

    return sanitizeEntity(entity, { model: strapi.models.sneaker });
  },
  async findSlugs() {
    return await strapi.query("sneaker").model.fetchAll({ columns: ["slug"] });
  },
};
