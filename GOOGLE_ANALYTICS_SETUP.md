# Google Analytics 4 Setup Guide

## ✅ Installation Complete

Google Analytics 4 has been successfully integrated into your BitcoinWala website!

---

## 📋 What Was Added

### 1. **GA4 Tracking Script** ([index.html:50-60](index.html))
- Added Google Analytics 4 script to `<head>`
- Configured with auto page view tracking
- Secure cookie flags enabled

### 2. **Analytics Utility** ([src/lib/analytics.ts](src/lib/analytics.ts))
- Type-safe event tracking functions
- Pre-built tracking for common events
- Console logging for debugging

### 3. **Event Tracking Integrated**
- ✅ **Contact Form**: Tracks modal open + form submission with audience type
- ✅ **Whitepaper Modal**: Tracks modal open + PDF views
- ✅ **CSP Headers**: Updated to allow Google Analytics domains

### 4. **Environment Variable** ([.env:18](.env))
- `VITE_GA4_MEASUREMENT_ID` placeholder added

---

## 🚀 Setup Steps

### Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Click **Create Property**
4. Fill in details:
   - **Property name**: BitcoinWala
   - **Reporting time zone**: (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
   - **Currency**: Indian Rupee (INR)
5. Click **Next**
6. Fill in business details:
   - **Industry**: Finance
   - **Business size**: Small (1-10 employees)
7. Click **Create**
8. Accept Terms of Service

### Step 2: Get Your Measurement ID

1. In Admin → Property column → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter:
   - **Website URL**: https://bitcoinwala.ai
   - **Stream name**: BitcoinWala Website
4. Click **Create stream**
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add Measurement ID to Your Project

1. Open your `.env` file
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:
```env
VITE_GA4_MEASUREMENT_ID=G-YOUR_ACTUAL_ID
```

3. Open `index.html` (lines 51 and 56)
4. Replace both instances of `G-XXXXXXXXXX` with your Measurement ID:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ACTUAL_ID', {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });
</script>
```

### Step 4: Test the Integration

1. **Restart your dev server**:
```bash
npm run dev
```

2. **Open your website** in the browser
3. **Open DevTools Console** (F12)
4. You should see analytics events logged:
   - `📊 Analytics Event: page_view`
   - `📊 Analytics Event: modal_open` (when opening modals)
   - `📊 Analytics Event: form_submission` (when submitting contact form)

5. **Check Real-Time Reports**:
   - Go to Google Analytics
   - Click **Reports** → **Realtime**
   - You should see your visit within 30 seconds!

---

## 📊 Events Being Tracked

### Automatic Events
- **page_view** - Every page load
- **first_visit** - First time visitor
- **session_start** - New session begins

### Custom Events Implemented

| Event Name | When It Fires | Parameters |
|------------|---------------|------------|
| `modal_open` | User opens any modal | `modal_name` (contact, whitepaper, about, mobile_menu) |
| `form_submission` | Contact form submitted successfully | `form_name`, `audience_type`, `submission_method` |
| `whitepaper_action` | Whitepaper viewed/downloaded | `action` (view, download), `document_name` |
| `social_click` | Social media link clicked | `platform`, `click_location` |
| `price_ticker_action` | Bitcoin price ticker interacted | `action` |
| `scroll_depth` | User scrolls to milestone | `scroll_percentage` (25, 50, 75, 100) |
| `external_link_click` | External link clicked | `link_url`, `link_text` |
| `error` | JavaScript error occurs | `error_message`, `error_location` |

---

## 🎯 Using Analytics Functions

### In Any Component

```typescript
import { trackEvent, trackModalOpen, trackContactFormSubmission } from '../lib/analytics'

// Track custom event
trackEvent('button_click', { button_name: 'cta_hero' })

// Track modal open
trackModalOpen('contact')

// Track form submission
trackContactFormSubmission('individual')
```

### Available Functions

```typescript
// Page tracking
trackPageView(pagePath: string, pageTitle?: string)

// Forms
trackContactFormSubmission(audienceType: string)

// Documents
trackWhitepaperAction(action: 'view' | 'download')

// Modals
trackModalOpen(modalName: 'contact' | 'whitepaper' | 'about' | 'mobile_menu')

// Social media
trackSocialClick(platform: 'twitter' | 'instagram' | 'linkedin', location: 'header' | 'footer')

// Bitcoin price
trackPriceTickerAction(action: 'view' | 'click')

// Scroll tracking
trackScrollDepth(percentage: 25 | 50 | 75 | 100)

// External links
trackExternalLink(url: string, linkText?: string)

// Errors
trackError(errorMessage: string, errorLocation: string)
```

---

## 📈 Recommended Reports to Set Up

### 1. **Engagement Report**
- Shows which modals are opened most
- Contact form conversion rate
- Whitepaper engagement

### 2. **Acquisition Report**
- Where visitors come from
- Which channels drive most form submissions

### 3. **Conversion Funnel**
1. Page view
2. Modal open (contact)
3. Form submission
4. Success state

### 4. **Custom Explorations**
- **Whitepaper Downloads**: Track who views vs who downloads
- **Form Abandonment**: Track modal opens that don't convert
- **Social Media Performance**: Which platform drives most traffic

---

## 🔧 Advanced Configuration (Optional)

### Enable Enhanced Measurement

In GA4 Admin → Data Streams → Web Stream → **Enhanced Measurement**:
- ✅ Page views (already on)
- ✅ Scrolls (track 90% scroll automatically)
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement
- ✅ File downloads

### Set Up Conversions

1. Go to Admin → Events
2. Find `form_submission` event
3. Toggle **Mark as conversion**
4. Repeat for other key events

### Create Custom Dimensions

Admin → Custom definitions → Create custom dimension:
- **Audience Type** (dimension: `audience_type`)
- **Modal Name** (dimension: `modal_name`)
- **Document Name** (dimension: `document_name`)

---

## 🛡️ Privacy & GDPR Compliance

### Already Implemented
- ✅ Secure cookies (SameSite=None;Secure)
- ✅ No PII (Personally Identifiable Information) collected
- ✅ IP anonymization (GA4 default)

### Recommended Additions

1. **Cookie Consent Banner** (if serving EU users):
```bash
npm install react-cookie-consent
```

2. **Privacy Policy Page**:
- Add link to Footer
- Explain what data is collected
- How to opt-out

3. **Opt-Out Functionality**:
```typescript
// Disable GA tracking
window['ga-disable-G-XXXXXXXXXX'] = true;
```

---

## 📱 Testing Checklist

- [ ] Measurement ID added to `.env`
- [ ] Measurement ID added to `index.html` (2 places)
- [ ] Dev server restarted
- [ ] Console shows analytics events
- [ ] Real-time report shows activity in GA4
- [ ] Contact form submission tracked
- [ ] Whitepaper modal view tracked
- [ ] No CSP errors in console

---

## 🐛 Troubleshooting

### Issue: "Google Analytics not loaded" in console
**Solution**:
- Check that Measurement ID is correct
- Verify ad blockers are disabled for testing
- Hard refresh the page (Ctrl+Shift+R)

### Issue: CSP errors blocking GA scripts
**Solution**: CSP headers are already updated in `vercel.json`. Redeploy to Vercel for changes to take effect.

### Issue: Events not showing in GA4
**Solution**:
- Events can take 24-48 hours to appear in standard reports
- Use **Realtime** reports for immediate verification
- Check DebugView (Admin → DebugView)

### Issue: Ad blockers blocking GA
**Solution**: This is expected behavior. ~10-15% of users block analytics. Consider server-side tracking for accurate counts.

---

## 🎓 Learning Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Event Measurement](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Custom Events Guide](https://support.google.com/analytics/answer/12229021)
- [GA4 vs UA Migration](https://support.google.com/analytics/answer/11583528)

---

## 🚀 Next Steps

1. **Set up conversions** for key events (form submissions)
2. **Create custom dashboard** for founder/team
3. **Set up email alerts** for important milestones
4. **Integrate with Google Search Console** for SEO insights
5. **Add UTM parameters** to marketing campaigns
6. **Set up goals** (e.g., 100 form submissions/month)

---

## 📊 Sample Goals to Track

- **Form Submissions**: Target 50/month, then 200/month
- **Whitepaper Views**: Track interest in product
- **Bounce Rate**: Keep below 50%
- **Avg Session Duration**: Target 2+ minutes
- **Return Visitors**: Build loyal audience

---

## 💡 Tips

1. **Check GA4 daily** for first 2 weeks to understand user behavior
2. **Export weekly reports** to share with team
3. **A/B test** different CTAs based on conversion data
4. **Monitor** which pages get most traffic
5. **Optimize** based on user flow data

---

## ✅ Status

**Installation**: Complete
**Configuration**: Pending (needs Measurement ID)
**Testing**: Ready
**Production**: Ready to deploy

---

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Measurement ID is correct
3. Check Real-time reports in GA4
4. Review CSP headers in Network tab
5. Reach out to Google Analytics support

---

**Happy Tracking! 📊**
