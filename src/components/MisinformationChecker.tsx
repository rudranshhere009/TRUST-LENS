import { useState } from "react";
import { Search, Link, Type, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResults } from "./AnalysisResults";

export const MisinformationChecker = () => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (type: 'url' | 'text') => {
    const content = type === 'url' ? url : text;
    
    if (!content.trim()) {
      toast({
        title: "Input Required",
        description: `Please enter a ${type === 'url' ? 'URL' : 'text'} to analyze`,
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed the content for misinformation and reliability",
      });
    }, 3000);
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Fact Check Results</h2>
          <Button variant="outline" onClick={() => setShowResults(false)}>
            New Analysis
          </Button>
        </div>
        <AnalysisResults type="misinformation" data={null} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Misinformation Checker</h2>
        <p className="text-muted-foreground">
          Analyze URLs or text content to detect misinformation, verify claims, and assess credibility.
        </p>
      </div>

      <Card className="dashboard-card-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Content Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center space-x-2">
                <Link className="h-4 w-4" />
                <span>URL Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <span>Text Analysis</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the URL of an article, blog post, or webpage to analyze
                </p>
              </div>
              <Button 
                onClick={() => handleAnalyze('url')} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze URL'}
              </Button>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Content</label>
                <Textarea
                  placeholder="Paste the text content you want to fact-check..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Paste social media posts, news claims, or any text content for analysis
                </p>
              </div>
              <Button 
                onClick={() => handleAnalyze('text')} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Example Checks */}
      <Card className="dashboard-card-effect">
        <CardHeader>
          <CardTitle>Try These Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => setUrl('https://example.com/fake-vaccine-claims')}
            >
              <div className="text-left">
                <div className="font-medium">Vaccine Misinformation</div>
                <div className="text-sm text-muted-foreground">Check false health claims</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => setText('Breaking: Scientists prove climate change is a hoax in new study')}
            >
              <div className="text-left">
                <div className="font-medium">Climate Misinformation</div>
                <div className="text-sm text-muted-foreground">Analyze climate denial claims</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dashboard-card-effect">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Claim Detection</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically identifies and extracts specific claims for verification
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card-effect">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Source Verification</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Cross-references claims with credible sources and fact-checkers
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card-effect">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Bias Analysis</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Detects potential bias and assesses overall content credibility
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};