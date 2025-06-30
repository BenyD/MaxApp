'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase'

interface SubmissionModalProps {
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
  onClose: () => void
  onStatusUpdate: (
    id: number,
    status: 'new' | 'replied' | 'archived',
  ) => Promise<void>
  onReply: (id: number, replyMessage: string) => Promise<void>
}

export function SubmissionModal({
  submission,
  onClose,
  onStatusUpdate,
  onReply,
}: SubmissionModalProps) {
  const t = useTranslations('admin.dashboard')
  const [replyMessage, setReplyMessage] = useState(
    submission.reply_message || '',
  )
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendReply = async () => {
    try {
      setIsSending(true)
      setError(null)

      await onReply(submission.id, replyMessage)
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
      await onStatusUpdate(submission.id, 'archived')
      onClose()
    } catch (err) {
      setError('Failed to archive submission. Please try again.')
      console.error('Error archiving submission:', err)
    }
  }

  return (
    <Dialog as="div" className="relative z-50" open={true} onClose={onClose}>
      <div className="bg-opacity-75 fixed inset-0 bg-zinc-500 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
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
                  className="text-lg leading-6 font-semibold text-zinc-900"
                >
                  {t('modal.title')}
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  {/* Submission Details */}
                  <div className="rounded-lg bg-zinc-50 p-4">
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-medium text-zinc-500">
                          {t('modal.submittedAt')}
                        </dt>
                        <dd className="mt-1 text-zinc-900">
                          {format(new Date(submission.created_at), 'PPpp')}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-zinc-500">
                          {t('modal.name')}
                        </dt>
                        <dd className="mt-1 text-zinc-900">
                          {submission.first_name} {submission.last_name}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-zinc-500">
                          {t('modal.email')}
                        </dt>
                        <dd className="mt-1 text-zinc-900">
                          <a
                            href={`mailto:${submission.email}`}
                            className="text-blue-600 hover:text-blue-500"
                          >
                            {submission.email}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-zinc-500">
                          {t('modal.phone')}
                        </dt>
                        <dd className="mt-1 text-zinc-900">
                          <a
                            href={`tel:${submission.phone}`}
                            className="text-blue-600 hover:text-blue-500"
                          >
                            {submission.phone}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-zinc-500">
                          {t('modal.message')}
                        </dt>
                        <dd className="mt-1 text-zinc-900">
                          {submission.message}
                        </dd>
                      </div>
                      {submission.replied_at && (
                        <div>
                          <dt className="font-medium text-zinc-500">
                            {t('modal.repliedAt')}
                          </dt>
                          <dd className="mt-1 text-zinc-900">
                            {format(new Date(submission.replied_at), 'PPpp')}
                          </dd>
                        </div>
                      )}
                      {submission.reply_message && (
                        <div>
                          <dt className="font-medium text-zinc-500">
                            {t('modal.replyMessage')}
                          </dt>
                          <dd className="mt-1 text-zinc-900">
                            {submission.reply_message}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {/* Reply Form */}
                  {submission.status !== 'archived' && (
                    <div>
                      <label
                        htmlFor="reply"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        {t('modal.reply')}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="reply"
                          name="reply"
                          rows={4}
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-zinc-300 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {error}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    {submission.status !== 'archived' && (
                      <>
                        <button
                          type="button"
                          onClick={handleSendReply}
                          disabled={isSending || !replyMessage.trim()}
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-3 sm:w-auto"
                        >
                          {isSending
                            ? t('modal.sending')
                            : t('modal.sendReply')}
                        </button>
                        <button
                          type="button"
                          onClick={handleArchive}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-300 ring-inset hover:bg-zinc-50 sm:mt-0 sm:w-auto"
                        >
                          {t('modal.archive')}
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-300 ring-inset hover:bg-zinc-50 sm:mt-0 sm:w-auto"
                    >
                      {t('modal.close')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
