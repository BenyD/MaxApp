'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
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
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (
    id: number,
    status: 'new' | 'replied' | 'archived',
  ) => Promise<void>
  onReply: (id: number, replyMessage: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export function SubmissionModal({
  submission,
  isOpen,
  onClose,
  onStatusUpdate,
  onReply,
  onDelete,
}: SubmissionModalProps) {
  const t = useTranslations('admin.dashboard')
  const [replyMessage, setReplyMessage] = useState(
    submission.reply_message || '',
  )
  const [isSending, setIsSending] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSendReply = async () => {
    try {
      setIsSending(true)
      setError(null)

      console.log('Attempting to send reply:', {
        submissionId: submission.id,
        replyMessage,
      })

      if (!submission.id) {
        throw new Error('Missing submission ID')
      }

      await onReply(submission.id, replyMessage)
      onClose()
    } catch (err) {
      console.error('Error in handleSendReply:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send reply. Please try again.',
      )
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

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)
      await onDelete(submission.id)
      onClose()
    } catch (err) {
      setError('Failed to delete submission. Please try again.')
      console.error('Error deleting submission:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="relative z-50"
          onClose={onClose}
          open={isOpen}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-zinc-500/75"
          />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="pointer-events-auto w-screen max-w-2xl"
                >
                  <Dialog.Panel className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4"
                    >
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold text-zinc-900">
                          {t('modal.title')}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md text-zinc-400 hover:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                          onClick={onClose}
                        >
                          <span className="sr-only">{t('modal.close')}</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      {/* Status Badge */}
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            submission.status === 'new'
                              ? 'bg-blue-100 text-blue-800'
                              : submission.status === 'replied'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-zinc-100 text-zinc-800'
                          }`}
                        >
                          {t(`status.${submission.status}`)}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="flex-1 overflow-y-auto px-6 py-6"
                    >
                      <div className="space-y-8">
                        {/* Contact Information */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-medium text-zinc-900">
                            Contact Information
                          </h3>
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <dt className="text-sm font-medium text-zinc-500">
                                {t('modal.name')}
                              </dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {submission.first_name} {submission.last_name}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-zinc-500">
                                {t('modal.email')}
                              </dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                <a
                                  href={`mailto:${submission.email}`}
                                  className="text-blue-600 hover:text-blue-500"
                                >
                                  {submission.email}
                                </a>
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-zinc-500">
                                {t('modal.phone')}
                              </dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                <a
                                  href={`tel:${submission.phone}`}
                                  className="text-blue-600 hover:text-blue-500"
                                >
                                  {submission.phone}
                                </a>
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-zinc-500">
                                {t('modal.date')}
                              </dt>
                              <dd className="mt-1 text-sm text-zinc-900">
                                {format(
                                  new Date(submission.created_at),
                                  'PPpp',
                                )}
                              </dd>
                            </div>
                          </div>
                        </motion.div>

                        {/* Message */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-medium text-zinc-900">
                            {t('modal.message')}
                          </h3>
                          <div className="rounded-lg bg-zinc-50 p-4">
                            <p className="text-sm whitespace-pre-wrap text-zinc-900">
                              {submission.message}
                            </p>
                          </div>
                        </motion.div>

                        {/* Reply Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                          className="space-y-4"
                        >
                          <h3 className="text-lg font-medium text-zinc-900">
                            {t('modal.reply')}
                          </h3>
                          <div className="space-y-4">
                            <textarea
                              rows={6}
                              className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              placeholder={t('modal.replyPlaceholder')}
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                            />
                            {error && (
                              <p className="text-sm text-red-600">{error}</p>
                            )}
                            <div className="flex justify-end space-x-3">
                              <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                onClick={() => setShowDeleteConfirm(true)}
                              >
                                {t('modal.delete')}
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                onClick={handleArchive}
                              >
                                {t('modal.archive')}
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                onClick={handleSendReply}
                                disabled={isSending || !replyMessage.trim()}
                              >
                                {isSending
                                  ? t('modal.sending')
                                  : t('modal.send')}
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        {/* Previous Reply */}
                        {submission.reply_message && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.3 }}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-medium text-zinc-900">
                              {t('modal.previousReply')}
                            </h3>
                            <div className="rounded-lg bg-zinc-50 p-4">
                              <p className="text-sm whitespace-pre-wrap text-zinc-900">
                                {submission.reply_message}
                              </p>
                              {submission.replied_at && (
                                <p className="mt-2 text-xs text-zinc-500">
                                  {t('modal.repliedAt')}{' '}
                                  {format(
                                    new Date(submission.replied_at),
                                    'PPpp',
                                  )}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </Dialog.Panel>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Dialog */}
          <Transition show={showDeleteConfirm} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setShowDeleteConfirm(false)}
            >
              <div className="fixed inset-0 bg-black/30" />
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-zinc-900"
                    >
                      {t('modal.deleteConfirmTitle')}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-zinc-500">
                        {t('modal.deleteConfirmMessage')}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        {t('modal.cancel')}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                        onClick={handleDelete}
                        disabled={isDeleting}
                      >
                        {isDeleting
                          ? t('modal.deleting')
                          : t('modal.confirmDelete')}
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
