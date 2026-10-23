import Hero from "@/components/sections/Hero"
import Problems from "@/components/sections/Problems"
import Process from "@/components/sections/Process"
import Works from "@/components/sections/Works"
import About from "@/components/sections/About"
import Lab from "@/components/sections/Lab"
import Contact from "@/components/sections/Contact"
import Marquee from "@/components/ui/Marquee"
import { getFeaturedWorks, getClientWorks, getLabWorks } from "@/lib/data"
import { IntroProvider } from "@/components/ui/Intro"

export default async function Home() {
  const [featured, client, lab] = await Promise.all([getFeaturedWorks(), getClientWorks(), getLabWorks()])
  return (
    <IntroProvider>
      <Hero />
      <Marquee />
      <Problems />
      <Process />
      <About />
      <Works works={featured} total={client.length} />
      <Lab works={lab} />
      <Contact />
    </IntroProvider>
  )
}
