
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export interface PostProps {
  id?: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface PostEditorProps {
  post?: PostProps;
  onSave: (post: PostProps) => void;
}

const PostEditor = ({ post, onSave }: PostEditorProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PostProps>(
    post || {
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      tags: [],
    }
  );
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.content) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      onSave({
        ...formData,
        id: post?.id || crypto.randomUUID(),
        createdAt: post?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      toast({
        title: "Success!",
        description: post ? "Post updated successfully" : "Post created successfully",
      });
      
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
          <CardDescription>
            {post
              ? "Update your existing post content and details"
              : "Add a new project or blog post to your portfolio"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              value={formData.title}
              onChange={handleChange}
              className="border-border/50 bg-background/50"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a short description"
              value={formData.description}
              onChange={handleChange}
              className="border-border/50 bg-background/50 min-h-[80px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-foreground">
              Content <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter full content"
              value={formData.content}
              onChange={handleChange}
              className="border-border/50 bg-background/50 min-h-[200px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-foreground">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border-border/50 bg-background/50"
            />
          </div>
          
          <div className="space-y-4">
            <Label className="text-foreground">Tags</Label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border-border/50 bg-background/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/20"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-primary/20 text-primary px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 focus:outline-none"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            className="border-border text-foreground hover:bg-background"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-primary text-primary-foreground hover:bg-primary/80"
            disabled={loading}
          >
            {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PostEditor;
