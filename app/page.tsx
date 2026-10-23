import Hero from "@/components/sections/Hero"
import Problems from "@/components/sections/Problems"
import Process from "@/components/sections/Process"
import Works from "@/components/sections/Works"
import About from "@/components/sections/About"
import Lab from "@/components/sections/Lab"
import Contact from "@/components/sections/Contact"
import Marquee from "@/components/ui/Marquee"
import { getFeaturedWorks, getLabWorks } from "@/lib/data"
import { IntroProvider } from "@/components/ui/Intro"
import ThemeKey from "@/components/ui/ThemeKey"

export default async function Home() {
  const [featured, lab] = await Promise.all([getFeaturedWorks(), getLabWorks()])
  return (
    <IntroProvider>
      <Hero />
      <ThemeKey>
      <Marquee />
      <Problems />
      <Process />
      <About />
      <Works works={featured} />
      <Lab works={lab} />
      <Contact />
      </ThemeKey>
    </IntroProvider>
  )
}
