'use client'

import { Container } from '@/components/Container'
import { ContentLayout } from '@/components/ContentLayout'
import { Button } from '@/components/Button'

function CookieSection({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  )
}

function UpdatePreferencesButton() {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        const event = new CustomEvent('openCookiePreferences')
        window.dispatchEvent(event)
      }}
    >
      Update Cookie Preferences
    </Button>
  )
}

export default function CookiePolicy() {
  return (
    <ContentLayout>
      <div className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Background decorative elements */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-slate-50">
          <svg
            className="absolute inset-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-slate-200"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="-1"
              >
                <path d="M.5 40V.5H40" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#grid-pattern)"
            />
          </svg>
        </div>

        <Container className="relative">
          {/* Header section */}
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Cookie Policy
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Last updated: {new Date().toLocaleDateString('en-CH')}
              </p>
            </div>

            {/* Table of contents */}
            <div className="mt-12 rounded-2xl bg-slate-50 px-8 py-6">
              <h2 className="text-lg font-semibold text-slate-900">Contents</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#what-are-cookies" className="hover:text-blue-600">
                    What are Cookies?
                  </a>
                </li>
                <li>
                  <a href="#types-of-cookies" className="hover:text-blue-600">
                    Types of Cookies We Use
                  </a>
                </li>
                <li>
                  <a href="#your-rights" className="hover:text-blue-600">
                    Your Rights and Choices
                  </a>
                </li>
                <li>
                  <a href="#how-to-control" className="hover:text-blue-600">
                    How to Control Cookies
                  </a>
                </li>
                <li>
                  <a href="#contact-us" className="hover:text-blue-600">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#updates" className="hover:text-blue-600">
                    Updates to This Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Main content */}
            <div className="prose prose-slate mt-16 space-y-12">
              <CookieSection title="What are Cookies?" id="what-are-cookies">
                <p className="text-slate-600">
                  Cookies are small text files that are stored on your device
                  when you visit a website. They serve various purposes and can
                  enhance your browsing experience. Some cookies are essential
                  for the website to function properly, while others help us
                  improve our services.
                </p>
              </CookieSection>

              <CookieSection
                title="Types of Cookies We Use"
                id="types-of-cookies"
              >
                <div className="mt-8 space-y-8">
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      Essential Cookies
                    </h3>
                    <p className="mt-2 text-slate-600">
                      These cookies are necessary for the website to function
                      properly. They enable basic functions like page navigation
                      and access to secure areas of the website. The website
                      cannot function properly without these cookies.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      Analytics Cookies
                    </h3>
                    <p className="mt-2 text-slate-600">
                      These cookies help us understand how visitors interact
                      with our website by collecting and reporting information
                      anonymously. This helps us improve our website and
                      services.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      Marketing Cookies
                    </h3>
                    <p className="mt-2 text-slate-600">
                      These cookies are used to track visitors across websites.
                      The intention is to display ads that are relevant and
                      engaging for the individual user.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      Preference Cookies
                    </h3>
                    <p className="mt-2 text-slate-600">
                      These cookies enable the website to remember information
                      that changes the way the website behaves or looks, like
                      your preferred language or the region you are in.
                    </p>
                  </div>
                </div>
              </CookieSection>

              <CookieSection title="Your Rights and Choices" id="your-rights">
                <p className="text-slate-600">
                  Under Swiss and EU data protection laws, you have the right
                  to:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Accept or decline cookies (except essential cookies)</li>
                  <li>Change your cookie preferences at any time</li>
                  <li>Delete cookies stored on your device</li>
                  <li>Be informed about how we use cookies</li>
                  <li>Understand what data we collect and how we use it</li>
                </ul>
                <div className="mt-8 flex justify-center">
                  <UpdatePreferencesButton />
                </div>
              </CookieSection>

              <CookieSection title="How to Control Cookies" id="how-to-control">
                <div className="space-y-4 text-slate-600">
                  <p>
                    You can control and/or delete cookies as you wish. You can
                    delete all cookies that are already on your device and you
                    can set most browsers to prevent them from being placed.
                    However, if you do this, you may have to manually adjust
                    some preferences every time you visit our website and some
                    services and functionalities may not work.
                  </p>
                  <p>
                    Most web browsers allow some control of most cookies through
                    the browser settings. To find out more about cookies,
                    including how to see what cookies have been set, visit{' '}
                    <a
                      href="https://www.aboutcookies.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      www.aboutcookies.org
                    </a>
                  </p>
                </div>
              </CookieSection>

              <CookieSection title="Contact Us" id="contact-us">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-slate-600">
                    If you have any questions about our use of cookies or this
                    Cookie Policy, please contact us at:
                  </p>
                  <div className="mt-4 space-y-2 text-slate-700">
                    <p className="font-semibold">MaxApp AG</p>
                    <p>Email: privacy@maxapp.ch</p>
                    <p>Address: Rotkreuz, Switzerland</p>
                  </div>
                </div>
              </CookieSection>

              <CookieSection title="Updates to This Policy" id="updates">
                <p className="text-slate-600">
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices or for operational, legal, or
                  regulatory reasons. We encourage you to periodically review
                  this page for the latest information on our cookie practices.
                </p>
              </CookieSection>
            </div>
          </div>
        </Container>
      </div>
    </ContentLayout>
  )
}
