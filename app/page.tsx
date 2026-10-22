import Hero from "@/components/sections/Hero"
import Problems from "@/components/sections/Problems"
import Process from "@/components/sections/Process"
import Works from "@/components/sections/Works"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Marquee from "@/components/ui/Marquee"
import { getFeaturedWorks, getWorks } from "@/lib/data"
import { IntroProvider } from "@/components/ui/Intro"

export default async function Home() {
  const [featured, all] = await Promise.all([getFeaturedWorks(), getWorks()])
  return (
    <IntroProvider>
      <Hero />
      <Marquee />
      <Problems />
      <Process />
      <About />
      <Works works={featured} total={all.length} />
      <Contact />
    </IntroProvider>
  )
}
