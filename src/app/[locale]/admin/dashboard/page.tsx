'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase'
import { format } from 'date-fns'
import Link from 'next/link'

// Icons
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

interface Submission {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
  status: 'new' | 'replied' | 'archived'
}

interface Stats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
}

export default function DashboardPage() {
  const t = useTranslations('admin.dashboard')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent submissions (last 5)
        const { data: recentSubmissions, error: submissionsError } =
          await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)

        if (submissionsError) throw submissionsError

        if (recentSubmissions) {
          setSubmissions(recentSubmissions)
        }

        // Calculate stats
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

        // Get total count
        const { count: totalCount, error: totalError } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })

        if (totalError) throw totalError

        // Get today's count
        const { count: todayCount, error: todayError } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString())

        if (todayError) throw todayError

        // Get this week's count
        const { count: weekCount, error: weekError } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekStart.toISOString())

        if (weekError) throw weekError

        // Get this month's count
        const { count: monthCount, error: monthError } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthStart.toISOString())

        if (monthError) throw monthError

        setStats({
          total: totalCount || 0,
          today: todayCount || 0,
          thisWeek: weekCount || 0,
          thisMonth: monthCount || 0,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
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

      {/* Recent Submissions */}
      <div>
        <h2 className="mb-6 text-lg font-semibold text-zinc-900">
          {t('recent.title')}
        </h2>
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
                  {t('table.date')}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-900">
                  {t('table.status')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900">
                    {`${submission.first_name} ${submission.last_name}`}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900">
                    {submission.email}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
