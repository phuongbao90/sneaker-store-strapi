module.exports = ({ env }) => ({
  email: {
    provider: "mailgun",
    providerOptions: {
      apiKey: env("MAILGUN_API_KEY"),
      domain: env("MAILGUN_DOMAIN"), //Required if you have an account with multiple domains
    },
    settings: {
      defaultFrom: "phuongbao90@gmail.com",
      // defaultReplyTo: 'myemail@protonmail.com',
    },
  },
});
// module.exports = ({ env }) => ({
//   email: {
//     provider: "mailtrap",
//     providerOptions: {
//       user: env("MAILTRAP_USER", "b6f2d18d0b76cc"),
//       password: env("MAILTRAP_PASSWORD", "3f8f1c92e21983"),
//     },
//     settings: {
//       defaultFrom: env("MAILTRAP_DEFAULT_FROM", "phuongbao90@gmail.com"),
//       defaultReplyTo: env(
//         "MAILTRAP_DEFAULT_REPLY_TO",
//         "testing1234@mailsac.com"
//       ),
//     },
//   },
// });
