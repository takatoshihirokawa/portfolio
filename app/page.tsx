import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Works from "@/components/sections/Works"
import Topics from "@/components/sections/Topics"
import Contact from "@/components/sections/Contact"
import Marquee from "@/components/ui/Marquee"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Works />
      <Topics />
      <Contact />
    </>
  )
}
