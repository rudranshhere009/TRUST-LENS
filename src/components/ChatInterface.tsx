import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, FileText, ExternalLink, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  citations?: { text: string; source: string }[];
}

const initialWelcomeMessage: Message = {
  id: '1',
  type: 'bot',
  content: "Hello! I'm your TrustLens AI assistant. I can help you understand legal documents, verify information, and answer questions about your uploaded content. To get started, you can upload a new document in the 'Documents' section or ask me about existing ones. What would you like to know?",
  timestamp: new Date(),
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
        }
      }
    }, 0);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponseContent = "I'm still learning, but I'll do my best to assist you. Can you please rephrase your question or provide more details?";
      const lowerCaseInput = userMessage.content.toLowerCase();

      if (lowerCaseInput.includes("hello")) {
        botResponseContent = "Hello there! How can I assist you today?";
      } else if (lowerCaseInput.includes("who are you")) {
        botResponseContent = "I am the TrustLens AI assistant, designed to help you with legal document analysis and to provide information on legal topics.";
      } else if (lowerCaseInput.includes("ok")) {
        botResponseContent = "Great! Is there anything else I can help you with?";
      } else if (lowerCaseInput.includes("legal") || lowerCaseInput.includes("document")) {
        botResponseContent = "I can help with legal questions and document analysis. Please upload a document or ask a specific question about legal terms.";
      } else if (lowerCaseInput.includes("app") || lowerCaseInput.includes("trustlens")) {
        botResponseContent = "TrustLens is an AI-powered platform for legal document analysis and misinformation detection. What would you like to know about the app?";
      } else if (lowerCaseInput.includes("indian laws") || lowerCaseInput.includes("laws in india")) {
        botResponseContent = `India's legal system is a blend of constitutional, statutory, and common law. A major recent change is the replacement of the colonial-era criminal codes with three new ones effective July 1, 2024:
*   **Bharatiya Nyaya Sanhita (BNS), 2023:** Replaces the Indian Penal Code (IPC).
*   **Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023:** Replaces the Code of Criminal Procedure (CrPC).
*   **Bharatiya Sakshya Adhiniyam (BSA), 2023:** Replaces the Indian Evidence Act.

The **Constitution of India** is the supreme law, guaranteeing fundamental rights like:
*   **Article 14:** Equality before the law.
*   **Article 19:** Freedom of speech and expression.
*   **Article 21:** Right to life and personal liberty.

Other key laws include:
*   **Consumer Protection Act, 2019:** Protects consumer rights.
*   **Right to Information Act, 2005 (RTI):** Empowers citizens to access information from public authorities.
*   **Information Technology Act, 2000:** Governs cybercrime and electronic transactions.

This is a brief overview. Which area of law would you like to know more about in detail: **Civil** or **Criminal**?`;
      } else if (lowerCaseInput.includes("criminal")) {
        botResponseContent = `**Criminal Law in India** has been significantly overhauled, effective July 1, 2024. The new framework aims to modernize the justice system.

**Core Statutes:**
*   **Bharatiya Nyaya Sanhita (BNS), 2023:** Defines offenses and punishments, replacing the IPC. Key changes include new offenses for organized crime, terrorism, and mob lynching. It also introduces community service for petty offenses.
*   **Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023:** Outlines the procedural aspects of criminal law, replacing the CrPC. It emphasizes the use of technology for trials and investigations, mandates forensic investigation for serious crimes, and sets timelines to expedite cases.
*   **Bharatiya Sakshya Adhiniyam (BSA), 2023:** Governs the rules of evidence, replacing the Indian Evidence Act. It notably expands the admissibility of electronic evidence.

**Key Stages of a Criminal Trial:**
1.  **FIR (First Information Report):** The process starts with the police registering an FIR.
2.  **Investigation:** Police gather evidence and may make arrests.
3.  **Charge Sheet:** A charge sheet is filed in court if there is sufficient evidence.
4.  **Trial:** The trial proceeds with the framing of charges, examination of witnesses, and final arguments.
5.  **Judgment:** The court delivers a judgment of acquittal or conviction.`;
      } else if (lowerCaseInput.includes("civil")) {
        botResponseContent = `**Civil Law in India** governs disputes between private individuals or organizations. The primary goal is to provide a remedy, such as compensation, rather than punishment.

**Core Statutes:**
*   **Code of Civil Procedure, 1908 (CPC):** Outlines the procedure for conducting civil suits.
*   **Indian Contract Act, 1872:** Governs the formation and enforcement of contracts.
*   **Transfer of Property Act, 1882:** Deals with the transfer of property between living persons.
*   **Personal Laws:** Matters like marriage, divorce, and inheritance are governed by personal laws specific to different religious communities (e.g., Hindu Marriage Act, 1955, Muslim Personal Law). The **Special Marriage Act, 1954** offers a secular alternative.

**Key Branches of Civil Law:**
*   **Contract Law:** Deals with agreements and their breaches.
*   **Property Law:** Governs ownership and transfer of property.
*   **Family Law:** Pertains to marriage, divorce, adoption, and inheritance.
*   **Law of Torts:** Addresses civil wrongs that cause harm or loss, such as negligence or defamation.

**Key Stages of a Civil Suit:**
1.  **Filing a Plaint:** The plaintiff initiates the suit by filing a complaint.
2.  **Summons:** The court issues a summons to the defendant.
3.  **Pleadings:** Both parties file their written statements.
4.  **Trial:** The court frames issues, and both parties present evidence.
5.  **Judgment and Decree:** The court delivers a judgment, followed by a formal decree.`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date(),
        citations: [] // No citations for simulated responses
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([initialWelcomeMessage]);
    setInput('');
    setIsLoading(false);
  };

  const handleClearChat = () => {
    setIsClearing(true);
    setMessages([]);
    setTimeout(() => {
      setMessages([initialWelcomeMessage]);
      setInput('');
      setIsClearing(false);
    }, 1000); // 1 second delay
  };

  return (
    <Card className="h-[600px] flex flex-col dashboard-card-effect">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>AI Legal Assistant</span>
          <Badge variant="secondary">Online</Badge>
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleNewChat}>New Chat</Button>
          <Button variant="outline" size="sm" onClick={handleClearChat} disabled={isClearing}>
            {isClearing ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Clear Chat"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex space-x-3",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 break-words",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.citations && (
                    <div className="mt-2 space-y-1">
                      {message.citations.map((citation, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <FileText className="h-3 w-3" />
                          <span>{citation.text}</span>
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-xs opacity-50 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            {isClearing && (
              <div className="flex justify-center items-center flex-1">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Clearing chat...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your documents..."
              disabled={isLoading || isClearing}
            />
            <Button onClick={handleSend} disabled={isLoading || isClearing || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
