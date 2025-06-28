'use client'

import { useState, FormEvent } from 'react'
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

const offices = [
  {
    city: 'Rotkreuz',
    country: 'Switzerland',
    address: 'Grundstrasse 12, 6343 Rotkreuz',
    phone: '+41 79 123 45 67',
    email: 'switzerland@maxapp.ch',
    image: '/images/offices/switzerland.jpg',
    timezone: 'CET (UTC+1)',
    coordinates: '47.1435° N, 8.4351° E',
    hours: '9:00 AM - 6:00 PM CET',
  },
  {
    city: 'Chennai',
    country: 'India',
    address: 'Anna Nagar, Chennai, Tamil Nadu 600040',
    phone: '+91 44 1234 5678',
    email: 'india@maxapp.ch',
    image: '/images/offices/india.jpg',
    timezone: 'IST (UTC+5:30)',
    coordinates: '13.0827° N, 80.2707° E',
    hours: '9:30 AM - 6:30 PM IST',
  },
  {
    city: 'Colombo',
    country: 'Sri Lanka',
    address: 'World Trade Center, Colombo 01',
    phone: '+94 11 1234 567',
    email: 'srilanka@maxapp.ch',
    image: '/images/offices/srilanka.jpg',
    timezone: 'SLST (UTC+5:30)',
    coordinates: '6.9271° N, 79.8612° E',
    hours: '9:00 AM - 6:00 PM SLST',
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
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
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
        throw new Error('Failed to submit form')
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
      setSubmitStatus('success')
    } catch (error) {
      console.error('Error submitting form:', error)
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
            Contact Us
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Get in Touch
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg">
            Have a project in mind? Let&apos;s discuss how we can help you
            achieve your goals with our Swiss-quality software solutions.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:shadow-xl sm:rounded-3xl sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50/50"></div>
              <div className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormInput
                      id="firstName"
                      label="First Name"
                      icon={UserIcon}
                      placeholder="John"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(value) =>
                        setFormData({ ...formData, firstName: value })
                      }
                      error={errors.firstName}
                    />
                    <FormInput
                      id="lastName"
                      label="Last Name"
                      icon={UserIcon}
                      placeholder="Doe"
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
                    label="Email"
                    type="email"
                    icon={EnvelopeIcon}
                    placeholder="john@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(value) =>
                      setFormData({ ...formData, email: value })
                    }
                    error={errors.email}
                  />

                  <FormInput
                    id="phone"
                    label="Phone"
                    type="tel"
                    icon={PhoneIcon}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(value) =>
                      setFormData({ ...formData, phone: value })
                    }
                    error={errors.phone}
                  />

                  <FormInput
                    id="message"
                    label="Message"
                    type="textarea"
                    icon={ChatBubbleBottomCenterTextIcon}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(value) =>
                      setFormData({ ...formData, message: value })
                    }
                    error={errors.message}
                  />

                  <div>
                    <Button
                      type="submit"
                      color="blue"
                      className="group relative w-full overflow-hidden transition duration-300 hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      <div className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <PaperAirplaneIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            <span>Send Message</span>
                          </>
                        )}
                      </div>
                    </Button>

                    {submitStatus === 'success' && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600">
                        <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
                        Thank you! We&apos;ll get back to you soon.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        <XCircleIcon className="h-5 w-5 flex-shrink-0" />
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Office Locations */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row lg:flex-row">
                    <div className="relative w-full sm:w-2/5 lg:w-1/3">
                      <div className="relative h-48 sm:h-full">
                        <Image
                          src={office.image}
                          alt={`${office.city} Office`}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-blue-100">
                              {office.country}
                            </p>
                            <h3 className="text-xl font-semibold text-white">
                              {office.city}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 p-4 sm:p-5">
                      <dl className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-start gap-x-3">
                          <dt className="mt-0.5">
                            <MapPinIcon
                              className="h-5 w-5 text-blue-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd className="text-slate-700">{office.address}</dd>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <dt>
                            <PhoneIcon
                              className="h-5 w-5 text-blue-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd>
                            <a
                              href={`tel:${office.phone}`}
                              className="text-slate-700 transition hover:text-blue-600"
                            >
                              {office.phone}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <dt>
                            <EnvelopeIcon
                              className="h-5 w-5 text-blue-500"
                              aria-hidden="true"
                            />
                          </dt>
                          <dd>
                            <a
                              href={`mailto:${office.email}`}
                              className="text-slate-700 transition hover:text-blue-600"
                            >
                              {office.email}
                            </a>
                          </dd>
                        </div>
                      </dl>
                      <div className="border-t border-slate-100 pt-4">
                        <dl className="grid grid-cols-1 gap-3 text-sm">
                          <div className="flex items-center gap-x-3">
                            <dt>
                              <ClockIcon
                                className="h-5 w-5 text-blue-500"
                                aria-hidden="true"
                              />
                            </dt>
                            <dd className="text-slate-600">{office.hours}</dd>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <dt>
                              <GlobeAltIcon
                                className="h-5 w-5 text-blue-500"
                                aria-hidden="true"
                              />
                            </dt>
                            <dd className="text-slate-600">
                              {office.timezone}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
