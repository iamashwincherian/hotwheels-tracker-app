"use server";

import nodemailer from "nodemailer";
import { URL } from "@/constants";

const { SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, SEND_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export default async function sendEmail(newDrops: string[]) {
  if (!(SEND_EMAIL && JSON.parse(SEND_EMAIL))) return;

  const makeEmailBody = () => {
    let body = `<h3>Here is the list of new hot wheel drops in <a href="${URL}">Karzanddolls</a>:</h3>`;
    let table =
      "<table border='1' style='border: 1px solid black; border-collapse: collapse; border-spacing: 0px;'>";

    newDrops.forEach((product) => {
      table += `<tr><td style="padding: 5px 10px;">${product}</td></tr>`;
    });

    table += "</table>";
    body += table;
    return body;
  };

  await transporter.sendMail({
    from: `Hot Wheels Tracker <${SMTP_SERVER_USERNAME}>`,
    to: SMTP_SERVER_USERNAME,
    subject: `New Hotwheels Drop! ${newDrops.length} new cars!`,
    html: makeEmailBody(),
  });

  console.log("Email has been sent!");

  return;
}
