import { AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrustScore } from "./TrustScore";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  type: 'legal' | 'misinformation';
  data: any;
}

const mockLegalAnalysis = {
  trustScore: 72,
  summary: "This rental agreement contains mostly standard clauses with moderate tenant protection. Several areas require attention for risk mitigation.",
  keyFindings: [
    {
      type: 'risk',
      title: 'Deposit Terms',
      description: 'Security deposit return conditions are vague and may favor the landlord.',
      severity: 'medium'
    },
    {
      type: 'neutral',
      title: 'Lease Duration',
      description: 'Standard 12-month lease with reasonable renewal terms.',
      severity: 'low'
    },
    {
      type: 'positive',
      title: 'Maintenance Rights',
      description: 'Clear maintenance responsibilities protect tenant interests.',
      severity: 'low'
    }
  ],
  clauses: [
    {
      original: "The tenant shall be responsible for all damages exceeding normal wear and tear...",
      simplified: "You must pay for any damage beyond normal use of the apartment.",
      risk: "medium"
    }
  ]
};

const mockMisinfoAnalysis = {
  trustScore: 34,
  summary: "This article contains several unverified claims and misleading information. Multiple fact-check sources contradict key statements.",
  flaggedClaims: [
    {
      claim: "Vaccine effectiveness drops to 0% after 6 months",
      status: "False",
      sources: ["Reuters Fact Check", "AP Fact Check"],
      explanation: "Studies show vaccines maintain significant effectiveness beyond 6 months, though efficacy may decrease over time."
    }
  ],
  credibilityFactors: [
    { factor: "Source Credibility", score: 40, reason: "Mixed credibility indicators" },
    { factor: "Fact Verification", score: 20, reason: "Multiple unverified claims" },
    { factor: "Bias Detection", score: 50, reason: "Moderate editorial bias present" }
  ]
};

export const AnalysisResults = ({ type, data }: AnalysisResultsProps) => {
  const analysis = type === 'legal' ? mockLegalAnalysis : mockMisinfoAnalysis;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return AlertTriangle;
      case 'medium': return Info;
      case 'low': return CheckCircle;
      default: return Info;
    }
  };

  return (
    <div className="space-y-6">
      {/* Trust Score & Summary */}
      <Card className="dashboard-card-effect">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Analysis Complete
            <TrustScore score={analysis.trustScore} size="sm" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.summary}</p>
        </CardContent>
      </Card>

      {type === 'legal' && (
        <>
          {/* Key Findings */}
          <Card className="dashboard-card-effect">
            <CardHeader>
              <CardTitle>Key Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLegalAnalysis.keyFindings.map((finding, index) => {
                const Icon = getSeverityIcon(finding.severity);
                return (
                  <div key={index} className="flex space-x-3">
                    <Icon className={cn("h-5 w-5 mt-0.5", getSeverityColor(finding.severity))} />
                    <div className="flex-1">
                      <h4 className="font-medium">{finding.title}</h4>
                      <p className="text-sm text-muted-foreground">{finding.description}</p>
                    </div>
                    <Badge variant={finding.severity === 'high' ? 'destructive' : 'secondary'}>
                      {finding.severity}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Simplified Clauses */}
          <Card className="dashboard-card-effect">
            <CardHeader>
              <CardTitle>Plain Language Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {mockLegalAnalysis.clauses.map((clause, index) => (
                <div key={index} className="space-y-3">
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm font-mono">{clause.original}</p>
                  </div>
                  <div className="bg-accent p-3 rounded-md">
                    <p className="text-sm">{clause.simplified}</p>
                  </div>
                  {index < mockLegalAnalysis.clauses.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {type === 'misinformation' && (
        <>
          {/* Flagged Claims */}
          <Card className="dashboard-card-effect">
            <CardHeader>
              <CardTitle>Flagged Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockMisinfoAnalysis.flaggedClaims.map((claim, index) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{claim.claim}</h4>
                    <Badge variant="destructive">{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{claim.explanation}</p>
                  <div className="flex flex-wrap gap-2">
                    {claim.sources.map((source, idx) => (
                      <Button key={idx} variant="outline" size="sm" className="h-7 text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {source}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Credibility Factors */}
          {/* Credibility Analysis */}
          <Card className="dashboard-card-effect">
            <CardHeader>
              <CardTitle>Credibility Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockMisinfoAnalysis.credibilityFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{factor.factor}</p>
                    <p className="text-sm text-muted-foreground">{factor.reason}</p>
                  </div>
                  <TrustScore score={factor.score} size="sm" showLabel={false} />
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};