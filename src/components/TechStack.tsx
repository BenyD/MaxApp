'use client'

import { Container } from '@/components/Container'
import Image from 'next/image'
import {
  TechStack as TechStackType,
  techStacks,
  colors,
} from '@/data/tech-stack'

function TechStackCard({ stack }: { stack: TechStackType }) {
  return (
    <div
      className={`group relative isolate overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl ${colors[stack.color].shadow}`}
    >
      <div className="relative z-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-xl ${colors[stack.color].light} p-2.5 ${colors[stack.color].text} ring-1 ring-inset ${colors[stack.color].border}`}
            >
              <stack.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              {stack.category}
            </h3>
          </div>
          <p className="text-base leading-7 text-slate-600 sm:max-w-sm sm:text-right">
            {stack.description}
          </p>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {stack.technologies.map((tech) => (
              <div
                key={tech.name}
                className={`group/tech relative flex flex-col items-center rounded-2xl border p-4 transition-all duration-200 ${colors[stack.color].tech.bg} ${colors[stack.color].tech.border} ${colors[stack.color].tech.hover} ${colors[stack.color].tech.shadow}`}
              >
                <div className="relative mb-3 h-12 w-12 transition-transform duration-200 group-hover/tech:scale-110">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-900">
                    {tech.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{tech.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </div>
  )
}

export function TechStack() {
  return (
    <div className="relative bg-white py-24 sm:py-32" id="tech-stack">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            Our Tech Stack
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Technologies We Master
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We leverage the latest and most powerful technologies to build
            robust, scalable, and efficient solutions for our clients.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl space-y-8">
          {techStacks.map((stack) => (
            <TechStackCard key={stack.category} stack={stack} />
          ))}
        </div>
      </Container>
    </div>
  )
}
