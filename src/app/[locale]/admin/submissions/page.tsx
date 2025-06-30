'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { SubmissionModal } from '@/components/ui/submission-modal'

// Icons
function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function TotalIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  )
}

function TodayIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

function WeekIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  )
}

function MonthIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

interface ContactSubmission {
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

interface Stats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
}

export default function SubmissionsPage() {
  const t = useTranslations('admin.dashboard')
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ContactSubmission
    direction: 'asc' | 'desc'
  }>({ key: 'created_at', direction: 'desc' })
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const supabase = createClient()

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Check authentication first
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession()

      if (authError) {
        console.error('Auth error:', authError)
        throw new Error('Authentication error')
      }

      if (!session) {
        throw new Error('Not authenticated')
      }

      // Build the base query for counting
      let countQuery = supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })

      // Apply search filter if there's a search query
      if (searchQuery) {
        countQuery = countQuery.or(
          `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,message.ilike.%${searchQuery}%`,
        )
      }

      // Get total count
      const { count, error: countError } = await countQuery

      if (countError) {
        console.error('Count error:', countError)
        throw countError
      }

      console.log('Total count:', count)
      setTotalCount(count || 0)

      // Build the query for fetching data
      let dataQuery = supabase.from('contact_submissions').select()

      // Apply search filter if there's a search query
      if (searchQuery) {
        dataQuery = dataQuery.or(
          `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,message.ilike.%${searchQuery}%`,
        )
      }

      // Fetch paginated data
      const { data, error: fetchError } = await dataQuery
        .order(sortConfig.key, {
          ascending: sortConfig.direction === 'asc',
        })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)

      if (fetchError) {
        console.error('Fetch error:', fetchError)
        throw fetchError
      }

      console.log('Fetched submissions:', data)
      setSubmissions(data || [])
    } catch (err) {
      console.error('Error in fetchSubmissions:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to fetch submissions',
      )
      // If not authenticated, redirect to login
      if (err instanceof Error && err.message === 'Not authenticated') {
        window.location.href = '/admin/login'
      }
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery, sortConfig, supabase, itemsPerPage])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  // Sort submissions
  const sortedSubmissions = [...submissions].sort((a, b) => {
    const aValue = a[sortConfig.key] ?? ''
    const bValue = b[sortConfig.key] ?? ''

    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    }
  })

  // Calculate stats
  const stats: Stats = {
    total: totalCount,
    today: submissions.filter(
      (s) =>
        new Date(s.created_at).toDateString() === new Date().toDateString(),
    ).length,
    thisWeek: submissions.filter((s) => {
      const date = new Date(s.created_at)
      const today = new Date()
      const weekStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay(),
      )
      return date >= weekStart
    }).length,
    thisMonth: submissions.filter(
      (s) =>
        new Date(s.created_at).getMonth() === new Date().getMonth() &&
        new Date(s.created_at).getFullYear() === new Date().getFullYear(),
    ).length,
  }

  const handleSort = (key: keyof ContactSubmission) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }))
  }

  // Update submission status
  const handleStatusUpdate = async (
    id: number,
    status: 'new' | 'replied' | 'archived',
  ) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      // Refresh submissions after update
      fetchSubmissions()
    } catch (err) {
      console.error('Error updating submission status:', err)
      setError('Failed to update submission status')
    }
  }

  // Handle reply to submission
  const handleReply = async (id: number, replyMessage: string) => {
    try {
      console.log('Sending reply for submission:', { id, replyMessage })

      // First verify the submission exists in our local state
      const submission = submissions.find((sub) => sub.id === id)
      if (!submission) {
        console.error('Submission not found in local state:', id)
        throw new Error('Submission not found')
      }

      const response = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: id,
          replyMessage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Reply error response:', errorData)
        throw new Error(errorData.error || 'Failed to send reply')
      }

      // Update the submission status locally
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id
            ? {
                ...sub,
                status: 'replied',
                reply_message: replyMessage,
                replied_at: new Date().toISOString(),
              }
            : sub,
        ),
      )
    } catch (err) {
      console.error('Error sending reply:', err)
      throw err
    }
  }

  // Handle delete submission
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh submissions after delete
      fetchSubmissions()
    } catch (err) {
      console.error('Error deleting submission:', err)
      throw new Error('Failed to delete submission')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <TotalIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">
                {t('stats.total')}
              </p>
              <p className="text-2xl font-semibold text-zinc-900">
                {stats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <TodayIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">
                {t('stats.today')}
              </p>
              <p className="text-2xl font-semibold text-zinc-900">
                {stats.today}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <WeekIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">
                {t('stats.thisWeek')}
              </p>
              <p className="text-2xl font-semibold text-zinc-900">
                {stats.thisWeek}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <MonthIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">
                {t('stats.thisMonth')}
              </p>
              <p className="text-2xl font-semibold text-zinc-900">
                {stats.thisMonth}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('search.placeholder')}
            className="block w-full rounded-lg border-0 py-2 pr-3 pl-10 text-zinc-900 shadow-sm ring-1 ring-zinc-300 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                {t('table.name')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                {t('table.email')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                {t('table.phone')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                {t('table.date')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                {t('table.status')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                {t('table.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {sortedSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900">
                  {`${submission.first_name} ${submission.last_name}`}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900">
                  {submission.email}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900">
                  {submission.phone}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500">
                  {format(new Date(submission.created_at), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
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
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    {t('actions.view')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            {t('pagination.previous')}
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            {t('pagination.next')}
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-zinc-700">
              {t('pagination.showing', {
                start: (currentPage - 1) * itemsPerPage + 1,
                end: Math.min(currentPage * itemsPerPage, totalCount),
                total: totalCount,
              })}
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-zinc-400 ring-1 ring-zinc-300 ring-inset hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">{t('pagination.previous')}</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-zinc-400 ring-1 ring-zinc-300 ring-inset hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">{t('pagination.next')}</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onStatusUpdate={handleStatusUpdate}
          onReply={handleReply}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
