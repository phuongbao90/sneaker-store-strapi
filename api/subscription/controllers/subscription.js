"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILLIST_DOMAIN,
});

const welcomeTemplate = {
  subject: "Thanks for signing up for email updates",
  text: "Your subscription is confirmed!",
  html: `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #f1f1f1; margin: 0 auto; padding: 0; height: 100%; width: 100%;">
    <head>
      <meta charset="utf-8">
      <!-- utf-8 works for most cases -->
      <meta name="viewport" content="width=device-width">
      <!-- Forcing initial-scale shouldn't be necessary -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!-- Use the latest (edge) version of IE rendering engine -->
      <meta name="x-apple-disable-message-reformatting">
      <!-- Disable auto-scale in iOS 10 Mail entirely -->
      <title></title>
      <!-- The title tag shows in email notifications, like Android 4.4. -->
  
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
  
      <!-- CSS Reset : BEGIN -->
      <style>
  @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
      min-width: 320px !important;
    }
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
      min-width: 375px !important;
    }
  }
  @media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
      min-width: 414px !important;
    }
  }
  </style>
  
      <!-- CSS Reset : END -->
  
      <!-- Progressive Enhancements : BEGIN -->
      <style>
  @media screen and (max-width: 500px) {}
  </style>
    </head>
  
    <body width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #f1f1f1; font-family: 'Lato', sans-serif; font-weight: 400; font-size: 15px; line-height: 1.8; color: rgba(0,0,0,.4); mso-line-height-rule: exactly; background-color: #222222; margin: 0 auto; height: 100%; width: 100%; padding: 0;">
      <center style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; background-color: #f1f1f1;">
        <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: none; font-size: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: 600px; margin: 0 auto;" class="email-container">
          <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="top" class="bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; padding: 1em 2.5em 2em 2.5em; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="logo" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: center; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="center">
                      <h1 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; font-weight: 400; margin: 0;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: #000000; font-size: 20px; font-weight: 700; text-transform: uppercase; font-family: 'Lato', sans-serif; border: 2px solid #000; padding: .2em 1em;">Sneaker store</a></h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end tr -->
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="top" class="bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; padding: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td width="60%" class="logo" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: center; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="center">
                      <ul class="navigation" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 0; padding: 1em 0; border-top: 1px solid rgba(0,0,0,.05); border-bottom: 1px solid rgba(0,0,0,.05);">
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; display: inline-block; margin-left: 5px; margin-right: 5px; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">Home</a></li>
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; display: inline-block; margin-left: 5px; margin-right: 5px; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">New</a></li>
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; display: inline-block; margin-left: 5px; margin-right: 5px; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">Women</a></li>
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; display: inline-block; margin-left: 5px; margin-right: 5px; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">Kids</a></li>
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; list-style: none; display: inline-block; margin-left: 5px; margin-right: 5px; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;"><a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0,0,0,1);">Blog</a></li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end tr -->
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="middle" class="hero hero-2 bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; position: relative; z-index: 0; padding: 2em 0 4em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <div class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: rgba(0,0,0,.3); padding: 0 2.5em; text-align: center;">
                        <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; margin-top: 0; color: #000; font-size: 30px; margin-bottom: 0; font-weight: 300;">
                          We Are Shopping Website That Gives You An Affordable
                          <span style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-weight: 600; color: #f85e9f;">Prices</span> &amp; <span style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-weight: 600; color: #f85e9f;">Discount</span>
                        </h2>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end tr -->
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td class="bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="bg_light email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 0; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td class="text-services" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding: 20px 30px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                                  <div class="heading-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                    <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; line-height: 1.4; font-weight: 400; font-size: 22px;">
                                      Young Woman Dress
                                    </h2>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      A small river named Duden flows by their
                                      place and supplies it with the necessary
                                      regelialia.
                                    </p>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      <a href="#" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: #f85e9f; color: #ffffff;">Shop now</a>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <img src="<%= data.url %>images/product-1.jpg" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end: tr -->
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="bg_light email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 0; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <img src="images/product-2.jpg" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td class="text-services" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding: 20px 30px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                                  <div class="heading-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                    <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; line-height: 1.4; font-weight: 400; font-size: 22px;">
                                      Young Woman Dress
                                    </h2>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      A small river named Duden flows by their
                                      place and supplies it with the necessary
                                      regelialia.
                                    </p>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      <a href="#" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: #f85e9f; color: #ffffff;">Shop now</a>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end: tr -->
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="bg_light email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 0; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td class="text-services" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding: 20px 30px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                                  <div class="heading-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                    <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; line-height: 1.4; font-weight: 400; font-size: 22px;">
                                      Young Woman Dress
                                    </h2>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      A small river named Duden flows by their
                                      place and supplies it with the necessary
                                      regelialia.
                                    </p>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      <a href="#" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: #f85e9f; color: #ffffff;">Shop now</a>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <img src="images/product-3.jpg" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end: tr -->
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="bg_light email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 0; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <img src="images/product-4.jpg" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td class="text-services" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding: 20px 30px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                                  <div class="heading-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                    <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; line-height: 1.4; font-weight: 400; font-size: 22px;">
                                      Young Woman Dress
                                    </h2>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      A small river named Duden flows by their
                                      place and supplies it with the necessary
                                      regelialia.
                                    </p>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      <a href="#" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: #f85e9f; color: #ffffff;">Shop now</a>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end: tr -->
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="bg_light email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 0; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td class="text-services" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding: 20px 30px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                                  <div class="heading-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                    <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; line-height: 1.4; font-weight: 400; font-size: 22px;">
                                      Young Woman Dress
                                    </h2>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      A small river named Duden flows by their
                                      place and supplies it with the necessary
                                      regelialia.
                                    </p>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      <a href="#" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: #f85e9f; color: #ffffff;">Shop now</a>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <img src="images/product-5.jpg" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end: tr -->
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td class="bg_light email-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; padding: 0; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <img src="images/product-6.jpg" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 100%; max-width: 600px; height: auto; margin: auto; display: block;">
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td valign="middle" width="50%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                <td class="text-services" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left; padding: 20px 30px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                                  <div class="heading-section" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                    <h2 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; color: #000000; margin-top: 0; line-height: 1.4; font-weight: 400; font-size: 22px;">
                                      Young Woman Dress
                                    </h2>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      A small river named Duden flows by their
                                      place and supplies it with the necessary
                                      regelialia.
                                    </p>
                                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                      <a href="#" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 5px; background: #f85e9f; color: #ffffff;">Shop now</a>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end: tr -->
                </table>
              </td>
            </tr>
            <!-- end:tr -->
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="middle" class="bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; padding: 2em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <div class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding: 0 2.5em; text-align: center;">
                        <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <a href="#" class="btn btn-black-outline" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; padding: 5px 15px; display: inline-block; border-radius: 0px; background: transparent; border: 2px solid #000; color: #000; font-weight: 700;">Start Shopping</a>
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end tr -->
            <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td valign="middle" class="bg_white footer" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #ffffff; border-top: 1px solid rgba(0,0,0,.05); color: rgba(0,0,0,.5); mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">
                  <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-align: left;" align="left">
                    <td valign="middle" width="60%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="left">
                      <h3 class="heading" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Lato', sans-serif; margin-top: 0; font-weight: 400; color: #000; font-size: 20px;">Stay Updated On Our Shopping</h3>
                    </td>
                    <td valign="middle" width="40%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; text-align: right; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="right">
                      <ul class="social" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: 0; padding: 0;">
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; margin-right: 10px; list-style: none; margin-bottom: 10px;">
                          <img src="images/004-twitter-logo.png" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 24px; max-width: 600px; height: auto; display: block;" width="24">
                        </li>
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; margin-right: 10px; list-style: none; margin-bottom: 10px;">
                          <img src="images/005-facebook.png" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 24px; max-width: 600px; height: auto; display: block;" width="24">
                        </li>
                        <li style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; margin-right: 10px; list-style: none; margin-bottom: 10px;">
                          <img src="images/006-instagram-logo.png" alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 24px; max-width: 600px; height: auto; display: block;" width="24">
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end: tr -->
            <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
              <td class="bg_light" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background: #fafafa; text-align: center; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" align="center">
                <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                  No longer want to receive these email? You can
                  <a href="#" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; color: rgba(0, 0, 0, 0.8);">Unsubscribe here</a>
                </p>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`,
};

const list = mailgun.lists(`sneaker-store@${process.env.MAILLIST_DOMAIN}`);

module.exports = {
  async create(ctx) {
    const entity = await strapi.services.subscription.create(ctx.request.body);

    // send welcoming email to subscriber
    const data = {
      email: ctx.request.body.email,
      url: process.env.FRONTEND_API,
    };

    await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        to: data.email,
        from: "phuongbao90@gmail.com",
      },
      welcomeTemplate,
      {
        data: _.pick(data, ["email", "url"]),
      }
    );

    // populate new subscriber in mail list here

    const subscriber = {
      subscribed: true,
      address: ctx.request.body.email,
      name: ctx.request.body.email.slice(
        0,
        ctx.request.body.email.indexOf("@")
      ),
    };
    list.members().create(subscriber, function (error, data) {
      console.log(data);
    });

    return sanitizeEntity(entity, { model: strapi.models.subscription });
  },

  async delete(ctx) {
    const { id } = ctx.params; // id should be email, not number to prevent abusing

    const entity = await strapi.services.subscription.findOne({ email: id });
    if (entity.email) {
      await strapi.services.subscription.delete({ id: entity.id });
    }

    // remove subscriber in mailgun
    list.members(entity.email).delete(function (error, body) {
      console.log(body);
    });

    return sanitizeEntity(entity, { model: strapi.models.subscription });
  },
};
