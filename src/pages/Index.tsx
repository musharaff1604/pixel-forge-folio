
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard, { ProjectProps } from "@/components/ProjectCard";
import SkillBar, { SkillProps } from "@/components/SkillBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample data - in a real app, this would come from API/database
const FEATURED_PROJECTS: ProjectProps[] = [
  {
    id: "1",
    title: "Neon Abyss",
    description: "A fast-paced roguelike platformer with dynamic lighting effects and procedurally generated levels.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
    tags: ["Unity", "C#", "2D", "Roguelike"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "2",
    title: "Cyberpunk RPG",
    description: "An open-world RPG set in a dystopian future with advanced AI systems and a branching narrative.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["Unreal Engine", "C++", "3D", "RPG"],
    demoUrl: "#"
  },
  {
    id: "3",
    title: "Virtual Reality Escape Room",
    description: "A VR puzzle game that challenges players to escape from a series of increasingly complex rooms.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["VR", "Unity", "C#", "Puzzle"],
    githubUrl: "#"
  }
];

const SKILLS: SkillProps[] = [
  { name: "Unity", level: 90, color: "purple" },
  { name: "Unreal Engine", level: 75, color: "cyan" },
  { name: "C#", level: 85 },
  { name: "C++", level: 70, color: "magenta" },
  { name: "3D Modeling", level: 65, color: "cyan" },
  { name: "Game Design", level: 80, color: "purple" },
  { name: "UI/UX", level: 75 },
  { name: "VR Development", level: 60, color: "magenta" }
];

const Index = () => {
  const [projects, setProjects] = useState<ProjectProps[]>(FEATURED_PROJECTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const animationClasses = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Projects */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${animationClasses}`}>
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-100 ${animationClasses}`}>
                Explore some of my most recent game development projects and experiments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`transition-all duration-700 ${animationClasses}`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            <div className={`mt-12 text-center transition-all duration-700 delay-700 ${animationClasses}`}>
              <Link to="/projects">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/20 px-8">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="py-20 bg-background/50 relative">
          <div className="absolute inset-0 bg-grid opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${animationClasses}`}>
                  My <span className="gradient-text">Skills</span> & Expertise
                </h2>
                <p className={`text-foreground/70 mb-8 transition-all duration-700 delay-100 ${animationClasses}`}>
                  With several years of experience in game development, I've honed my skills across multiple engines, programming languages, and design methodologies.
                </p>
                
                <div className="space-y-6">
                  {SKILLS.slice(0, 4).map((skill, index) => (
                    <div 
                      key={skill.name}
                      className={`transition-all duration-700 ${animationClasses}`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <SkillBar skill={skill} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {SKILLS.slice(4).map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`transition-all duration-700 ${animationClasses}`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <SkillBar skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* About/Bio Section */}
        <section className="py-20 bg-background relative">
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-game-cyan/5 blur-3xl rounded-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${animationClasses}`}>
                About <span className="gradient-text">Me</span>
              </h2>
              
              <div className={`prose prose-invert max-w-none transition-all duration-700 delay-100 ${animationClasses}`}>
                <p className="text-lg text-foreground/80 mb-6">
                  I'm a passionate game developer with a love for creating immersive, interactive experiences that push the boundaries of what's possible in gaming.
                </p>
                <p className="text-lg text-foreground/80 mb-6">
                  My journey began with modding existing games, which quickly evolved into creating my own small projects. Today, I focus on developing innovative gameplay mechanics and crafting engaging narratives that resonate with players.
                </p>
                <p className="text-lg text-foreground/80">
                  When I'm not coding or designing, you'll find me playing the latest indie gems, contributing to game jams, or exploring new technologies in the XR space.
                </p>
              </div>
              
              <div className={`mt-10 transition-all duration-700 delay-300 ${animationClasses}`}>
                <Link to="/contact">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/80 px-8">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
