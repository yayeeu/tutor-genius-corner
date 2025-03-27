
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain,
  LineChart, 
  MessageSquare, 
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-tutor-orange/10 to-transparent pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">TutorGenius</span>
          </h1>
          <p className="text-lg text-tutor-gray mt-4 max-w-3xl mx-auto">
            Our mission is to make education accessible to every student in Ethiopia through personalized AI tutoring.
          </p>
        </div>
      </section>
      
      {/* Features Section - Moved from Index page */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">How Our AI Tutor Helps You Learn</h2>
            <p className="text-tutor-gray">
              Our intelligent tutoring system provides personalized support across all subjects, helping you understand concepts deeply and achieve your academic goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-tutor-light-gray hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tutor-orange/10 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-tutor-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat Anytime</h3>
              <p className="text-tutor-gray">
                Get instant answers to your questions through our conversational AI tutor that's available 24/7.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-tutor-light-gray hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tutor-orange/10 rounded-xl flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-tutor-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-tutor-gray">
                Our AI adapts to your unique learning style, focusing on areas where you need the most help.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-tutor-light-gray hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tutor-orange/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-tutor-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">All Subjects</h3>
              <p className="text-tutor-gray">
                From math and science to history and language arts, get expert help across all academic subjects.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-tutor-light-gray hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tutor-orange/10 rounded-xl flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-tutor-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-tutor-gray">
                Visualize your learning journey with detailed analytics and progress tracking for each subject.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-tutor-light-gray hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tutor-orange/10 rounded-xl flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-tutor-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Quizzes</h3>
              <p className="text-tutor-gray">
                Test your knowledge with quizzes that adapt to your skill level and provide instant feedback.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-tutor-light-gray hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-tutor-orange/10 rounded-xl flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6 text-tutor-orange"
                >
                  <path d="M12 2v5" />
                  <path d="M6 7h12" />
                  <path d="M17 22l-5-10-5 10" />
                  <path d="M3 14h18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Step-by-Step Solutions</h3>
              <p className="text-tutor-gray">
                Get detailed explanations for complex problems, helping you truly understand the material.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-tutor-beige">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community of Learners</h2>
          <p className="text-tutor-gray max-w-2xl mx-auto mb-8">
            Experience the future of education with our AI-powered tutoring platform designed for Ethiopian students.
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
