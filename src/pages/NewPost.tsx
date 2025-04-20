
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostEditor, { PostProps } from "@/components/PostEditor";
import { useToast } from "@/hooks/use-toast";

const NewPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [post, setPost] = useState<PostProps | undefined>(undefined);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      navigate("/admin");
      toast({
        title: "Access denied",
        description: "You must be logged in to access this page",
        variant: "destructive",
      });
      return;
    }
    
    setIsAuthenticated(true);
    
    // If editing an existing post, load it
    if (id) {
      const storedPosts = localStorage.getItem("posts");
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        const foundPost = parsedPosts.find((p: PostProps) => p.id === id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          // Post not found
          navigate("/admin");
          toast({
            title: "Post not found",
            description: "The post you're trying to edit doesn't exist",
            variant: "destructive",
          });
        }
      }
    }
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, [id, navigate, toast]);

  const handleSavePost = (post: PostProps) => {
    const storedPosts = localStorage.getItem("posts");
    let updatedPosts: PostProps[] = [];
    
    if (storedPosts) {
      const parsedPosts: PostProps[] = JSON.parse(storedPosts);
      
      if (id) {
        // Update existing post
        updatedPosts = parsedPosts.map(p => 
          p.id === id ? post : p
        );
      } else {
        // Add new post
        updatedPosts = [post, ...parsedPosts];
      }
    } else {
      // No posts exist yet
      updatedPosts = [post];
    }
    
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    
    // Navigate back to admin dashboard
    navigate("/admin");
  };

  const animationClasses = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  if (!isAuthenticated) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className={`mb-8 transition-all duration-700 ${animationClasses}`}>
            <h1 className="text-3xl font-bold mb-2">
              {id ? "Edit" : "Create"} <span className="gradient-text">Post</span>
            </h1>
            <p className="text-foreground/70">
              {id ? "Update your existing post content and details" : "Add a new post to your portfolio"}
            </p>
          </div>
          
          <div className={`transition-all duration-700 delay-200 ${animationClasses}`}>
            <PostEditor post={post} onSave={handleSavePost} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewPost;
