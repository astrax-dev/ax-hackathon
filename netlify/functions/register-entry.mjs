// #genai
import nodemailer from "nodemailer";
import { EMAIL_FUNCTION_CONFIG } from "../../src/config/constants.js";

function getMissingEnvVars() {
  return EMAIL_FUNCTION_CONFIG.requiredEnvVars.filter((key) => !process.env[key]);
}

function sanitize(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildMessageField(label, value) {
  if (!value) return null;
  return `<tr><td style="padding:8px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#444;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`;
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method not allowed." }),
    };
  }

  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    console.error("Missing SMTP env vars:", missingEnvVars.join(", "));
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: `Email service is not configured. Missing: ${missingEnvVars.join(", ")}`,
      }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid request body." }),
    };
  }

  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const name = sanitize(payload.name);
  const idea = sanitize(payload.idea);
  const pageUrl = sanitize(payload.pageUrl);

  if (!email || !phone || !name || !idea) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Name, email, phone, and idea are all required.",
      }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_FUNCTION_CONFIG.smtpHost,
    port: EMAIL_FUNCTION_CONFIG.smtpPort,
    secure: EMAIL_FUNCTION_CONFIG.smtpSecure,
    auth: {
      user: EMAIL_FUNCTION_CONFIG.smtpUser,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `AstraX Hackathon 2026 entry from ${name}`;
  const htmlRows = [
    buildMessageField("Name", name),
    buildMessageField("Email", email),
    buildMessageField("Phone", phone),
    buildMessageField("Idea", idea),
    buildMessageField("Page URL", pageUrl),
  ]
    .filter(Boolean)
    .join("");

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Idea: ${idea}`,
    `Page URL: ${pageUrl || "-"}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"${EMAIL_FUNCTION_CONFIG.smtpFromName}" <${EMAIL_FUNCTION_CONFIG.smtpFromEmail}>`,
      to: EMAIL_FUNCTION_CONFIG.sendToEmail,
      replyTo: email,
      subject,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#3B82F6;">AstraX Hackathon 2026 entry</h2>
          <p style="margin:0 0 20px;color:#555;">A new entry was registered for AstraX Hackathon 2026.</p>
          <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Your entry has been submitted successfully.",
      }),
    };
  } catch (error) {
    console.error("Failed to send AstraX Hackathon 2026 entry email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "We could not submit your entry right now.",
      }),
    };
  }
}
