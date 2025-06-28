'use client'

import { Container } from '@/components/Container'
import { ContentLayout } from '@/components/ContentLayout'

function PolicySection({
  title,
  children,
  className = '',
  id,
}: {
  title: string
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section className={`space-y-4 ${className}`} id={id}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function PrivacyPolicy() {
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
                Privacy Policy
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
                  <a href="#introduction" className="hover:text-blue-600">
                    Introduction
                  </a>
                </li>
                <li>
                  <a href="#data-collection" className="hover:text-blue-600">
                    Data Collection and Use
                  </a>
                </li>
                <li>
                  <a href="#legal-basis" className="hover:text-blue-600">
                    Legal Basis for Processing
                  </a>
                </li>
                <li>
                  <a href="#data-sharing" className="hover:text-blue-600">
                    Data Sharing and Transfer
                  </a>
                </li>
                <li>
                  <a href="#your-rights" className="hover:text-blue-600">
                    Your Rights
                  </a>
                </li>
                <li>
                  <a href="#data-security" className="hover:text-blue-600">
                    Data Security
                  </a>
                </li>
                <li>
                  <a href="#retention" className="hover:text-blue-600">
                    Data Retention
                  </a>
                </li>
                <li>
                  <a href="#international" className="hover:text-blue-600">
                    International Data Transfers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600">
                    Contact Information
                  </a>
                </li>
              </ul>
            </div>

            {/* Main content */}
            <div className="prose prose-slate mt-16 space-y-12">
              <PolicySection title="Introduction" id="introduction">
                <p className="text-slate-600">
                  This Privacy Policy explains how MaxApp AG (&quot;we&quot;,
                  &quot;us&quot;, &quot;our&quot;) collects, uses, and protects
                  your personal data in accordance with the Swiss Federal Act on
                  Data Protection (FADP), the EU General Data Protection
                  Regulation (GDPR), and other applicable data protection laws.
                </p>
                <p className="text-slate-600">
                  We are committed to protecting your privacy and ensuring the
                  security of your personal data. This policy applies to all
                  personal data collected through our website, services, and
                  business operations.
                </p>
              </PolicySection>

              <PolicySection
                title="Data Collection and Use"
                id="data-collection"
              >
                <div className="space-y-6">
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      Information We Collect
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Contact information (name, email, phone number)</li>
                      <li>Business information (company name, role)</li>
                      <li>
                        Technical data (IP address, browser type, device
                        information)
                      </li>
                      <li>Usage data (how you interact with our services)</li>
                      <li>Communication data (inquiries, feedback)</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                    <h3 className="font-semibold text-slate-900">
                      How We Use Your Data
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                      <li>To provide and improve our services</li>
                      <li>To communicate with you about our services</li>
                      <li>To ensure the security of our services</li>
                      <li>To comply with legal obligations</li>
                      <li>To analyze and improve our website and services</li>
                    </ul>
                  </div>
                </div>
              </PolicySection>

              <PolicySection
                title="Legal Basis for Processing"
                id="legal-basis"
              >
                <p className="text-slate-600">
                  We process your personal data based on the following legal
                  grounds:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Your consent</li>
                  <li>Performance of a contract with you</li>
                  <li>Compliance with legal obligations</li>
                  <li>Our legitimate business interests</li>
                </ul>
              </PolicySection>

              <PolicySection
                title="Data Sharing and Transfer"
                id="data-sharing"
              >
                <p className="text-slate-600">
                  We may share your personal data with:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  <li>
                    Service providers and business partners who assist in our
                    operations
                  </li>
                  <li>Legal authorities when required by law</li>
                  <li>
                    Professional advisers (lawyers, accountants, auditors)
                  </li>
                </ul>
                <p className="mt-4 text-slate-600">
                  We ensure appropriate safeguards are in place when sharing
                  your data.
                </p>
              </PolicySection>

              <PolicySection title="Your Rights" id="your-rights">
                <p className="text-slate-600">
                  Under Swiss and EU data protection laws, you have the right
                  to:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Request erasure of your data</li>
                  <li>Object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
              </PolicySection>

              <PolicySection title="Data Security" id="data-security">
                <p className="text-slate-600">
                  We implement appropriate technical and organizational measures
                  to protect your personal data against unauthorized access,
                  alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Staff training on data protection</li>
                </ul>
              </PolicySection>

              <PolicySection title="Data Retention" id="retention">
                <p className="text-slate-600">
                  We retain your personal data only for as long as necessary to
                  fulfill the purposes for which it was collected, including
                  legal, accounting, or reporting requirements. When data is no
                  longer needed, it is securely deleted or anonymized.
                </p>
              </PolicySection>

              <PolicySection
                title="International Data Transfers"
                id="international"
              >
                <p className="text-slate-600">
                  We may transfer your data to countries outside Switzerland and
                  the European Economic Area (EEA). When we do, we ensure
                  appropriate safeguards are in place through:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Standard contractual clauses</li>
                  <li>Adequacy decisions by relevant authorities</li>
                  <li>Other legally approved transfer mechanisms</li>
                </ul>
              </PolicySection>

              <PolicySection title="Contact Information" id="contact">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-slate-600">
                    For any questions about this Privacy Policy or our data
                    practices, please contact our Data Protection Officer at:
                  </p>
                  <div className="mt-4 space-y-2 text-slate-700">
                    <p className="font-semibold">MaxApp AG</p>
                    <p>Data Protection Officer</p>
                    <p>Email: privacy@maxapp.ch</p>
                    <p>Address: Rotkreuz, Switzerland</p>
                  </div>
                  <p className="mt-4 text-slate-600">
                    You also have the right to lodge a complaint with the Swiss
                    Federal Data Protection and Information Commissioner (FDPIC)
                    or your local data protection authority.
                  </p>
                </div>
              </PolicySection>
            </div>
          </div>
        </Container>
      </div>
    </ContentLayout>
  )
}
