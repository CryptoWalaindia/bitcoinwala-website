# EmailJS Setup Guide for BitcoinWala Contact Form

This guide will help you set up EmailJS to receive contact form submissions directly to your Gmail account (mdrizvanali01@gmail.com).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service (Gmail)

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Click "Connect Account" and authorize EmailJS to access your Gmail
5. Give your service a name (e.g., "BitcoinWala Gmail")
6. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Settings:
- **Template Name**: BitcoinWala Contact Form
- **Subject**: New Contact Form Submission from {{from_name}}

### Template Content:
```
Hello,

You have received a new contact form submission from your BitcoinWala website.

Contact Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Audience Type: {{audience_type}}

Message: {{message}}

You can reply directly to this email to respond to {{from_name}}.

Best regards,
BitcoinWala Website
```

### Template Variables:
Make sure these variables are set in your template:
- `{{from_name}}` - Contact person's full name
- `{{from_email}}` - Contact person's email
- `{{phone}}` - Contact person's phone number
- `{{audience_type}}` - Individual or Company
- `{{message}}` - Automated message about the submission
- `{{to_email}}` - Your email (mdrizvanali01@gmail.com)

4. Save the template and copy the **Template ID**

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your website and test the contact form
3. Check your Gmail inbox for the test email

## Important Notes

### Security
- The EmailJS public key is safe to expose in client-side code
- EmailJS handles the secure email sending on their servers
- Your Gmail credentials are never exposed

### Rate Limits
- Free EmailJS account: 200 emails/month
- If you need more, consider upgrading to a paid plan

### Troubleshooting

**If emails aren't being sent:**
1. Check browser console for error messages
2. Verify all environment variables are set correctly
3. Make sure your EmailJS service is active
4. Check your EmailJS dashboard for any error logs

**If emails go to spam:**
1. Add your EmailJS sending domain to your contacts
2. Check the email template formatting
3. Consider using a custom domain for sending

### Email Template Tips

1. **Subject Line**: Make it descriptive and include {{from_name}}
2. **Reply-To**: Set to {{from_email}} so you can reply directly
3. **Formatting**: Use clear formatting for easy reading
4. **Auto-Reply**: Consider setting up an auto-reply template for users

## Support

If you encounter issues:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Review the browser console for error messages
3. Test with a simple template first
4. Verify your Gmail account has proper permissions

## Next Steps

After setup is complete:
1. Test the form thoroughly
2. Consider adding form validation
3. Set up email notifications/auto-replies
4. Monitor your EmailJS usage in the dashboard

---

**Your Gmail**: mdrizvanali01@gmail.com
**Project**: BitcoinWala Website Contact Form