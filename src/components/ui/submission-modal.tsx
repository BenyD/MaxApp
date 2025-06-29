'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase'

interface SubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  submission: {
    id: number
    created_at: string
    first_name: string
    last_name: string
    email: string
    phone: string
    message: string
    status: 'new' | 'replied' | 'archived'
    replied_at?: string
    reply_message?: string
  }
  onSubmissionUpdated: () => void
}

export function SubmissionModal({
  isOpen,
  onClose,
  submission,
  onSubmissionUpdated,
}: SubmissionModalProps) {
  const t = useTranslations('admin.dashboard')
  const [replyMessage, setReplyMessage] = useState(
    submission.reply_message || '',
  )
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSendReply = async () => {
    try {
      setIsSending(true)
      setError(null)

      const { error } = await supabase
        .from('contact_submissions')
        .update({
          status: 'replied',
          replied_at: new Date().toISOString(),
          reply_message: replyMessage,
        })
        .eq('id', submission.id)

      if (error) throw error

      // Send email (you'll need to implement this)
      // await sendEmail({
      //   to: submission.email,
      //   subject: 'Re: Your Contact Form Submission',
      //   message: replyMessage,
      // })

      onSubmissionUpdated()
      onClose()
    } catch (err) {
      setError('Failed to send reply. Please try again.')
      console.error('Error sending reply:', err)
    } finally {
      setIsSending(false)
    }
  }

  const handleArchive = async () => {
    try {
      setError(null)
      const { error } = await supabase
        .from('contact_submissions')
        .update({
          status: 'archived',
        })
        .eq('id', submission.id)

      if (error) throw error

      onSubmissionUpdated()
      onClose()
    } catch (err) {
      setError('Failed to archive submission. Please try again.')
      console.error('Error archiving submission:', err)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(t('modal.deleteConfirmation'))) return

    try {
      setError(null)
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', submission.id)

      if (error) throw error

      onSubmissionUpdated()
      onClose()
    } catch (err) {
      setError('Failed to delete submission. Please try again.')
      console.error('Error deleting submission:', err)
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">{t('modal.close')}</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-left sm:mt-0">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-semibold text-gray-900"
                    >
                      {t('modal.title')}
                    </Dialog.Title>

                    <div className="mt-4 space-y-4">
                      {/* Submission Details */}
                      <div className="rounded-lg bg-gray-50 p-4">
                        <dl className="space-y-3 text-sm">
                          <div>
                            <dt className="font-medium text-gray-500">
                              {t('modal.submittedAt')}
                            </dt>
                            <dd className="mt-1 text-gray-900">
                              {format(new Date(submission.created_at), 'PPpp')}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-500">
                              {t('modal.name')}
                            </dt>
                            <dd className="mt-1 text-gray-900">
                              {submission.first_name} {submission.last_name}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-500">
                              {t('modal.email')}
                            </dt>
                            <dd className="mt-1 text-gray-900">
                              <a
                                href={`mailto:${submission.email}`}
                                className="text-blue-600 hover:text-blue-500"
                              >
                                {submission.email}
                              </a>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-500">
                              {t('modal.phone')}
                            </dt>
                            <dd className="mt-1 text-gray-900">
                              <a
                                href={`tel:${submission.phone}`}
                                className="text-blue-600 hover:text-blue-500"
                              >
                                {submission.phone}
                              </a>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-500">
                              {t('modal.message')}
                            </dt>
                            <dd className="mt-1 whitespace-pre-wrap text-gray-900">
                              {submission.message}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Reply Section */}
                      <div className="space-y-4">
                        <label
                          htmlFor="reply"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {t('modal.reply')}
                        </label>
                        <textarea
                          id="reply"
                          rows={4}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder={t('modal.replyPlaceholder')}
                        />
                      </div>

                      {error && (
                        <div className="rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <XMarkIcon
                                className="h-5 w-5 text-red-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">
                                {error}
                              </h3>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-between gap-3 sm:mt-4">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                      onClick={handleDelete}
                    >
                      {t('modal.delete')}
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                      onClick={handleArchive}
                    >
                      {t('modal.archive')}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                      onClick={handleSendReply}
                      disabled={isSending || !replyMessage.trim()}
                    >
                      {isSending ? t('modal.sending') : t('modal.sendReply')}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
