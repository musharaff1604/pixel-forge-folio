
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostProps } from "@/components/PostEditor";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data - in a real app, this would come from API/database
const INITIAL_POSTS: PostProps[] = [
  {
    id: "1",
    title: "Neon Abyss",
    description: "A fast-paced roguelike platformer with dynamic lighting effects.",
    content: "Detailed description of the Neon Abyss project with technical information and development challenges.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
    tags: ["Unity", "C#", "2D", "Roguelike"],
    createdAt: "2023-09-15T12:00:00Z",
    updatedAt: "2023-10-20T15:30:00Z",
  },
  {
    id: "2",
    title: "Cyberpunk RPG",
    description: "An open-world RPG set in a dystopian future.",
    content: "Detailed description of the Cyberpunk RPG project with technical information and development challenges.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["Unreal Engine", "C++", "3D", "RPG"],
    createdAt: "2023-11-05T09:15:00Z",
    updatedAt: "2023-12-10T11:45:00Z",
  },
  {
    id: "3",
    title: "Virtual Reality Escape Room",
    description: "A VR puzzle game with increasingly complex rooms.",
    content: "Detailed description of the VR Escape Room project with technical information and development challenges.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    tags: ["VR", "Unity", "C#", "Puzzle"],
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-02-15T16:20:00Z",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated (using localStorage in this demo)
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
      
      // Load posts data
      const storedPosts = localStorage.getItem("posts");
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        setPosts(INITIAL_POSTS);
        localStorage.setItem("posts", JSON.stringify(INITIAL_POSTS));
      }
    }
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    // Simple authentication for demo purposes
    // In a real app, you would use proper authentication
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      
      // Load posts data
      const storedPosts = localStorage.getItem("posts");
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        setPosts(INITIAL_POSTS);
        localStorage.setItem("posts", JSON.stringify(INITIAL_POSTS));
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleDeletePost = (id: string) => {
    setPostToDelete(id);
  };

  const confirmDeletePost = () => {
    if (postToDelete) {
      const updatedPosts = posts.filter(post => post.id !== postToDelete);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      
      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully",
      });
      
      setPostToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const animationClasses = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          {isAuthenticated ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-3xl font-bold mb-2 transition-all duration-700 ${animationClasses}`}>
                    Admin <span className="gradient-text">Dashboard</span>
                  </h1>
                  <p className={`text-foreground/70 transition-all duration-700 delay-100 ${animationClasses}`}>
                    Manage your portfolio content and posts.
                  </p>
                </div>
                
                <div className={`transition-all duration-700 delay-200 ${animationClasses}`}>
                  <Button variant="outline" onClick={handleLogout} className="text-foreground hover:bg-background/80">
                    Logout
                  </Button>
                </div>
              </div>
              
              <Card className={`border-border bg-card/30 backdrop-blur-sm transition-all duration-700 delay-300 ${animationClasses}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Project Posts</CardTitle>
                    <CardDescription>
                      Manage your portfolio projects and posts.
                    </CardDescription>
                  </div>
                  <Link to="/admin/new-post">
                    <Button className="bg-primary hover:bg-primary/80">
                      <Plus size={16} className="mr-2" />
                      New Post
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-muted/5">
                          <TableHead className="w-[300px]">Title</TableHead>
                          <TableHead className="hidden md:table-cell">Tags</TableHead>
                          <TableHead className="hidden md:table-cell">Created</TableHead>
                          <TableHead className="hidden md:table-cell">Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post.id} className="hover:bg-muted/5">
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((tag, i) => (
                                  <Badge key={i} variant="outline" className="border-primary/30 text-foreground/80 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="outline" className="border-primary/30 text-foreground/80 text-xs">
                                    +{post.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-foreground/70">
                              {formatDate(post.createdAt || "")}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-foreground/70">
                              {formatDate(post.updatedAt || "")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 w-8 p-0 border-primary/50 text-primary hover:bg-primary/20"
                                  onClick={() => navigate(`/admin/edit-post/${post.id}`)}
                                >
                                  <Edit size={16} />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                
                                <Dialog open={postToDelete === post.id} onOpenChange={(open) => !open && setPostToDelete(null)}>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="h-8 w-8 p-0 border-destructive/50 text-destructive hover:bg-destructive/20"
                                      onClick={() => handleDeletePost(post.id || "")}
                                    >
                                      <Trash size={16} />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px] bg-card border-border">
                                    <DialogHeader>
                                      <DialogTitle>Confirm Deletion</DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this post? This action cannot be undone.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="mt-4">
                                      <Button 
                                        variant="outline" 
                                        onClick={() => setPostToDelete(null)}
                                        className="border-border text-foreground hover:bg-background"
                                      >
                                        Cancel
                                      </Button>
                                      <Button 
                                        variant="destructive" 
                                        onClick={confirmDeletePost}
                                      >
                                        Delete
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {posts.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              No posts found. Create your first post.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-foreground/60">
                    Showing {posts.length} posts
                  </p>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card className={`border-border bg-card/30 backdrop-blur-sm max-w-md mx-auto transition-all duration-700 ${animationClasses}`}>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>
                  Login to access the admin dashboard to manage your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-border/50 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-border/50 bg-background/50"
                    />
                  </div>
                  {loginError && (
                    <p className="text-destructive text-sm">{loginError}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/80"
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-center text-xs text-foreground/60">
                <p className="w-full">
                  For demo: username = "admin", password = "password"
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
