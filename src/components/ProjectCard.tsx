
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Gamepad } from "lucide-react";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group overflow-hidden border-border bg-card/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-52">
        <img 
          src={project.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-background/90 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-60'}`}></div>
        
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-glow transition-all duration-300">
            {project.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/50 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-foreground/80 line-clamp-3">{project.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 p-4 pt-0">
        {project.demoUrl && (
          <Button variant="default" className="flex-1 bg-primary hover:bg-primary/80 group">
            <Play size={16} className="mr-2 group-hover:animate-pulse" />
            Demo
          </Button>
        )}
        
        {project.githubUrl && (
          <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/20">
            <Gamepad size={16} className="mr-2" />
            Source
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
