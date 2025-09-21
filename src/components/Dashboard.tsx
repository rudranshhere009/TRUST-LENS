import { FileText, Shield, BookOpen, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustScore } from "./TrustScore";
import heroImage from "@/assets/hero-trustlens.jpg";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DocumentUpload } from "./DocumentUpload";
import { MisinformationChecker } from "./MisinformationChecker";

const stats = [
  {
    title: "Documents Analyzed",
    value: "24",
    change: "+3 this week",
    icon: FileText
  },
  {
    title: "Average Trust Score",
    value: "78",
    change: "+5 from last month",
    icon: Shield
  },
  {
    title: "Learning Progress",
    value: "67%",
    change: "2 courses completed",
    icon: BookOpen
  },
  {
    title: "Risk Alerts",
    value: "3",
    change: "2 resolved",
    icon: AlertTriangle
  }
];

const recentDocuments = [
  {
    name: "Rental Agreement - Downtown Apt",
    trustScore: 72,
    date: "2 days ago",
    status: "completed",
    risks: 2
  },
  {
    name: "Employment Contract - TechCorp",
    trustScore: 89,
    date: "1 week ago",
    status: "completed",
    risks: 0
  },
  {
    name: "Service Terms - CloudStorage Inc",
    trustScore: 45,
    date: "2 weeks ago",
    status: "completed",
    risks: 4
  }
];

const recentFactChecks = [
  {
    title: "Climate Change Article - News Source",
    trustScore: 85,
    date: "3 days ago",
    status: "verified"
  },
  {
    title: "Health Claims - Social Media Post",
    trustScore: 23,
    date: "1 week ago",
    status: "misleading"
  }
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="overflow-hidden dashboard-card-effect">
        <div className="relative h-48 bg-gradient-primary">
          <img
            src={heroImage}
            alt="TrustLens Platform"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="relative p-6 text-primary-foreground">
            <h1 className="text-2xl font-bold mb-2">Welcome back to TrustLens</h1>
            <p className="text-primary-foreground/90 mb-4">
              Your AI-powered platform for legal document analysis and misinformation detection
            </p>
            <div className="flex space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                      Upload your legal documents here for analysis. Supports PDF, DOCX, and TXT files.
                    </DialogDescription>
                  </DialogHeader>
                  <DocumentUpload />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    Check Information
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Check Information</DialogTitle>
                    <DialogDescription>
                      Fact-check information by providing a URL or pasting text.
                    </DialogDescription>
                  </DialogHeader>
                  <MisinformationChecker />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="dashboard-card-effect">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Documents */}
        <Card className="dashboard-card-effect">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{doc.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{doc.date}</span>
                    <Badge variant={doc.risks > 0 ? "destructive" : "secondary"} className="text-xs">
                      {doc.risks > 0 ? `${doc.risks} risks` : "No risks"}
                    </Badge>
                  </div>
                </div>
                <TrustScore score={doc.trustScore} size="sm" showLabel={false} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Fact Checks */}
        <Card className="dashboard-card-effect">
          <CardHeader>
            <CardTitle>Recent Fact Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFactChecks.length > 0 ? (
              recentFactChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{check.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">{check.date}</span>
                      <Badge variant={check.status === 'verified' ? 'secondary' : 'destructive'} className="text-xs">
                        {check.status}
                      </Badge>
                    </div>
                  </div>
                  <TrustScore score={check.trustScore} size="sm" showLabel={false} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent fact checks to display.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card-effect">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-16 flex-col">
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-sm">Analyze Document</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Upload your legal documents here for analysis. Supports PDF, DOCX, and TXT files.
                  </DialogDescription>
                </DialogHeader>
                <DocumentUpload />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-16 flex-col">
                  <Shield className="h-5 w-5 mb-1" />
                  <span className="text-sm">Fact Check URL</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Check Information</DialogTitle>
                  <DialogDescription>
                    Fact-check information by providing a URL or pasting text.
                  </DialogDescription>
                </DialogHeader>
                <MisinformationChecker />
              </DialogContent>
            </Dialog>
            <Link to="/app?tab=education" className="w-full">
              <Button variant="outline" className="h-16 flex-col w-full">
                <BookOpen className="h-5 w-5 mb-1" />
                <span className="text-sm">Continue Learning</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};