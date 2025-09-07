# 🚀 Quick Start - EmailJS Setup

## ✅ What's Done
- Contact form is fully integrated with EmailJS
- All code changes are complete
- Build is working perfectly
- Email will be sent to: **mdrizvanali01@gmail.com**

## 🔧 What You Need to Do (5 minutes)

### 1. Create EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/)
- Sign up with your email
- Verify your account

### 2. Connect Gmail Service
- In EmailJS dashboard → "Email Services"
- Click "Add New Service" → Select "Gmail"
- Connect your Gmail account (mdrizvanali01@gmail.com)
- Copy the **Service ID**

### 3. Create Email Template
- Go to "Email Templates" → "Create New Template"
- **Subject**: `New Contact Form Submission from {{from_name}}`
- **Content**:
```
Hello,

New contact form submission from BitcoinWala website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Type: {{audience_type}}

{{message}}

Reply directly to respond.
```
- Copy the **Template ID**

### 4. Get Public Key
- Go to "Account" → "General"
- Copy your **Public Key**

### 5. Update .env File
Replace the values in `.env`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### 6. Test It!
```bash
npm run dev
```
- Open the website
- Fill out the contact form
- Check your Gmail!

## 🧪 Debug Mode
Open browser console and run:
```javascript
testEmailJS()
```

## 📧 What You'll Receive
Every form submission sends a formatted email to **mdrizvanali01@gmail.com** with:
- User's name, email, phone
- Whether they're individual or company
- You can reply directly to their email

---
**Need help?** Check `EMAILJS_SETUP.md` for detailed instructions!