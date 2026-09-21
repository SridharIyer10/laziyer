"use client";

import { 
  User, 
  Mail, 
  Code2, 
  Cpu, 
  HeartHandshake,
  Zap
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75a1.75 1.75 0 0 0-1.76 1.75c0 .97.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export function AboutSection() {
  const techStack = [
    "TypeScript",
    "Claude MCP",
    "Next.js 16",
    "React 19",
    "PostgreSQL",
    "pgvector",
    "OpenAI API",
    "Drizzle ORM",
    "Tailwind CSS v4",
    "Python",
    "PyTorch",
    "Docker",
  ];

  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            <User className="h-4 w-4" />
            <span>Behind laziyer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            About laziyer &amp; Srikanth
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Bio Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>The Vision Behind laziyer</span>
              </div>

              <p className="text-base sm:text-lg text-foreground font-medium leading-relaxed">
                Hi! I&apos;m <span className="text-primary font-bold">Srikanth</span>. I built <span className="text-foreground font-extrabold">laziyer</span> as a free, open platform for AI-related information that I find interesting.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                The rapid evolution of LLMs, agentic architectures, Model Context Protocol (MCP), and vector databases can be overwhelming. <strong className="text-foreground font-semibold">laziyer</strong> is where I curate and organize the most impactful skills, copyable prompts, open-source repositories, video shorts, and tutorials so that developers can build smarter and faster.
              </p>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Everything hosted here is 100% free and open for the community to explore, copy, install, and extend.
              </p>
            </div>

            {/* Core Focus Areas */}
            <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                <span>AI Engineering Focus</span>
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Claude Skills &amp; MCP Protocol</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Hybrid Vector &amp; FTS Search</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Autonomous Multi-Agent Loops</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>High-Craft Web Systems</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Tech Stack & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tech Stack Card */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-xs">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
                <Code2 className="h-4 w-4 text-primary" />
                <span>Core Stack &amp; Tooling</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-foreground border border-border hover:border-primary/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Connect Card */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-xs">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
                <HeartHandshake className="h-4 w-4 text-primary" />
                <span>Follow &amp; Connect</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all hover:scale-[1.02]"
                >
                  <GithubIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all hover:scale-[1.02]"
                >
                  <TwitterIcon className="h-4 w-4 text-blue-500 shrink-0" />
                  <span>X / Twitter</span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all hover:scale-[1.02]"
                >
                  <YoutubeIcon className="h-4 w-4 text-red-500 shrink-0" />
                  <span>YouTube</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all hover:scale-[1.02]"
                >
                  <InstagramIcon className="h-4 w-4 text-pink-500 shrink-0" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all hover:scale-[1.02]"
                >
                  <LinkedinIcon className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:srikanth@example.com"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground hover:text-primary transition-all hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
