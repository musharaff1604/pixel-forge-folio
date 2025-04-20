
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillBar, { SkillProps } from "@/components/SkillBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const EXPERIENCES = [
  {
    title: "Senior Game Developer",
    company: "NeonByte Studios",
    period: "2020 - Present",
    description: "Leading development of AAA mobile games with Unity. Managing a team of 5 developers and coordinating with artists and designers."
  },
  {
    title: "Game Developer",
    company: "Quantum Interactive",
    period: "2017 - 2020",
    description: "Worked on VR experiences and multiplayer games using Unreal Engine. Implemented networking solutions and gameplay mechanics."
  },
  {
    title: "Junior Developer",
    company: "Indie Game Collective",
    period: "2015 - 2017",
    description: "Developed indie 2D games with Unity and custom tools. Participated in multiple game jams and launched two successful mobile titles."
  }
];

const EDUCATION = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    year: "2015",
    description: "Specialized in Game Development and Computer Graphics"
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "MIT",
    year: "2013",
    description: "Focus on Interactive Media and Game Design"
  }
];

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const animationClasses = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${animationClasses}`}>
                About <span className="gradient-text">Me</span>
              </h1>
              <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-100 ${animationClasses}`}>
                Game developer passionate about creating immersive experiences and pushing the boundaries of interactive entertainment.
              </p>
            </div>

            {/* Bio Section */}
            <div className={`mb-16 transition-all duration-700 delay-200 ${animationClasses}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="col-span-1">
                  <div className="aspect-square rounded-2xl overflow-hidden relative border-2 border-primary/50 border-glow">
                    <img 
                      src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                      alt="Profile Photo" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-4">
                      <h3 className="text-xl font-bold text-glow">John Developer</h3>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 prose prose-invert max-w-none">
                  <p className="text-lg">
                    With over 8 years of game development experience, I've had the privilege of working on diverse projects ranging from indie mobile games to AAA titles. My expertise lies in creating engaging gameplay mechanics, optimizing performance, and delivering immersive player experiences.
                  </p>
                  <p>
                    I specialize in Unity and Unreal Engine development, with a strong foundation in both 2D and 3D game creation. My approach combines technical excellence with a deep understanding of player psychology to create memorable gaming experiences.
                  </p>
                  <p>
                    When I'm not coding or designing, you'll find me playing the latest indie gems, contributing to game jams, or exploring new technologies in the XR space. I'm passionate about pushing the boundaries of what's possible in interactive entertainment.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
                      Download Resume
                    </Button>
                    <Link to="/contact">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/20">
                        Contact Me
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className={`mb-16 transition-all duration-700 delay-300 ${animationClasses}`}>
              <h2 className="text-3xl font-bold mb-8">My <span className="gradient-text">Skills</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {SKILLS.map((skill, index) => (
                  <div key={skill.name}>
                    <SkillBar skill={skill} />
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className={`mb-16 transition-all duration-700 delay-400 ${animationClasses}`}>
              <h2 className="text-3xl font-bold mb-8">Work <span className="gradient-text">Experience</span></h2>
              <div className="space-y-8">
                {EXPERIENCES.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l border-border">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary border-2 border-background"></div>
                    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <div className="flex flex-wrap justify-between items-center mt-1 mb-4">
                        <span className="text-primary">{exp.company}</span>
                        <span className="text-sm text-foreground/60">{exp.period}</span>
                      </div>
                      <p className="text-foreground/80">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className={`mb-16 transition-all duration-700 delay-500 ${animationClasses}`}>
              <h2 className="text-3xl font-bold mb-8">My <span className="gradient-text">Education</span></h2>
              <div className="space-y-8">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l border-border last:pb-0">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-game-cyan border-2 border-background"></div>
                    <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-game-cyan/50 transition-colors">
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <div className="flex flex-wrap justify-between items-center mt-1 mb-4">
                        <span className="text-game-cyan">{edu.institution}</span>
                        <span className="text-sm text-foreground/60">{edu.year}</span>
                      </div>
                      <p className="text-foreground/80">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className={`text-center transition-all duration-700 delay-600 ${animationClasses}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to <span className="gradient-text">Collaborate</span>?</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
                Let's work together to bring your game development project to life. Whether you're looking for a full-time developer or need help with a specific project, I'd love to hear from you.
              </p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-6 text-lg">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
