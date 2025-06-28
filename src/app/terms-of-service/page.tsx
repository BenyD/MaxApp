'use client'

import { Container } from '@/components/Container'
import { ContentLayout } from '@/components/ContentLayout'

function TermsSection({
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

export default function TermsOfService() {
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
                Terms of Service
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
                  <a href="#agreement" className="hover:text-blue-600">
                    Agreement to Terms
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600">
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#intellectual-property"
                    className="hover:text-blue-600"
                  >
                    Intellectual Property Rights
                  </a>
                </li>
                <li>
                  <a href="#user-accounts" className="hover:text-blue-600">
                    User Accounts
                  </a>
                </li>
                <li>
                  <a href="#prohibited-uses" className="hover:text-blue-600">
                    Prohibited Uses
                  </a>
                </li>
                <li>
                  <a href="#termination" className="hover:text-blue-600">
                    Termination
                  </a>
                </li>
                <li>
                  <a href="#liability" className="hover:text-blue-600">
                    Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#governing-law" className="hover:text-blue-600">
                    Governing Law
                  </a>
                </li>
                <li>
                  <a href="#changes" className="hover:text-blue-600">
                    Changes to Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Main content */}
            <div className="prose prose-slate mt-16 space-y-12">
              <TermsSection title="Agreement to Terms" id="agreement">
                <p className="text-slate-600">
                  By accessing and using MaxApp AG's services, you agree to be
                  bound by these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using our services.
                </p>
              </TermsSection>

              <TermsSection title="Services" id="services">
                <div className="space-y-4 text-slate-600">
                  <p>
                    We provide custom software development, web applications,
                    and digital solutions. Our services include:
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Custom software development</li>
                    <li>Web application development</li>
                    <li>Mobile application development</li>
                    <li>Technical consulting</li>
                    <li>Maintenance and support services</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any
                    part of our services at any time.
                  </p>
                </div>
              </TermsSection>

              <TermsSection
                title="Intellectual Property Rights"
                id="intellectual-property"
              >
                <div className="space-y-4 text-slate-600">
                  <p>
                    All intellectual property rights in our services and
                    deliverables remain our property unless explicitly agreed
                    otherwise in writing. This includes:
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Source code and software</li>
                    <li>Designs and user interfaces</li>
                    <li>Documentation and specifications</li>
                    <li>Trademarks and logos</li>
                  </ul>
                  <p>
                    Client-specific deliverables will be governed by separate
                    agreements specifying intellectual property ownership.
                  </p>
                </div>
              </TermsSection>

              <TermsSection title="User Accounts" id="user-accounts">
                <div className="space-y-4 text-slate-600">
                  <p>
                    When creating an account with us, you must provide accurate
                    and complete information. You are responsible for:
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Maintaining the confidentiality of your account</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us of any unauthorized access</li>
                  </ul>
                </div>
              </TermsSection>

              <TermsSection title="Prohibited Uses" id="prohibited-uses">
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                  <p className="text-slate-600">
                    You may not use our services for any unlawful purpose or in
                    any way that could damage, disable, overburden, or impair
                    our services, including:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                    <li>Violating any applicable laws or regulations</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Transmitting harmful code or malware</li>
                    <li>Attempting to gain unauthorized access</li>
                    <li>
                      Interfering with other users&apos; access to the services
                    </li>
                  </ul>
                </div>
              </TermsSection>

              <TermsSection title="Termination" id="termination">
                <p className="text-slate-600">
                  We may terminate or suspend your access to our services
                  immediately, without prior notice or liability, for any
                  reason, including breach of these Terms. Upon termination,
                  your right to use our services will cease immediately.
                </p>
              </TermsSection>

              <TermsSection title="Limitation of Liability" id="liability">
                <div className="space-y-4 text-slate-600">
                  <p>
                    To the maximum extent permitted by law, we shall not be
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages resulting from:
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Your use or inability to use our services</li>
                    <li>Any unauthorized access to your data</li>
                    <li>
                      Any interruption or cessation of transmission to or from
                      our services
                    </li>
                    <li>
                      Any bugs, viruses, or other harmful code that may be
                      transmitted
                    </li>
                  </ul>
                </div>
              </TermsSection>

              <TermsSection title="Governing Law" id="governing-law">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-slate-600">
                    These Terms shall be governed by and construed in accordance
                    with the laws of Switzerland. Any disputes arising under
                    these Terms shall be subject to the exclusive jurisdiction
                    of the courts of Zug, Switzerland.
                  </p>
                  <p className="mt-4 text-slate-600">
                    For consumers within the EU, mandatory consumer protection
                    laws of their country of residence may apply in addition to
                    Swiss law.
                  </p>
                </div>
              </TermsSection>

              <TermsSection title="Changes to Terms" id="changes">
                <p className="text-slate-600">
                  We reserve the right to modify these Terms at any time. We
                  will notify users of any material changes via email or through
                  our services. Your continued use of our services following the
                  posting of changes constitutes acceptance of those changes.
                </p>
                <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                  <p className="text-slate-600">
                    For questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 space-y-2 text-slate-700">
                    <p className="font-semibold">MaxApp AG</p>
                    <p>Legal Department</p>
                    <p>Email: legal@maxapp.ch</p>
                    <p>Address: Rotkreuz, Switzerland</p>
                  </div>
                </div>
              </TermsSection>
            </div>
          </div>
        </Container>
      </div>
    </ContentLayout>
  )
}
