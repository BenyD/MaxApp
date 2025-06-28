import { Container } from '@/components/Container'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { Project, projects, colors } from '@/data/projects'

function ProjectCard({
  project,
  isReversed,
}: {
  project: Project
  isReversed: boolean
}) {
  return (
    <article
      className={`group relative isolate flex flex-col-reverse gap-8 overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:shadow-xl ${colors[project.color].shadow} lg:flex-row ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div className="flex-1 pt-6 lg:pt-0">
        <div className="flex items-center gap-x-4">
          <div
            className={`rounded-full ${colors[project.color].light} px-3 py-1 text-sm font-medium ${colors[project.color].text} border ${colors[project.color].border}`}
          >
            {project.category}
          </div>
        </div>
        <div className="group/title relative">
          <h3 className="mt-3 text-2xl font-semibold text-slate-900 group-hover/title:text-blue-600">
            <a href={project.link} className="flex items-center gap-x-2">
              <span>{project.name}</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 opacity-0 transition group-hover/title:opacity-100" />
            </a>
          </h3>
          <p className="mt-5 text-base leading-7 text-slate-600">
            {project.description}
          </p>
        </div>
        <div className="mt-8">
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`inline-flex items-center rounded-full ${colors[project.color].tag.bg} px-4 py-1.5 text-sm font-medium ${colors[project.color].tag.text} ring-1 ring-inset ${colors[project.color].tag.ring}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative aspect-video w-full flex-1 overflow-hidden rounded-2xl border border-slate-200">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </article>
  )
}

export function Projects() {
  return (
    <div className="relative bg-white py-24 sm:py-32" id="projects">
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-slate-50"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50"></div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base leading-7 font-semibold text-blue-600">
            Our Portfolio
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Projects We've Delivered
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Explore some of our successful projects where we've helped
            businesses transform their operations with innovative software
            solutions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl space-y-12">
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
