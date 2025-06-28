'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Badge } from '@/components/ui/badge'
import logoLaravel from '@/images/logos/laravel.svg'
import logoMirage from '@/images/logos/mirage.svg'
import logoStatamic from '@/images/logos/statamic.svg'
import logoStaticKit from '@/images/logos/statickit.svg'
import logoTransistor from '@/images/logos/transistor.svg'
import logoTuple from '@/images/logos/tuple.svg'
import { fadeIn, fadeInUp, staggerContainer, scaleUp } from '@/lib/animations'

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-slate-50/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient overlay */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_10%,rgba(56,189,248,0.25)_0%,rgba(255,255,255,0)_100%)]"
        />

        {/* Additional gradient layers */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="absolute inset-0 bg-[conic-gradient(from_90deg_at_80%_50%,#ffffff,rgb(236,254,255),#ffffff)]"
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="absolute inset-0 bg-[radial-gradient(100%_100%_at_0%_0%,rgba(56,189,248,0.1)_0%,transparent_50%)]"
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="absolute inset-0 bg-[radial-gradient(100%_100%_at_100%_100%,rgba(56,189,248,0.1)_0%,transparent_50%)]"
        />

        {/* Grid pattern */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:14px_24px]"
        />

        {/* Blurred circles */}
        <motion.div
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-50"
        >
          <div className="h-[40rem] w-[90rem] rounded-full bg-gradient-to-r from-blue-50 via-blue-100/80 to-sky-50 blur-3xl" />
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.3),transparent)]"
        />
      </div>

      <Container
        className="relative px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-32"
        id="hero"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Badge color="blue" className="relative z-10 mb-4 sm:mb-8">
              🇨🇭 Swiss-Based Software Company
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mx-auto max-w-4xl font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Tailored SaaS & Web Solutions{' '}
            <span className="relative mt-2 block whitespace-nowrap text-blue-600 sm:mt-0 sm:inline">
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </motion.svg>
              <span className="relative">Built for Your Business</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:mt-6 sm:text-lg md:text-xl"
          >
            We design and develop custom web apps, websites, and digital
            tools—robust, scalable, and crafted to meet real business needs.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-6"
          >
            <Button href="#projects" className="w-full sm:w-auto">
              View Our Projects
            </Button>
            <Button
              href="#services"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Explore Our Services
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-24 sm:mt-32 lg:mt-44">
            <motion.p
              variants={fadeInUp}
              className="font-display text-sm text-slate-900 sm:text-base"
            >
              Trusted by these six companies so far
            </motion.p>
            <motion.ul
              role="list"
              className="mt-6 flex flex-wrap items-center justify-center gap-4 px-4 sm:mt-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 sm:px-0 xl:flex-row xl:gap-x-12 xl:gap-y-0"
              variants={staggerContainer}
            >
              {[
                [
                  { name: 'Transistor', logo: logoTransistor },
                  { name: 'Tuple', logo: logoTuple },
                  { name: 'StaticKit', logo: logoStaticKit },
                ],
                [
                  { name: 'Mirage', logo: logoMirage },
                  { name: 'Laravel', logo: logoLaravel },
                  { name: 'Statamic', logo: logoStatamic },
                ],
              ].map((group, groupIndex) => (
                <motion.li key={groupIndex} variants={fadeInUp}>
                  <ul
                    role="list"
                    className="flex flex-wrap items-center justify-center gap-4 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                  >
                    {group.map((company) => (
                      <motion.li
                        key={company.name}
                        className="flex"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          unoptimized
                          className="h-8 w-auto sm:h-12"
                        />
                      </motion.li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  )
}
