"use strict";
const _ = require("lodash");
/**
 * `email` service.
 */

const receiptTemplate = ({ username, orderItems, total, baseUrl }) => {
  return {
    subject: "Order receipt",
    text: "Order receipt",
    html: `<!DOCTYPE html>
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <title>Your order receipt</title>
        <!--[if !mso]><!-- -->
        ;
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
    
          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
    
          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
    
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
    
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
    
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap"
          rel="stylesheet"
          type="text/css"
        />
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Roboto:400,700);
          @import url(https://fonts.googleapis.com/css2?family=Chilanka&display=swap);
        </style>
    
        <style type="text/css">
          @media only screen and (min-width: 480px) {
            .mj-column-px-350 {
              width: 350px !important;
              max-width: 350px;
            }
            .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
            }
            .mj-column-per-50 {
              width: 50% !important;
              max-width: 50%;
            }
            .mj-column-px-200 {
              width: 200px !important;
              max-width: 200px;
            }
            .mj-column-per-33-333333333333336 {
              width: 33.333333333333336% !important;
              max-width: 33.333333333333336%;
            }
          }
        </style>
        <style type="text/css">
          @media only screen and (max-width: 480px) {
            table.mj-full-width-mobile {
              width: 100% !important;
            }
            td.mj-full-width-mobile {
              width: auto !important;
            }
          }
        </style>
      </head>
    
      <body>
        <div style="">
          <!--[if mso | IE]>
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                      padding-top: 40px;
                      text-align: center;
                    "
                  >
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:350px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-px-350 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                border: 5px solid gray;
                                vertical-align: top;
                                padding: 0px;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 20px 20px 10px 20px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 21px;
                                        text-align: center;
                                        text-decoration: none;
                                        color: #000000;
                                      "
                                    >
                                      <h1 border="2px solid gray">SNEAKER-STORE</h1>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                      text-align: center;
                    "
                  >
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-per-100 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 60px 0;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: chilanka;
                                        font-size: 30px;
                                        font-weight: 600;
                                        line-height: 21px;
                                        text-align: center;
                                        color: #000000;
                                      "
                                    >
                                      ORDER CONFIRMED!
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 10px 0 30px 0;
                      text-align: center;
                    "
                  >
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:600px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-per-100 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 0 0 10px 0;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 18px;
                                        font-weight: 600;
                                        line-height: 21px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      Hello ${username},
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 21px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      Your sweet order has been confirmed and will
                                      be shipping in the next 3 days.
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0 0 40px 0;
                      text-align: center;
                    "
                  >
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-per-50 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 26px;
                                        font-weight: 500;
                                        line-height: 21px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      Order number
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-per-50 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 20px;
                                        font-weight: 500;
                                        line-height: 21px;
                                        text-align: right;
                                        color: orange;
                                      "
                                    >
                                      4306712
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
    
    
          ${orderItems.map(
            (el) =>
              `<div style="margin: 0px auto; max-width: 600px">
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width: 100%"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0 0 30px 0;
                      text-align: center;
                    "
                    >
                      <div
                        class="mj-column-px-200 mj-outlook-group-fix"
                        style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                      >
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                background-color: #d3d2cd;
                                border-radius: 30px;
                                vertical-align: top;
                                padding: 0px;
                              "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style=""
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                      font-size: 0px;
                                      padding: 5px 10px 10px 10px;
                                      word-break: break-word;
                                    "
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                      >
                                        <tbody>
                                          <tr>
                                            <td style="width: 180px">
                                              <img
                                                alt=${`${el.sneaker.name} sneaker image`}
                                                height="auto"
                                                src=${`${baseUrl}${el.sneaker.images[0].url}`}
                                                style="
                                                border: 0;
                                                display: block;
                                                outline: none;
                                                text-decoration: none;
                                                height: auto;
                                                width: 100%;
                                                font-size: 13px;
                                              "
                                                width="180"
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div
                        class="mj-column-per-33-333333333333336 mj-outlook-group-fix"
                        style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                      >
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style="vertical-align: top; padding: 15px 0 0 30px">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style=""
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                      font-size: 0px;
                                      padding: 0px;
                                      padding-bottom: 10px;
                                      word-break: break-word;
                                    "
                                    >
                                      <div
                                        style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 17px;
                                        font-weight: 600;
                                        line-height: 1.5;
                                        text-align: left;
                                        color: #000000;
                                      "
                                      >
                                        ${el.sneaker.name}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                      font-size: 0px;
                                      padding: 0px;
                                      padding-bottom: 10px;
                                      word-break: break-word;
                                    "
                                    >
                                      <div
                                        style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 21px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                      >
                                        Size: ${el.size}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                    >
                                      <div
                                        style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 21px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                      >
                                        Quantity: ${el.quantity}
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div
                        class="mj-column-per-33-333333333333336 mj-outlook-group-fix"
                        style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                      >
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style="vertical-align: top; padding: 0px">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style=""
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      align="right"
                                      style="
                                      font-size: 0px;
                                      padding: 0px;
                                      padding-top: 15px;
                                      word-break: break-word;
                                    "
                                    >
                                      <div
                                        style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 17px;
                                        font-weight: 600;
                                        line-height: 21px;
                                        text-align: right;
                                        color: #000000;
                                      "
                                      >
                                        ${el.sneaker.price}
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>`
          )}
    
          
          
       
    
    
    
    
    
    
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                      padding-bottom: 30px;
                      text-align: center;
                    "
                  >
                    <!--[if mso | IE]>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    
            <tr>
          
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-per-50 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 17px;
                                        font-weight: 500;
                                        line-height: 21px;
                                        text-align: left;
                                        color: gray;
                                      "
                                    >
                                      Order time
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
                <td
                   class="" style="vertical-align:top;width:300px;"
                >
              <![endif]-->
                    <div
                      class="mj-column-per-50 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 20px;
                                        font-weight: 600;
                                        line-height: 21px;
                                        text-align: right;
                                        color: #000000;
                                      "
                                    >
                                      3 Nov 2019 at 4:00 pm
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]>
                </td>
              
            </tr>
          
                      </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                      text-align: center;
                    "
                  >
                 
                    <div
                      class="mj-column-per-100 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <p
                                      style="
                                        border-top: solid 2px gray;
                                        font-size: 1px;
                                        margin: 0px auto;
                                        width: 100%;
                                      "
                                    ></p>
                                 
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                   
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
         
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 30px 0;
                      text-align: center;
                    "
                  >
                    
                    <div
                      class="mj-column-per-50 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 26px;
                                        font-weight: 500;
                                        line-height: 21px;
                                        text-align: left;
                                        color: #000000;
                                      "
                                    >
                                      In total:
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  
                    <div
                      class="mj-column-per-50 mj-outlook-group-fix"
                      style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                      "
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top; padding: 0px">
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style=""
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 0px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Roboto, Helvetica, Arial,
                                          sans-serif;
                                        font-size: 22px;
                                        font-weight: 500;
                                        line-height: 21px;
                                        text-align: right;
                                        color: red;
                                      "
                                    >
                                      $ ${total}
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    
          <div style="margin: 0px auto; max-width: 600px">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      direction: ltr;
                      font-size: 0px;
                      padding: 0px;
                      text-align: center;
                    "
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
    `,
  };
};

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }
  sendWelcome: (from, to, subject, text) => {},
  async sendReceipt({
    username,
    orderNumber,
    orderTime,
    total,
    orderItems,
    to,
    baseUrl,
  }) {
    return await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        to,
        from: process.env.ADMIN_EMAIL,
      },
      receiptTemplate({ username, orderItems, total, baseUrl })
    );
  },
};
