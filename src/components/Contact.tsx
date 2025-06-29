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
} from '@heroicons/react/24/outline'
import Image from 'next/image'

type Office = {
  key: 'switzerland' | 'india' | 'srilanka'
  image: string
}

const offices: Office[] = [
  {
    key: 'switzerland',
    image: '/images/offices/switzerland.jpg',
  },
  {
    key: 'india',
    image: '/images/offices/india.jpg',
  },
  {
    key: 'srilanka',
    image: '/images/offices/srilanka.jpg',
  },
]

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
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
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-900"
        >
          {label}
        </label>
      </div>
      <div className="relative mt-2">
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 transition duration-200 ring-inset ${
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
            className={`block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 transition duration-200 ring-inset ${
              error
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-slate-200 focus:ring-blue-500'
            } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
        )}
        {error && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
            <XCircleIcon className="h-4 w-4 flex-shrink-0" />
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
    phone: '',
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

    if (!formData.phone.trim()) {
      newErrors.phone = t('form.phone.error.required')
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = t('form.phone.error.invalid')
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

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32" id="contact">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            {t('title')}
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormInput
                    id="firstName"
                    label={t('form.firstName.label')}
                    icon={UserIcon}
                    placeholder={t('form.firstName.placeholder')}
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(value) =>
                      setFormData({ ...formData, firstName: value })
                    }
                    error={errors.firstName}
                  />
                  <FormInput
                    id="lastName"
                    label={t('form.lastName.label')}
                    icon={UserIcon}
                    placeholder={t('form.lastName.placeholder')}
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(value) =>
                      setFormData({ ...formData, lastName: value })
                    }
                    error={errors.lastName}
                  />
                </div>

                <FormInput
                  id="email"
                  label={t('form.email.label')}
                  type="email"
                  icon={EnvelopeIcon}
                  placeholder={t('form.email.placeholder')}
                  autoComplete="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                  error={errors.email}
                />

                <FormInput
                  id="phone"
                  label={t('form.phone.label')}
                  type="tel"
                  icon={PhoneIcon}
                  placeholder={t('form.phone.placeholder')}
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData({ ...formData, phone: value })
                  }
                  error={errors.phone}
                />

                <FormInput
                  id="message"
                  label={t('form.message.label')}
                  type="textarea"
                  icon={ChatBubbleBottomCenterTextIcon}
                  placeholder={t('form.message.placeholder')}
                  value={formData.message}
                  onChange={(value) =>
                    setFormData({ ...formData, message: value })
                  }
                  error={errors.message}
                />

                <div>
                  <Button
                    type="submit"
                    variant="solid"
                    color="blue"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>{t('form.submit.sending')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <PaperAirplaneIcon className="h-4 w-4" />
                        <span>{t('form.submit.button')}</span>
                      </div>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircleIcon className="h-4 w-4" />
                      {t('form.submit.success')}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-red-600">
                      <XCircleIcon className="h-4 w-4" />
                      {t('form.submit.error')}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t('offices.title')}
              </h3>
              <div className="mt-6 space-y-8">
                {offices.map((office) => (
                  <div
                    key={office.key}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200"
                  >
                    <div className="aspect-[4/3]">
                      <Image
                        src={office.image}
                        alt={t(`offices.${office.key}.city`)}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-slate-900">
                        {t(`offices.${office.key}.city`)},{' '}
                        {t(`offices.${office.key}.country`)}
                      </h4>
                      <div className="mt-4 space-y-3 text-sm text-slate-600">
                        <div className="flex items-start gap-3">
                          <MapPinIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                          <div>
                            <p>{t(`offices.${office.key}.address`)}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {t(`offices.${office.key}.coordinates`)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <PhoneIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                          <p>{t(`offices.${office.key}.phone`)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                          <p>{t(`offices.${office.key}.email`)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <GlobeAltIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                          <p>{t(`offices.${office.key}.timezone`)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <ClockIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                          <p>{t(`offices.${office.key}.hours`)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
