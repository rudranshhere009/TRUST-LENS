import { useState } from "react";
import { Play, BookOpen, Award, Clock, Users, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const courses = [
  {
    id: 1,
    title: "Legal Document Literacy",
    description: "Learn to read and understand common legal documents like contracts, leases, and terms of service.",
    duration: "45 min",
    lessons: 8,
    progress: 75,
    level: "Beginner",
    students: 1240
  },
  {
    id: 2,
    title: "Spotting Misinformation",
    description: "Develop skills to identify fake news, misleading claims, and unreliable sources in digital media.",
    duration: "60 min",
    lessons: 12,
    progress: 0,
    level: "Intermediate",
    students: 892
  },
  {
    id: 3,
    title: "Digital Privacy Rights",
    description: "Understand your privacy rights and how to protect your personal data online.",
    duration: "30 min",
    lessons: 6,
    progress: 100,
    level: "Beginner",
    students: 2156
  }
];

const quickTips = [
  {
    title: "Red Flags in Contracts",
    description: "Watch out for vague language, unlimited liability clauses, and unreasonable termination terms.",
    readTime: "3 min read"
  },
  {
    title: "Fact-Checking Basics",
    description: "Always verify claims with multiple credible sources before sharing information.",
    readTime: "2 min read"
  },
  {
    title: "Understanding Fine Print",
    description: "Key areas to focus on when reviewing terms and conditions or service agreements.",
    readTime: "4 min read"
  }
];

const youtubeChannels = [
  {
    name: "Code With Harry",
    url: "https://www.youtube.com/@CodeWithHarry",
  },
  {
    name: "CodeHelp by Babbar",
    url: "https://www.youtube.com/@CodeHelpbyBabbar",
  },
  {
    name: "Ezsnippet",
    url: "https://www.youtube.com/@ezsnippet",
  },
];

export const EducationHub = () => {
  const [watchlist, setWatchlist] = useState<typeof courses>([]);
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStartCourseClick = (course: (typeof courses)[0]) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleChannelClick = () => {
    if (selectedCourse && !watchlist.find(c => c.id === selectedCourse.id)) {
      setWatchlist(prev => [...prev, selectedCourse]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Education Hub</h2>
        <p className="text-muted-foreground">
          Build your legal literacy and critical thinking skills with our curated courses and resources.
        </p>
      </div>

      {/* Featured Courses */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Featured Courses</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="dashboard-card-effect flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.lessons} lessons
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant={course.progress > 0 ? "outline" : "default"}
                  onClick={() => course.progress === 0 && handleStartCourseClick(course)}
                >
                  {course.progress === 100 ? (
                    <>
                      <Award className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : course.progress > 0 ? (
                    <>Continue Learning</>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Course
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Watchlist */}
      {watchlist.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">My Watchlist</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {watchlist.map((course) => (
              <Card key={course.id} className="dashboard-card-effect">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="#" onClick={() => handleStartCourseClick(course)}>
                      <Play className="h-4 w-4 mr-2" />
                      Watch Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickTips.map((tip, index) => (
            <Card key={index} className="dashboard-card-effect">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{tip.readTime}</span>
                  <Button variant="ghost" size="sm">Read More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a Channel</DialogTitle>
            <DialogDescription>
              Select a YouTube channel to start watching this course. The course will be added to your watchlist.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3 pt-4">
            {youtubeChannels.map(channel => (
              <Button asChild key={channel.name} variant="outline" className="justify-start">
                <a href={channel.url} target="_blank" rel="noopener noreferrer" onClick={handleChannelClick}>
                  <Youtube className="h-5 w-5 mr-3 text-red-500" />
                  {channel.name}
                </a>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};