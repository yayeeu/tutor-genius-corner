
import { Link } from 'react-router-dom';
import { 
  Brain,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileAppSection from '@/components/MobileAppSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-tutor-orange/10 to-transparent pt-10 pb-20">
        <div className="hero-section">
          <div className="hero-content">
            <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm mb-2">
              <span className="text-sm font-medium text-tutor-orange">
                Personalized Learning
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Your Personal <span className="gradient-text">AI Tutor</span>
            </h1>
            <p className="text-lg text-tutor-gray mt-4">
              Experience personalized education with our AI tutor that adapts to your learning style, answers questions in real-time, and helps you master any subject at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                className="primary-button"
                asChild
              >
                <Link to="/login">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                className="secondary-button"
                asChild
              >
                <Link to="/screening">
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hero-image-container">
            <img 
              src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" 
              alt="AI Tutor" 
              className="rounded-2xl w-full h-auto object-cover shadow-lg animate-float"
            />
            <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-tutor-orange" />
                <span className="text-sm font-medium">Adapts to your learning style</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile App Section */}
      <MobileAppSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-tutor-beige">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-tutor-gray max-w-2xl mx-auto mb-8">
            Join thousands of students who are achieving their academic goals with our AI tutor. Get started today with our free assessment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="primary-button"
              asChild
            >
              <Link to="/login">
                Sign Up Now
              </Link>
            </Button>
            <Button 
              className="secondary-button"
              asChild
            >
              <Link to="/chat-tutor">
                Try AI Tutor
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-tutor-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-8 h-8 bg-tutor-orange rounded-lg flex items-center justify-center mr-2">
                <span className="font-bold text-white">AI</span>
              </div>
              <span className="font-bold text-xl text-tutor-dark-gray">EduNova</span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-tutor-gray hover:text-tutor-orange transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-tutor-gray hover:text-tutor-orange transition-colors">
                About
              </Link>
              <Link to="/login" className="text-tutor-gray hover:text-tutor-orange transition-colors">
                Login
              </Link>
              <Link to="/screening" className="text-tutor-gray hover:text-tutor-orange transition-colors">
                Assessment
              </Link>
              <Link to="/chat-tutor" className="text-tutor-gray hover:text-tutor-orange transition-colors">
                AI Tutor
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-tutor-light-gray text-center text-tutor-gray text-sm">
            &copy; {new Date().getFullYear()} EduNova. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
