
import { cn } from "@/lib/utils";

export interface SkillProps {
  name: string;
  level: number; // 0-100
  color?: "purple" | "cyan" | "magenta";
}

const SkillBar = ({ skill }: { skill: SkillProps }) => {
  const getColorClasses = (color?: string) => {
    switch (color) {
      case "cyan":
        return "from-game-cyan/50 to-game-cyan border-game-cyan text-glow-cyan";
      case "magenta":
        return "from-game-magenta/50 to-game-magenta border-game-magenta text-glow-magenta";
      default:
        return "from-primary/50 to-primary border-primary text-glow";
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <span className={cn("text-sm font-medium", skill.level > 80 && getColorClasses(skill.color))}>
          {skill.name}
        </span>
        <span className="text-xs text-foreground/60">{skill.level}%</span>
      </div>
      
      <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
            getColorClasses(skill.color)
          )}
          style={{ width: `${skill.level}%` }}
        >
          <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEgMWw4IDhNMSA5bDgtOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==')]"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
