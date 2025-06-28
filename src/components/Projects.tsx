import { Container } from '@/components/Container'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Project, projects, colors } from '@/data/projects'
import Image from 'next/image'

function ProjectCard({
  project,
  isReversed,
}: {
  project: Project
  isReversed: boolean
}) {
  return (
    <article
      className={`group relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl sm:flex-row sm:gap-8 sm:rounded-3xl sm:p-8 ${
        isReversed ? 'sm:flex-row-reverse' : ''
      } ${colors[project.color].shadow}`}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`rounded-full ${colors[project.color].light} px-2.5 py-1 text-xs font-medium sm:px-3 sm:text-sm ${colors[project.color].text} border ${colors[project.color].border}`}
          >
            {project.category}
          </div>
        </div>
        <div className="group/title relative">
          <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover/title:text-blue-600 sm:text-2xl">
            <a href={project.link} className="flex items-center gap-x-2">
              <span>{project.name}</span>
              <ArrowTopRightOnSquareIcon className="h-4 w-4 opacity-0 transition group-hover/title:opacity-100 sm:h-5 sm:w-5" />
            </a>
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
            {project.description}
          </p>
        </div>
        <div className="mt-4 sm:mt-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`inline-flex items-center rounded-full ${colors[project.color].tag.bg} px-3 py-1 text-xs font-medium sm:px-4 sm:py-1.5 sm:text-sm ${colors[project.color].tag.text} ring-1 ring-inset ${colors[project.color].tag.ring}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl sm:aspect-[4/3] sm:w-1/2 sm:rounded-2xl">
        <Image
          src={project.image}
          alt={project.name}
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </article>
  )
}

export function Projects() {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32" id="projects">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            Our Portfolio
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Projects We&apos;ve Delivered
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg">
            Explore some of our successful projects where we&apos;ve helped
            businesses transform their operations with innovative software
            solutions.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl space-y-8 px-4 sm:mt-16 sm:space-y-12 sm:px-6 lg:px-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
