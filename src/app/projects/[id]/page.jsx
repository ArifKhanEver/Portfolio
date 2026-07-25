"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiArrowLeft, FiCode, FiZap, FiTarget } from 'react-icons/fi';
import Dragon from '@/assets/home-layout.png';
import KinKeeper from '@/assets/KinKeeper.png';
import BookVibe from '@/assets/BookVibe.png';

const PROJECT_DETAILS = [
  {
    id: "dragon-news",
    name: "Dragon News",
    image: Dragon,
    stack: ["Next.js", "Tailwind CSS", "Better Auth", "MongoDB"],
    description: "A comprehensive news portal designed for real-time news delivery. It features a robust authentication system allowing users to engage with content through Google and GitHub accounts. The architecture focuses on server-side rendering for optimal SEO and performance.",
    liveLink: "https://dragon-news-ng7z.vercel.app/",
    githubLink: "https://github.com/ArifKhanEver/Dragon-News",
    challenges: "Synchronizing user sessions between server and client components while using Better Auth was a steep learning curve. Additionally, handling responsive layouts for complex news grids required meticulous CSS planning.",
    improvements: "Planned features include an AI-powered news summarizer, a dark mode toggle, and a personalized news feed based on user reading habits."
  },
  {
    id: "kin-keeper",
    name: "KinKeeper",
    image: KinKeeper,
    stack: ["React.js", "DaisyUI", "Tailwind CSS", "Local Storage API"],
    description: "KinKeeper is a personal relationship management tool that helps users maintain meaningful connections. It tracks the last time you contacted someone and reminds you to reach out based on custom goals, ensuring no friendship is neglected in a busy world.",
    liveLink: "https://kin-keeper-app.netlify.app/",
    githubLink: "https://github.com/ArifKhanEver/KinKeeper",
    challenges: "The primary challenge was managing complex date calculations and persistence using Local Storage to ensure data remains consistent across browser sessions without a dedicated backend.",
    improvements: "Future updates will integrate cloud synchronization, push notifications for reminders, and the ability to categorize contacts into circles like 'Family' or 'Work'."
  },
  {
    id: "book-vibe",
    name: "Book Vibe",
    image: BookVibe,
    stack: ["React.js", "Context API", "Tailwind CSS", "React Router"],
    description: "An elegant digital bookstore with a focus on user experience. It allows users to browse a curated list of books, view detailed descriptions, and manage a personalized reading list through an interactive UI.",
    liveLink: "https://the-book-vibe-app.netlify.app/",
    githubLink: "https://github.com/ArifKhanEver/Book_Vibe",
    challenges: "Implementing a smooth filtering system for books based on genres and ratings while maintaining a high frame rate during UI transitions was the main hurdle.",
    improvements: "I plan to add a global search feature, a user review and rating system, and integration with a third-party Book API for live data updates."
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const project = PROJECT_DETAILS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02050A]">
        <h2 className="text-2xl font-bold text-white">Project not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02050A] py-12 md:py-24 px-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-primary font-bold mb-10 transition-colors group tracking-wider uppercase text-sm"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image & Links */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative h-[300px] md:h-[450px] rounded-[40px] overflow-hidden shadow-[0_10px_30px_rgba(6,143,255,0.15)] border border-white/10 group">
              <Image 
                src={project.image} 
                alt={project.name} 
                fill 
                className="object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href={project.liveLink} 
                target="_blank" 
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent hover:text-black transition-all shadow-[0_0_15px_rgba(6,143,255,0.5)] active:scale-95 uppercase tracking-widest text-sm"
              >
                <FiExternalLink size={20} /> Live Preview
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm"
              >
                <FiGithub size={20} /> View Source
              </a>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase tracking-tighter mb-4">{project.name}</h1>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:border-primary/30 hover:text-primary transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <section className="p-6 bg-[#0B0F19] rounded-2xl border border-white/5">
                <h3 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs mb-3">
                  <FiCode className="text-primary" /> Description
                </h3>
                <p className="text-gray-400 font-light leading-relaxed">{project.description}</p>
              </section>

              <section className="p-6 bg-[#0B0F19] rounded-2xl border border-white/5">
                <h3 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs mb-3">
                  <FiZap className="text-accent" /> Challenges Faced
                </h3>
                <p className="text-gray-400 font-light leading-relaxed">{project.challenges}</p>
              </section>

              <section className="p-6 bg-[#0B0F19] rounded-2xl border border-white/5">
                <h3 className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs mb-3">
                  <FiTarget className="text-primary" /> Future Improvements
                </h3>
                <p className="text-gray-400 font-light leading-relaxed">{project.improvements}</p>
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;