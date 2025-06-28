'use client'

import { motion } from 'framer-motion'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyUs } from '@/components/WhyUs'
import { Projects } from '@/components/Projects'
import { TechStack } from '@/components/TechStack'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { fadeInUp, staggerContainer } from '@/lib/animations'

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={staggerContainer}
      className={className}
      transition={{ delay }}
    >
      <motion.div variants={fadeInUp}>{children}</motion.div>
    </motion.section>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <AnimatedSection delay={0.1}>
          <Hero />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <About />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Services />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <WhyUs />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Projects />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <TechStack />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Contact />
        </AnimatedSection>
      </main>
      <Footer />
    </>
  )
}
