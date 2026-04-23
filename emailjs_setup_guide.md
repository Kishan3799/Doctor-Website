# EmailJS Setup Guide — BrightSmile Dental Care

This guide walks you through setting up **two EmailJS templates** — one for the **Book Appointment** form and one for the **Contact** form — and wiring your credentials into the project.

---

## Step 1 — Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for free.
2. The **free tier** allows **200 emails/month** — enough for a dental practice.

---

## Step 2 — Connect an Email Service

1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**.
2. Choose your email provider (Gmail, Outlook, etc.).
3. Authenticate it and click **Create Service**.
4. Copy the **Service ID** (e.g. `service_abc123`). You'll need this.

---

## Step 3 — Create Template 1: Appointment Confirmation

Go to **Email Templates** → **Create New Template**.

### Template Name
`Appointment Request — BrightSmile`

### Subject Line
```
New Appointment Request from {{from_name}}
```

### Email Body (paste this into the template editor)

```
Hello {{to_name}},

You have received a new appointment request:

───────────────────────────────
👤 PATIENT DETAILS
───────────────────────────────
Name:     {{from_name}}
Email:    {{from_email}}
Phone:    {{from_phone}}

───────────────────────────────
📅 APPOINTMENT DETAILS
───────────────────────────────
Preferred Date:    {{appointment_date}}
Preferred Time:    {{appointment_time}}
Service Needed:    {{service_needed}}

───────────────────────────────
📝 ADDITIONAL NOTES
───────────────────────────────
{{message}}

───────────────────────────────

Please follow up with the patient at {{from_email}} or {{from_phone}} to confirm.

— BrightSmile Dental Care Website
```

### Template Settings (important)
| Setting | Value |
|---|---|
| **To Email** | `hello@brightsmiledental.com` (your clinic email) |
| **From Name** | `BrightSmile Dental Website` |
| **Reply To** | `{{reply_to}}` |

### Template Variables used (all must match exactly)
| Variable | Source |
|---|---|
| `{{from_name}}` | Patient's full name |
| `{{from_email}}` | Patient's email |
| `{{from_phone}}` | Patient's phone number |
| `{{appointment_date}}` | Preferred appointment date |
| `{{appointment_time}}` | Preferred appointment time |
| `{{service_needed}}` | Service selected |
| `{{message}}` | Additional notes |
| `{{to_name}}` | "BrightSmile Dental Care" |
| `{{reply_to}}` | Patient's email (for Reply-To header) |

4. Click **Save**.
5. Copy the **Template ID** (e.g. `template_appt01`).

---

## Step 4 — Create Template 2: Contact Form

Go to **Email Templates** → **Create New Template**.

### Template Name
`Contact Form — BrightSmile`

### Subject Line
```
New Message: {{subject}} — from {{from_name}}
```

### Email Body

```
Hello {{to_name}},

You have received a new contact form message:

───────────────────────────────
👤 SENDER DETAILS
───────────────────────────────
Name:    {{from_name}}
Email:   {{from_email}}

───────────────────────────────
📋 SUBJECT
───────────────────────────────
{{subject}}

───────────────────────────────
💬 MESSAGE
───────────────────────────────
{{message}}

───────────────────────────────

Reply directly to this email to respond to {{from_name}}.

— BrightSmile Dental Care Website
```

### Template Settings
| Setting | Value |
|---|---|
| **To Email** | `hello@brightsmiledental.com` |
| **From Name** | `BrightSmile Dental Website` |
| **Reply To** | `{{reply_to}}` |

### Template Variables used
| Variable | Source |
|---|---|
| `{{from_name}}` | Sender's name |
| `{{from_email}}` | Sender's email |
| `{{subject}}` | Message subject |
| `{{message}}` | Message body |
| `{{to_name}}` | "BrightSmile Dental Care" |
| `{{reply_to}}` | Sender's email (Reply-To header) |

5. Click **Save**.
6. Copy the **Template ID** (e.g. `template_contact01`).

---

## Step 5 — Get Your Public Key

1. In EmailJS dashboard → **Account** → **General** tab.
2. Copy the **Public Key** (e.g. `ABCdefGHIjkl_XYZ`).

---

## Step 6 — Add Credentials to the Project

Open this file in your project:

**`d:\Ai Development\Doctor-Website\src\lib\emailjs.config.js`**

Replace the placeholder values:

```js
export const EMAILJS_CONFIG = {
  APPOINTMENT: {
    SERVICE_ID:  'service_abc123',        // ← your actual Service ID
    TEMPLATE_ID: 'template_appt01',       // ← Appointment Template ID
    PUBLIC_KEY:  'ABCdefGHIjkl_XYZ',     // ← your Public Key
  },
  CONTACT: {
    SERVICE_ID:  'service_abc123',        // ← same Service ID
    TEMPLATE_ID: 'template_contact01',    // ← Contact Template ID
    PUBLIC_KEY:  'ABCdefGHIjkl_XYZ',     // ← same Public Key
  },
};
```

> [!TIP]
> Both forms can share the **same Service ID and Public Key**. Only the Template ID differs.

---

## Step 7 — Test It

1. Run `npm run dev`
2. Fill out the **Book Appointment** form and submit
3. Check your inbox at `hello@brightsmiledental.com`
4. Repeat with the **Contact** form

> [!NOTE]
> EmailJS free tier sends from their servers. The **Reply To** is set to the patient's email so when you click Reply in your inbox, it goes directly to the patient.

---

## Email Flow Summary

```
Patient fills form → EmailJS sends email → Doctor's inbox receives notification
                                        ↓
                              Doctor clicks "Reply"
                                        ↓
                           Reply goes directly to patient
```

---

## Troubleshooting

| Error | Fix |
|---|---|
| `The Public Key is invalid` | Double-check the key in Account → General tab |
| `The Service ID does not exist` | Verify Service ID in Email Services tab |
| `Template not found` | Verify Template ID in Email Templates tab |
| `400 Bad Request` | Check that ALL `{{variable}}` names in your template exactly match the code |

