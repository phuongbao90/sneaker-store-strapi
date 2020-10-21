"use strict";
require("es6-promise").polyfill();
require("isomorphic-fetch");

module.exports = {
  async contact(ctx) {
    // console.log(ctx.request.body);
    const { name, email, message } = ctx.request.body;

    try {
      // Send an email to the user.
      await strapi.plugins["email"].services.email.send({
        to: process.env.ADMIN_EMAIL,
        from: email,
        subject: `Contact from ${name}`,
        text: message,
        html: message,
      });

      return {
        status: 200,
        message: "Email sent successfully!",
      };
    } catch (err) {
      return ctx.badRequest(null, err);
    }
  },
  async verifyCaptcha(ctx) {
    console.log(ctx.request.body);

    // Install 'es6-promise' and 'isomorphic-fetch' from NPM or Yarn.

    const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;

    const humanKey = ctx.request.body.captcha;

    // Validate Human
    const isHuman = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `secret=${CAPTCHA_SECRET_KEY}&response=${humanKey}`,
      }
    )
      .then((res) => res.json())
      .then((json) => json.success)
      .catch((err) => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`);
      });

    if (humanKey === null || !isHuman) {
      return {
        status: 400,
        isHuman: false,
      };
    }

    // The code below will run only after the reCAPTCHA is succesfully validated.
    // console.log("SUCCESS!");
    return {
      status: 200,
      isHuman: true,
    };
  },
  async sendReceipt(ctx) {
    // console.log(ctx.state.user);
    const { username, email } = ctx.state.user;

    const res = await strapi.services.email.sendReceipt({
      username,
      to: email,
      orderItems: [
        {
          sneaker: {
            id: 9,
            price: 299,
            slug: "nike-sneaker-4",
            name: "nike sneaker 4",
          },
          size: 36,
          quantity: 2,
        },
        {
          sneaker: {
            id: 2,
            price: 299,
            slug: "nike-sneaker-5",
            name: "nike sneaker 5",
          },
          size: 38,
          quantity: 3,
        },
      ],
      total,
    });
    return res;
  },
};
