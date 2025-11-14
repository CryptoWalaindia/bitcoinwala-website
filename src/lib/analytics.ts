// Google Analytics 4 event tracking utilities
// This file provides type-safe event tracking for GA4

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetOrAction: string | Date,
      params?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - The name of the event to track
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
    console.log(`📊 Analytics Event: ${eventName}`, eventParams)
  } else {
    console.warn('Google Analytics not loaded')
  }
}

/**
 * Track page view
 * @param pagePath - The path of the page being viewed
 * @param pageTitle - The title of the page
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  })
}

/**
 * Track contact form submission
 * @param audienceType - Type of audience (individual or company)
 */
export function trackContactFormSubmission(audienceType: string) {
  trackEvent('form_submission', {
    form_name: 'contact_form',
    audience_type: audienceType,
    submission_method: 'modal',
  })
}

/**
 * Track whitepaper view/download
 * @param action - 'view' or 'download'
 */
export function trackWhitepaperAction(action: 'view' | 'download') {
  trackEvent('whitepaper_action', {
    action: action,
    document_name: 'BitcoinWala_Whitepaper.pdf',
  })
}

/**
 * Track modal open events
 * @param modalName - Name of the modal that was opened
 */
export function trackModalOpen(modalName: 'contact' | 'whitepaper' | 'about' | 'mobile_menu') {
  trackEvent('modal_open', {
    modal_name: modalName,
  })
}

/**
 * Track social media link clicks
 * @param platform - The social media platform
 * @param location - Where the link was clicked from
 */
export function trackSocialClick(platform: 'twitter' | 'instagram' | 'linkedin', location: 'header' | 'footer') {
  trackEvent('social_click', {
    platform: platform,
    click_location: location,
  })
}

/**
 * Track Bitcoin price ticker interactions
 * @param action - The action performed
 */
export function trackPriceTickerAction(action: 'view' | 'click') {
  trackEvent('price_ticker_action', {
    action: action,
  })
}

/**
 * Track scroll depth
 * @param percentage - Percentage of page scrolled (25, 50, 75, 100)
 */
export function trackScrollDepth(percentage: 25 | 50 | 75 | 100) {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
  })
}

/**
 * Track external link clicks
 * @param url - The URL being navigated to
 * @param linkText - The text of the link
 */
export function trackExternalLink(url: string, linkText?: string) {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
  })
}

/**
 * Track errors
 * @param errorMessage - Description of the error
 * @param errorLocation - Where the error occurred
 */
export function trackError(errorMessage: string, errorLocation: string) {
  trackEvent('error', {
    error_message: errorMessage,
    error_location: errorLocation,
  })
}
