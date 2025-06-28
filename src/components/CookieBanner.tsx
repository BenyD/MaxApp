'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/Button'

type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const defaultConsent: CookieConsent = {
  necessary: true, // Always true as these are essential
  analytics: false,
  marketing: false,
  preferences: false,
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent)

  useEffect(() => {
    // Check if we already have consent stored
    const storedConsent = localStorage.getItem('cookieConsent')
    if (!storedConsent) {
      setIsVisible(true)
    } else {
      setConsent(JSON.parse(storedConsent))
    }

    // Listen for the custom event to open preferences
    const handleOpenPreferences = () => {
      const storedConsent = localStorage.getItem('cookieConsent')
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent))
      }
      setIsVisible(true)
      setShowPreferences(true)
    }

    window.addEventListener('openCookiePreferences', handleOpenPreferences)
    return () => {
      window.removeEventListener('openCookiePreferences', handleOpenPreferences)
    }
  }, [])

  const handleAcceptAll = () => {
    const fullConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    localStorage.setItem('cookieConsent', JSON.stringify(fullConsent))
    setIsVisible(false)
    // Here you would typically initialize your analytics and other tools
  }

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(defaultConsent))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setIsVisible(false)
    setShowPreferences(false)
    // Here you would typically initialize/remove your analytics and other tools based on consent
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col justify-between gap-x-8 gap-y-4 bg-white/80 p-6 shadow-lg ring-1 ring-slate-900/10 backdrop-blur-sm md:flex-row md:items-center lg:px-8">
      {!showPreferences ? (
        <>
          <p className="max-w-4xl text-sm leading-6 text-slate-700">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking &quot;Accept all,&quot; you consent to our use
            of cookies. See our{' '}
            <Link
              href="/cookie-policy"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              cookie policy
            </Link>{' '}
            for more information about how we use cookies and how to manage your
            preferences.
          </p>
          <div className="flex flex-none items-center gap-x-5">
            <Button
              onClick={() => handleAcceptAll()}
              color="blue"
              className="whitespace-nowrap"
            >
              Accept all
            </Button>
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-sm leading-6 font-semibold text-slate-900 hover:text-slate-700"
            >
              Customize
            </button>
            <button
              type="button"
              onClick={() => handleRejectAll()}
              className="text-sm leading-6 font-semibold text-slate-900 hover:text-slate-700"
            >
              Reject all
            </button>
          </div>
        </>
      ) : (
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Cookie Preferences
            </h3>
            <Button
              onClick={() => handleSavePreferences()}
              color="blue"
              className="whitespace-nowrap"
            >
              Save preferences
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-900">Essential Cookies</p>
                <p className="text-sm text-slate-600">
                  Required for the website to function properly. Cannot be
                  disabled.
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.necessary}
                disabled
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 py-3">
              <div>
                <p className="font-medium text-slate-900">Analytics Cookies</p>
                <p className="text-sm text-slate-600">
                  Help us improve our website by collecting anonymous usage
                  information.
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) =>
                  setConsent({ ...consent, analytics: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 py-3">
              <div>
                <p className="font-medium text-slate-900">Marketing Cookies</p>
                <p className="text-sm text-slate-600">
                  Used to track visitors across websites to display relevant
                  advertisements.
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) =>
                  setConsent({ ...consent, marketing: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 py-3">
              <div>
                <p className="font-medium text-slate-900">Preference Cookies</p>
                <p className="text-sm text-slate-600">
                  Remember your settings and preferences for a better
                  experience.
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent.preferences}
                onChange={(e) =>
                  setConsent({ ...consent, preferences: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
