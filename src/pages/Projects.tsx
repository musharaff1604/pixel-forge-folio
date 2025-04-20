
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard, { ProjectProps } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// Sample data - in a real app, this would come from API/database
const ALL_PROJECTS: ProjectProps[] = [
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
  },
  {
    id: "4",
    title: "Strategy Empire",
    description: "A turn-based strategy game featuring complex resource management and diplomatic systems.",
    imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["Unity", "C#", "Strategy", "Turn-based"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "5",
    title: "Pixel Adventure",
    description: "A retro-styled platformer featuring hand-crafted pixel art and chiptune music.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
    tags: ["Godot", "GDScript", "2D", "Pixel Art"],
    demoUrl: "#"
  },
  {
    id: "6",
    title: "Multiplayer Arena",
    description: "A fast-paced multiplayer game with advanced netcode and competitive matchmaking.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["Unity", "C#", "Multiplayer", "Networking"],
    githubUrl: "#"
  }
];

// Get all unique tags from projects
const getAllTags = (projects: ProjectProps[]) => {
  const tagsSet = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectProps[]>(ALL_PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState<ProjectProps[]>(ALL_PROJECTS);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const allTags = getAllTags(projects);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter projects based on search term and selected tags
    const filtered = projects.filter(project => {
      const matchesSearch = 
        searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedTags, projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  const animationClasses = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${animationClasses}`}>
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-100 ${animationClasses}`}>
              Explore my portfolio of game development projects, from small experimental prototypes to fully realized games.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className={`mb-12 transition-all duration-700 delay-200 ${animationClasses}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-border/50 bg-background/50 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/20"
                onClick={clearFilters}
                disabled={searchTerm === "" && selectedTags.length === 0}
              >
                Clear Filters
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-primary hover:bg-primary/80"
                      : "border-primary/50 text-foreground/80 hover:bg-primary/20"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`transition-all duration-700 ${animationClasses}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 transition-all duration-700 delay-300 ${animationClasses}`}>
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-foreground/70">Try adjusting your search or filters.</p>
              <Button 
                variant="link" 
                className="text-primary mt-2"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
