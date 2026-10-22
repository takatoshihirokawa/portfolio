import Hero from "@/components/sections/Hero"
import Problems from "@/components/sections/Problems"
import Process from "@/components/sections/Process"
import Works from "@/components/sections/Works"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Marquee from "@/components/ui/Marquee"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problems />
      <Process />
      <Works />
      <About />
      <Contact />
    </>
  )
}
