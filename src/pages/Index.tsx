import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { DocumentUpload } from "@/components/DocumentUpload";
import { MisinformationChecker } from "@/components/MisinformationChecker";
import { ChatInterface } from "@/components/ChatInterface";
import { EducationHub } from "@/components/EducationHub";
import { ProfilePage } from "@/components/ProfilePage";
import { SettingsPage } from "@/components/SettingsPage";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const initialTab = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      return savedProfile ? JSON.parse(savedProfile) : {
        name: 'Rudra',
        email: 'rudra@example.com',
        location: 'New Delhi, India',
        bio: 'AI enthusiast and legal-tech innovator.',
        photoUrl: ''
      };
    } catch (error) {
      return {
        name: 'Rudra',
        email: 'rudra@example.com',
        location: 'New Delhi, India',
        bio: 'AI enthusiast and legal-tech innovator.',
        photoUrl: ''
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    const tab = searchParams.get("tab") || "dashboard";
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleProfileUpdate = (newProfile: any) => {
    setUserProfile(newProfile);
  };

  const navigate = useNavigate(); // Added this line

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setUserProfile({ // Reset to default empty profile
      name: '',
      email: '',
      location: '',
      bio: '',
      photoUrl: ''
    });
    navigate('/'); // Redirect to WelcomePage
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'documents':
        return (
          <div className="space-y-6">
            <DocumentUpload />
          </div>
        );
      case 'misinformation':
        return <MisinformationChecker />;
      case 'chat':
        return (
          <div className="space-y-6">
            <ChatInterface />
          </div>
        );
      case 'education':
        return <EducationHub />;
      case 'profile':
        return <ProfilePage profile={userProfile} onSave={handleProfileUpdate} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'documents': return 'Document Analysis';
      case 'misinformation': return 'Fact Check';
      case 'chat': return 'AI Assistant';
      case 'education': return 'Education Hub';
      case 'profile': return 'User Profile';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b p-4 h-16 flex-shrink-0">
          <h1 className="text-xl font-bold tracking-tight">{getPageTitle()}</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-auto px-3 space-x-3">
                  <span className="text-right">
                    <div className="font-medium">Hi, {userProfile.name}</div>
                  </span>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userProfile.photoUrl} alt="User avatar" />
                    <AvatarFallback>{userProfile.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userProfile.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => handleTabChange('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleTabChange('settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;