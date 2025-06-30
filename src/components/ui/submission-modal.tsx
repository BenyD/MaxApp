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
                                {t('modal.submittedAt')}
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

                        {/* Previous Reply */}
                        {submission.reply_message && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-zinc-900">
                                {t('modal.replyMessage')}
                              </h3>
                              <span className="text-sm text-zinc-500">
                                {submission.replied_at &&
                                  format(
                                    new Date(submission.replied_at),
                                    'PPpp',
                                  )}
                              </span>
                            </div>
                            <div className="rounded-lg bg-zinc-50 p-4">
                              <p className="text-sm whitespace-pre-wrap text-zinc-900">
                                {submission.reply_message}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Reply Form */}
                        {submission.status !== 'archived' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.3 }}
                            className="space-y-4"
                          >
                            <h3 className="text-lg font-medium text-zinc-900">
                              {t('modal.reply')}
                            </h3>
                            <div>
                              <textarea
                                id="reply"
                                name="reply"
                                rows={6}
                                value={replyMessage}
                                onChange={(e) =>
                                  setReplyMessage(e.target.value)
                                }
                                className="block w-full rounded-lg border-0 py-2 text-zinc-900 shadow-sm ring-1 ring-zinc-300 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                              />
                            </div>
                          </motion.div>
                        )}

                        {error && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="rounded-md bg-red-50 p-4"
                          >
                            <div className="flex">
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                  {error}
                                </h3>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                      className="sticky bottom-0 z-10 border-t border-zinc-200 bg-white px-6 py-4"
                    >
                      <div className="flex flex-col gap-3">
                        {submission.status !== 'archived' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              type="button"
                              onClick={handleSendReply}
                              disabled={isSending || !replyMessage.trim()}
                              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isSending
                                ? t('modal.sending')
                                : t('modal.sendReply')}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              type="button"
                              onClick={handleArchive}
                              className="inline-flex w-full justify-center rounded-md bg-zinc-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                            >
                              {t('modal.archive')}
                            </motion.button>
                          </>
                        )}
                        {!showDeleteConfirm ? (
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            {t('modal.delete')}
                          </motion.button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="space-y-3"
                          >
                            <p className="text-sm text-zinc-600">
                              {t('modal.deleteConfirmation')}
                            </p>
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isDeleting
                                  ? t('modal.deleting')
                                  : t('modal.confirmDelete')}
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 rounded-md bg-zinc-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                              >
                                {t('modal.cancel')}
                              </motion.button>
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
        </Dialog>
      )}
    </AnimatePresence>
  )
}
