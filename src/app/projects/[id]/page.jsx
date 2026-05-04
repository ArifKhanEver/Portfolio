"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiArrowLeft, FiCode, FiZap, FiTarget } from 'react-icons/fi';
import Dragon from '@/assets/home-layout.png';
import KinKeeper from '@/assets/KinKeeper.png';
import BookVibe from '@/assets/BookVibe.png';

// Requirement অনুযায়ী বিস্তারিত ডাটা অ্যারে
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

  // URL ID অনুযায়ী প্রজেক্ট খুঁজে বের করা
  const project = PROJECT_DETAILS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <h2 className="text-2xl font-bold text-slate-800">Project not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-[#149988] font-bold mb-10 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image & Links */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative h-[300px] md:h-[450px] rounded-[40px] overflow-hidden shadow-2xl shadow-teal-900/10 border-8 border-white">
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
                className="flex-1 flex items-center justify-center gap-2 bg-[#149988] text-white py-4 rounded-2xl font-bold hover:bg-[#0f7d6f] transition-all shadow-lg shadow-teal-900/20 active:scale-95"
              >
                <FiExternalLink size={20} /> Live Preview
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                <FiGithub size={20} /> View Source
              </a>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{project.name}</h1>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-widest text-xs mb-3">
                  <FiCode className="text-[#149988]" /> Description
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">{project.description}</p>
              </section>

              <section className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                <h3 className="flex items-center gap-2 text-orange-700 font-black uppercase tracking-widest text-xs mb-3">
                  <FiZap /> Challenges Faced
                </h3>
                <p className="text-orange-900/70 text-sm font-medium leading-relaxed">{project.challenges}</p>
              </section>

              <section className="p-6 bg-[#E6F4F1] rounded-3xl border border-[#149988]/10">
                <h3 className="flex items-center gap-2 text-[#149988] font-black uppercase tracking-widest text-xs mb-3">
                  <FiTarget /> Future Improvements
                </h3>
                <p className="text-[#149988]/80 text-sm font-medium leading-relaxed">{project.improvements}</p>
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;