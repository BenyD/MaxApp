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
          className="block text-sm leading-6 font-semibold text-slate-900"
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
            className={`block w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ${
              error
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-slate-300 focus:ring-blue-600'
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
            className={`block w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ${
              error
                ? 'ring-red-300 focus:ring-red-500'
                : 'ring-slate-300 focus:ring-blue-600'
            } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
        )}
        {error && (
          <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
            <XCircleIcon className="h-4 w-4" />
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
      // Here you would typically send the data to your backend
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

      // Clear form on success
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
    <div className="relative bg-white py-24 sm:py-32" id="contact">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            Contact Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Get in Touch
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have a project in mind? We&apos;d love to discuss how we can help
            bring your ideas to life.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="relative">
              <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormInput
                        id="first-name"
                        label="First name"
                        icon={UserIcon}
                        placeholder="John"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={(value) =>
                          setFormData((prev) => ({ ...prev, firstName: value }))
                        }
                        error={errors.firstName}
                      />
                      <FormInput
                        id="last-name"
                        label="Last name"
                        icon={UserIcon}
                        placeholder="Doe"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={(value) =>
                          setFormData((prev) => ({ ...prev, lastName: value }))
                        }
                        error={errors.lastName}
                      />
                    </div>
                    <FormInput
                      id="email"
                      label="Email"
                      type="email"
                      icon={EnvelopeIcon}
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, email: value }))
                      }
                      error={errors.email}
                    />
                    <FormInput
                      id="phone"
                      label="Phone number"
                      type="tel"
                      icon={PhoneIcon}
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, phone: value }))
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
                        setFormData((prev) => ({ ...prev, message: value }))
                      }
                      error={errors.message}
                    />
                  </div>

                  {submitStatus && (
                    <div
                      className={`flex items-center gap-2 rounded-md p-4 ${
                        submitStatus === 'success'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <>
                          <CheckCircleIcon className="h-5 w-5" />
                          <span>
                            Thank you! We&apos;ll get back to you soon.
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-5 w-5" />
                          <span>
                            Sorry, something went wrong. Please try again later.
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  <div>
                    <Button
                      type="submit"
                      className="group w-full bg-blue-600 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Send message'}
                        <PaperAirplaneIcon
                          className={`h-4 w-4 transition-transform ${
                            isSubmitting ? '' : 'group-hover:translate-x-1'
                          }`}
                        />
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
              {/* Decorative gradient background */}
              <div className="absolute -top-4 -right-4 -z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] rounded-[2rem] bg-gradient-to-b from-blue-50 to-white"></div>
            </div>

            {/* Office Locations */}
            <div>
              <div className="sticky top-8">
                <div className="flex items-center gap-2">
                  <GlobeAltIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg leading-8 font-semibold text-slate-900">
                    Our Global Offices
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  With offices across Europe and Asia, we provide
                  round-the-clock service and local expertise.
                </p>
                <div className="mt-8 space-y-6">
                  {offices.map((office) => (
                    <div
                      key={office.city}
                      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="flex gap-6">
                        <div className="relative h-24 w-24 flex-none overflow-hidden rounded-xl">
                          <Image
                            src={office.image}
                            alt={`${office.city} office`}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-auto">
                          <h4 className="font-semibold text-slate-900">
                            {office.city}, {office.country}
                          </h4>
                          <div className="mt-3 space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPinIcon className="h-4 w-4 shrink-0 text-slate-400" />
                              {office.address}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <ClockIcon className="h-4 w-4 shrink-0 text-slate-400" />
                              {office.hours}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                              <PhoneIcon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-500" />
                              <a href={`tel:${office.phone}`}>{office.phone}</a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                              <EnvelopeIcon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-500" />
                              <a href={`mailto:${office.email}`}>
                                {office.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Decorative gradient background */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
