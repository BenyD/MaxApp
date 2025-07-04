'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import teamImage from '@/images/team.jpg'

type Office = {
  key: 'switzerland' | 'india' | 'srilanka'
  flag: string
}

const offices: Office[] = [
  {
    key: 'switzerland',
    flag: '🇨🇭',
  },
  {
    key: 'india',
    flag: '🇮🇳',
  },
  {
    key: 'srilanka',
    flag: '🇱🇰',
  },
]

type FormData = {
  firstName: string
  lastName: string
  email: string
  message: string
}

type FormErrors = {
  [K in keyof FormData]?: string
}

function FormInput({
  id,
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  autoComplete,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  type?: string
  icon: React.ComponentType<{ className?: string }>
  placeholder: string
  autoComplete?: string
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-900"
        >
          {label}
        </label>
      </div>
      <div className="relative mt-1">
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`block w-full rounded-lg border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 transition duration-200 ring-inset ${
              error
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-slate-200 focus:ring-blue-500'
            } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={`block w-full rounded-lg border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 transition duration-200 ring-inset ${
              error
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-slate-200 focus:ring-blue-500'
            } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
        )}
        {error && (
          <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <XCircleIcon className="h-3.5 w-3.5 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export function Contact() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null,
  )

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('form.firstName.error')
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('form.lastName.error')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.email.error.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.email.error.invalid')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.message.error')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Network response was not ok')
      }

      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative isolate bg-white px-6 py-16 sm:py-24 lg:px-8"
    >
      {/* Gradient Background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50" />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-lg font-semibold text-blue-600">
            {t('subtitle')}
          </p>
          <p className="mt-3 text-lg leading-8 text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl space-y-8">
          {/* Top Section: Contact Form and Info */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="group relative isolate flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl">
              <div className="mb-6 flex items-center gap-x-4">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 ring-1 ring-blue-200 ring-inset">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t('form.title')}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {t('form.description')}
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                <div className="flex-1 space-y-4">
                  {/* Name Fields Row */}
                  <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <FormInput
                      id="firstName"
                      label={t('form.firstName.label')}
                      icon={UserIcon}
                      placeholder={t('form.firstName.placeholder')}
                      value={formData.firstName}
                      onChange={(value) =>
                        setFormData({ ...formData, firstName: value })
                      }
                      error={errors.firstName}
                      autoComplete="given-name"
                    />
                    <FormInput
                      id="lastName"
                      label={t('form.lastName.label')}
                      icon={UserIcon}
                      placeholder={t('form.lastName.placeholder')}
                      value={formData.lastName}
                      onChange={(value) =>
                        setFormData({ ...formData, lastName: value })
                      }
                      error={errors.lastName}
                      autoComplete="family-name"
                    />
                  </div>

                  {/* Contact Fields Row */}
                  <div className="grid grid-cols-1 gap-x-4 gap-y-4">
                    <FormInput
                      id="email"
                      type="email"
                      label={t('form.email.label')}
                      icon={EnvelopeIcon}
                      placeholder={t('form.email.placeholder')}
                      value={formData.email}
                      onChange={(value) =>
                        setFormData({ ...formData, email: value })
                      }
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>

                  {/* Message Field */}
                  <FormInput
                    id="message"
                    type="textarea"
                    label={t('form.message.label')}
                    icon={ChatBubbleBottomCenterTextIcon}
                    placeholder={t('form.message.placeholder')}
                    value={formData.message}
                    onChange={(value) =>
                      setFormData({ ...formData, message: value })
                    }
                    error={errors.message}
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex items-center justify-end gap-x-4">
                  {submitStatus && (
                    <div
                      className={`flex items-center gap-x-2 text-xs ${
                        submitStatus === 'success'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <>
                          <CheckCircleIcon className="h-4 w-4" />
                          {t('form.submit.success')}
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-4 w-4" />
                          {t('form.submit.error')}
                        </>
                      )}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative py-2"
                  >
                    <span
                      className={`flex items-center gap-2 transition-opacity ${
                        isSubmitting ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      {isSubmitting
                        ? t('form.submit.sending')
                        : t('form.submit.button')}
                      <PaperAirplaneIcon className="h-4 w-4" />
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>

              {/* Decorative gradient background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>

            {/* Contact Information */}
            <div className="group relative isolate overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl">
              <div className="relative">
                <div className="mb-6 flex items-center gap-x-4">
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 ring-1 ring-emerald-200 ring-inset">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {t('info.title')}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {t('info.description')}
                    </p>
                  </div>
                </div>

                {/* Team Image */}
                <div className="relative mb-8 overflow-hidden rounded-2xl">
                  <div className="aspect-[16/9]">
                    <Image
                      src={teamImage}
                      alt="MaxApp Team"
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-900/5 ring-inset" />
                </div>

                <dl className="space-y-4 text-sm leading-6 text-slate-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <div className="rounded-lg bg-emerald-50/50 p-2 text-emerald-600/80 ring-1 ring-emerald-200/50 ring-inset">
                        <MapPinIcon className="h-5 w-5" />
                      </div>
                    </dt>
                    <dd className="flex flex-col">
                      <span className="font-medium text-slate-900">
                        {t('offices.switzerland.company')}
                      </span>
                      <span>{t('offices.switzerland.addressLine1')}</span>
                      <span>{t('offices.switzerland.addressLine2')}</span>
                      <span>{t('offices.switzerland.addressLine3')}</span>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <div className="rounded-lg bg-emerald-50/50 p-2 text-emerald-600/80 ring-1 ring-emerald-200/50 ring-inset">
                        <EnvelopeIcon className="h-5 w-5" />
                      </div>
                    </dt>
                    <dd className="flex items-center">
                      <a
                        className="transition-colors hover:text-emerald-600"
                        href={`mailto:${t('offices.switzerland.email')}`}
                      >
                        {t('offices.switzerland.email')}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Decorative gradient background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          </div>

          {/* Global Offices */}
          <div className="group relative isolate overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl">
            <div className="mb-8 flex items-center gap-x-4">
              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 ring-1 ring-purple-200 ring-inset">
                <BuildingOffice2Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {t('offices.title')}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {t('offices.description')}
                </p>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {offices.map((office) => {
                const officeTranslations = t.raw(`offices.${office.key}`)
                const hasEmail = 'email' in officeTranslations
                const hasHours = 'hours' in officeTranslations

                return (
                  <div
                    key={office.key}
                    className="group/card relative rounded-2xl bg-slate-50/50 p-6 ring-1 ring-slate-200/50 transition-all duration-200 hover:bg-white hover:shadow-md hover:ring-slate-300"
                  >
                    <div className="absolute top-6 right-6 text-2xl">
                      {office.flag}
                    </div>
                    <h4 className="mb-4 text-lg font-semibold text-slate-900">
                      {t(`offices.${office.key}.title`)}
                    </h4>
                    <div className="space-y-4 text-sm text-slate-600">
                      <div className="flex items-start gap-x-3">
                        <div className="relative mt-1">
                          <div className="absolute -inset-2 hidden rounded-lg bg-purple-100/50 opacity-0 transition-all duration-200 group-hover/card:block group-hover/card:opacity-100" />
                          <MapPinIcon
                            className="relative h-5 w-5 flex-shrink-0 text-purple-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {t(`offices.${office.key}.company`)}
                          </p>
                          <p>{t(`offices.${office.key}.addressLine1`)}</p>
                          <p>{t(`offices.${office.key}.addressLine2`)}</p>
                          <p>{t(`offices.${office.key}.addressLine3`)}</p>
                        </div>
                      </div>
                      {hasEmail && (
                        <div className="flex items-center gap-x-3">
                          <div className="relative">
                            <div className="absolute -inset-2 hidden rounded-lg bg-blue-100/50 opacity-0 transition-all duration-200 group-hover/card:block group-hover/card:opacity-100" />
                            <EnvelopeIcon
                              className="relative h-5 w-5 flex-shrink-0 text-blue-600"
                              aria-hidden="true"
                            />
                          </div>
                          <a
                            href={`mailto:${t(`offices.${office.key}.email`)}`}
                            className="transition-colors hover:text-blue-600"
                          >
                            {t(`offices.${office.key}.email`)}
                          </a>
                        </div>
                      )}
                      {hasHours && (
                        <div className="flex items-start gap-x-3">
                          <div className="relative mt-1">
                            <div className="absolute -inset-2 hidden rounded-lg bg-emerald-100/50 opacity-0 transition-all duration-200 group-hover/card:block group-hover/card:opacity-100" />
                            <ClockIcon
                              className="relative h-5 w-5 flex-shrink-0 text-emerald-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {t(`offices.${office.key}.hours.title`)}
                            </p>
                            <p>{t(`offices.${office.key}.hours.weekdays`)}</p>
                            {t.raw(`offices.${office.key}.hours.weekends`) && (
                              <p>{t(`offices.${office.key}.hours.weekends`)}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Decorative gradient background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        </div>
      </Container>
    </section>
  )
}
