
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  MessageSquare,
  Share,
  Bookmark,
  TrendingUp,
  Newspaper,
  Image,
  Users,
} from "lucide-react";

interface FeedItem {
  id: string;
  type: "chat" | "news" | "trending" | "deepdive" | "photo" | "poll";
  author: {
    name: string;
    avatar: string;
    handle?: string;
  };
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  meta?: {
    pollOptions?: { text: string; votes: number }[];
    totalVotes?: number;
    promptUsage?: number;
    aiCaption?: string;
  };
}

const ExploreFeeds = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: "1",
      type: "chat",
      author: {
        name: "Sarah Johnson",
        handle: "sarahj",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      timestamp: "2h ago",
      content: "Just had an amazing conversation with the City agent about upcoming road construction in Tower Grove. Apparently they're adding new bike lanes next month! #STLImprovement",
      likes: 24,
      comments: 5,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      type: "news",
      author: {
        name: "STL Daily Updates",
        handle: "stldaily",
        avatar: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      timestamp: "5h ago",
      content: "The St. Louis Cardinals announced a new community initiative to renovate local baseball fields. The program will invest $2.5M in underserved neighborhoods over the next three years.",
      image: "https://images.unsplash.com/photo-1562041105-e94ae9fc8fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      likes: 156,
      comments: 32,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "3",
      type: "trending",
      author: {
        name: "Trending in STL",
        handle: "trendingstl",
        avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      timestamp: "12h ago",
      content: "People are asking about the best hiking trails around St. Louis. Forest Park and Castlewood State Park are getting the most mentions. What's your favorite outdoor spot?",
      likes: 89,
      comments: 43,
      isLiked: false,
      isBookmarked: true,
      meta: {
        promptUsage: 342
      },
    },
    {
      id: "4",
      type: "deepdive",
      author: {
        name: "STL Deep Dive",
        handle: "stldeep",
        avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      timestamp: "1d ago",
      content: "The History of Soulard Market: Dating back to 1779, Soulard Farmers Market is one of the oldest public markets west of the Mississippi. Originally a community gathering place for French settlers, it evolved through the centuries while maintaining its cultural significance.",
      image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      likes: 215,
      comments: 37,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "5",
      type: "photo",
      author: {
        name: "Michael Chen",
        handle: "stlphotographer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      timestamp: "1d ago",
      content: "",
      image: "https://images.unsplash.com/photo-1501593278434-2b658bac9da5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      likes: 423,
      comments: 21,
      isLiked: true,
      isBookmarked: true,
      meta: {
        aiCaption: "The Gateway Arch reflecting in the water at sunset, creating a perfect mirror image against the vibrant orange sky."
      }
    },
    {
      id: "6",
      type: "poll",
      author: {
        name: "STL Community",
        handle: "stlcommunity",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      timestamp: "2d ago",
      content: "What's your favorite season in St. Louis?",
      likes: 89,
      comments: 32,
      isLiked: false,
      isBookmarked: false,
      meta: {
        pollOptions: [
          { text: "Spring", votes: 245 },
          { text: "Summer", votes: 121 },
          { text: "Fall", votes: 387 },
          { text: "Winter", votes: 98 },
        ],
        totalVotes: 851
      }
    },
  ]);

  const handleLike = (id: string) => {
    setFeedItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return { 
            ...item, 
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1 
          };
        }
        return item;
      })
    );
  };

  const handleBookmark = (id: string) => {
    setFeedItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, isBookmarked: !item.isBookmarked };
        }
        return item;
      })
    );
  };

  const getTypeIcon = (type: FeedItem["type"]) => {
    switch (type) {
      case "chat":
        return <Users size={16} className="text-blue-500" />;
      case "news":
        return <Newspaper size={16} className="text-orange-500" />;
      case "trending":
        return <TrendingUp size={16} className="text-green-500" />;
      case "deepdive":
        return <MessageSquare size={16} className="text-purple-500" />;
      case "photo":
        return <Image size={16} className="text-pink-500" />;
      case "poll":
        return <Users size={16} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="container max-w-2xl mx-auto py-4 px-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Explore STL</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Latest
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              Popular
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-6">
            {feedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <img src={item.author.avatar} alt={item.author.name} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{item.author.name}</h3>
                        {item.author.handle && (
                          <span className="text-sm text-muted-foreground">@{item.author.handle}</span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">{item.timestamp}</span>
                        {getTypeIcon(item.type)}
                      </div>
                      
                      {item.content && (
                        <p className="mt-2 text-base text-foreground">{item.content}</p>
                      )}
                      
                      {item.image && (
                        <div className="mt-3 rounded-md overflow-hidden">
                          <img src={item.image} alt="" className="w-full h-auto object-cover" />
                          {item.meta?.aiCaption && (
                            <p className="mt-2 text-sm text-muted-foreground italic">
                              AI Caption: {item.meta.aiCaption}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {item.type === "poll" && item.meta?.pollOptions && (
                        <div className="mt-3 space-y-2">
                          {item.meta.pollOptions.map((option, index) => {
                            const percentage = Math.round((option.votes / (item.meta?.totalVotes || 1)) * 100);
                            return (
                              <div key={index} className="space-y-1">
                                <div className="flex items-center justify-between text-sm text-foreground">
                                  <span>{option.text}</span>
                                  <span>{percentage}%</span>
                                </div>
                                <div className="w-full bg-secondary h-2 rounded-full">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }} 
                                  />
                                </div>
                              </div>
                            );
                          })}
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.meta.totalVotes} votes
                          </p>
                        </div>
                      )}
                      
                      {item.type === "trending" && item.meta?.promptUsage && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {item.meta.promptUsage} people exploring this topic
                        </p>
                      )}
                      
                      <div className="flex items-center gap-6 mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                          onClick={() => handleLike(item.id)}
                        >
                          <Heart size={18} className={item.isLiked ? "fill-red-500 text-red-500" : ""} />
                          <span>{item.likes}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <MessageSquare size={18} />
                          <span>{item.comments}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <Share size={18} />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-muted-foreground ml-auto"
                          onClick={() => handleBookmark(item.id)}
                        >
                          <Bookmark 
                            size={18} 
                            className={item.isBookmarked ? "fill-primary text-primary" : ""} 
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ExploreFeeds;
