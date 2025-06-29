'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇨🇭' },
]

interface LanguageSwitcherProps {
  variant?: 'default' | 'mobile'
}

export function LanguageSwitcher({
  variant = 'default',
}: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const currentLanguage = languages.find((l) => l.code === locale)

  const handleLanguageChange = (languageCode: string) => {
    router.replace(pathname, { locale: languageCode })
  }

  if (variant === 'mobile') {
    return (
      <div className="px-1 py-2">
        <div className="mb-2 px-2 text-sm font-medium text-slate-500">
          Select Language
        </div>
        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={clsx(
                'flex w-full items-center gap-x-3 rounded-md px-2 py-2 text-base transition-colors duration-200',
                language.code === locale
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50',
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md shadow-sm ring-1 ring-slate-200">
                {language.flag}
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span>
                  <span className="font-medium">{language.nativeName}</span>
                  <span className="ml-1.5 text-sm text-slate-400">
                    ({language.code.toUpperCase()})
                  </span>
                </span>
                {language.code === locale && (
                  <span className="text-blue-600" aria-hidden="true">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={clsx(
              'group inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 transition-all duration-200 ease-in-out ring-inset',
              open
                ? 'ring-2 ring-blue-600'
                : 'ring-slate-200 hover:bg-slate-50 hover:ring-slate-300',
            )}
            aria-label="Select language"
          >
            <GlobeAltIcon
              className={clsx(
                '-ml-0.5 h-5 w-5 transition-colors duration-200',
                open
                  ? 'text-blue-600'
                  : 'text-slate-400 group-hover:text-slate-500',
              )}
              aria-hidden="true"
            />
            <span
              className="flex items-center gap-x-1.5"
              title={`Current language: ${currentLanguage?.name}`}
            >
              <span className="transition-transform duration-200 hover:scale-110">
                {currentLanguage?.flag}
              </span>
              <span className="hidden font-medium sm:inline">
                {currentLanguage?.nativeName}
              </span>
              <span className="hidden text-sm text-slate-400 sm:inline">
                ({currentLanguage?.code.toUpperCase()})
              </span>
            </span>
            <ChevronDownIcon
              className={clsx(
                '-mr-1 h-5 w-5 transition-all duration-200',
                open
                  ? 'rotate-180 text-blue-600'
                  : 'text-slate-400 group-hover:text-slate-500',
              )}
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-slate-200 focus:outline-none sm:right-0 sm:left-auto">
              <div className="p-1" role="menu">
                {languages.map((language) => (
                  <Menu.Item key={language.code}>
                    {({ active }) => (
                      <button
                        onClick={() => handleLanguageChange(language.code)}
                        className={clsx(
                          'flex w-full items-center gap-x-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200',
                          active
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-700 hover:bg-slate-50',
                          language.code === locale && 'bg-slate-50',
                        )}
                        role="menuitem"
                        title={`Switch to ${language.name}`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-transform duration-200 hover:scale-110">
                          {language.flag}
                        </span>
                        <span className="flex flex-1 items-center justify-between">
                          <span>
                            <span className="font-medium">
                              {language.nativeName}
                            </span>
                            <span className="ml-1.5 text-sm text-slate-400">
                              ({language.code.toUpperCase()})
                            </span>
                          </span>
                          {language.code === locale && (
                            <span
                              className="ml-4 shrink-0 text-blue-600"
                              aria-hidden="true"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
