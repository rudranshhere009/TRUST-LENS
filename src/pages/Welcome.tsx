import MatrixBackground from '../components/MatrixBackground';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';



const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden font-space-grotesk">
      <MatrixBackground />
      
      {/* Header - Sleek and minimal */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6 bg-transparent animate-slide-in-down animate-delay-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/favicon.ico" alt="TrustLens Logo" className="h-8 w-8 animate-slide-in-left animate-delay-200" />
            <span className="text-2xl font-bold text-green-400 tracking-wider animate-slide-in-left animate-delay-300">TrustLens</span>
          </div>
        </div>
      </header>

      {/* Centered Content - Futuristic and animated */}
      <main className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white p-4">
        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto rounded-xl bg-black/10 p-8 shadow-2xl shadow-green-500/30 backdrop-blur-xl border border-green-500/50 animate-fade-in animate-delay-400">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in-down text-shadow-neon animate-glitch animate-pulse-slow animate-delay-500">
            <span className="block text-green-400">
              Uncover Truth. Navigate Justice.
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-gray-300 animate-slide-in-right animate-delay-700">
            Welcome to TrustLens, your advanced AI co-pilot designed to cut through the noise of legal documents and combat misinformation.
            Analyze complex contracts, verify sources with unparalleled accuracy, and empower yourself with crystal-clear insights.
            We're here to ensure you navigate the legal landscape with absolute confidence and clarity.
          </p>
          <p className="mt-2 text-md md:text-lg text-green-300 animate-slide-in-left animate-delay-900">
            "Empowering clarity in a world of information."
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/signup')}
            className="mt-8 text-lg h-12 px-8 animate-fade-in-up animate-delay-1100
                       bg-green-600 hover:bg-green-700 text-white font-bold rounded-full
                       shadow-lg shadow-green-500/50 transition-all duration-300 ease-in-out
                       hover:scale-110 hover:shadow-2xl hover:shadow-green-500/80"
          >
            Get Started
          </Button>
        </div>

        {/* Placeholder for Feature Carousel */}
        <div className="absolute bottom-10 w-full max-w-5xl p-4 text-center animate-slide-in-up animate-delay-1300">
          <div className="text-green-400 text-sm tracking-widest animate-pulse">
            [ DYNAMIC FEATURE CAROUSEL AREA ]
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
