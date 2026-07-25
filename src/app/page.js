import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HeroInspiration from "@/components/HeroInspiration";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero></Hero>
      {/* <HeroInspiration></HeroInspiration> */}
      <About></About>
      <Skills></Skills>
      <Experience></Experience>
      <Education></Education>
      <Projects></Projects>
      <Contact></Contact>
    </div>
  );
}
