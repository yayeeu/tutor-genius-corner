
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Products = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm mb-2">
          <span className="text-sm font-medium text-tutor-purple flex items-center justify-center">
            <Bell className="h-4 w-4 mr-1" />
            Coming Soon
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Our Educational Solutions
        </h1>
        <p className="text-tutor-gray text-lg max-w-3xl mx-auto">
          EduNova's unique differentiators include offline accessibility, AI-driven adaptation, 
          localized multi-language support, diaspora engagement, and integrated hardware and software solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {/* Mobile App Product Card */}
        <Card className="glass-card overflow-hidden transition-all hover:shadow-xl">
          <div className="relative h-64 overflow-hidden">
            <img 
              src="/lovable-uploads/eadc44bc-fbb9-439b-b523-a4b715f71510.png" 
              alt="EduNova Mobile App" 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-tutor-orange text-white text-xs font-bold px-3 py-1 rounded-full">
              BETA
            </div>
          </div>
          <CardHeader>
            <CardTitle>TutorGenius Mobile App</CardTitle>
            <CardDescription>Learn anywhere, anytime with our upcoming mobile app</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-tutor-dark-gray">
              Get instant access to your AI tutor, track your progress, and study on the go. 
              Available in Amharic, Afaan Oromo, and English.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-start">
                <span className="bg-tutor-orange/10 p-1 rounded mr-2 text-tutor-orange">✓</span>
                <span className="text-sm">AI-Driven Adaptation for personalized learning</span>
              </div>
              <div className="flex items-start">
                <span className="bg-tutor-orange/10 p-1 rounded mr-2 text-tutor-orange">✓</span>
                <span className="text-sm">Multi-Language Support (Amharic, Afaan Oromo, English)</span>
              </div>
              <div className="flex items-start">
                <span className="bg-tutor-orange/10 p-1 rounded mr-2 text-tutor-orange">✓</span>
                <span className="text-sm">Designed for Ethiopian curriculum</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full primary-button">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>

        {/* Offline Tablet Solution */}
        <Card className="glass-card overflow-hidden transition-all hover:shadow-xl">
          <div className="relative h-64 overflow-hidden">
            <img 
              src="/lovable-uploads/82b5b9a2-6cd1-42f2-9677-537d3477b332.png" 
              alt="Offline Tablet Solution" 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-tutor-purple text-white text-xs font-bold px-3 py-1 rounded-full">
              COMING SOON
            </div>
          </div>
          <CardHeader>
            <CardTitle>Offline Tablet Solution</CardTitle>
            <CardDescription>Dedicated Android-based educational tablets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-tutor-dark-gray">
              Our specialized Android-based tablets enable learning without internet connectivity,
              ideal for rural areas with limited infrastructure.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-start">
                <span className="bg-tutor-purple/10 p-1 rounded mr-2 text-tutor-purple">✓</span>
                <span className="text-sm">Complete offline accessibility</span>
              </div>
              <div className="flex items-start">
                <span className="bg-tutor-purple/10 p-1 rounded mr-2 text-tutor-purple">✓</span>
                <span className="text-sm">Preloaded educational content</span>
              </div>
              <div className="flex items-start">
                <span className="bg-tutor-purple/10 p-1 rounded mr-2 text-tutor-purple">✓</span>
                <span className="text-sm">Durable design for educational environments</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full secondary-button">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>

        {/* Offline School Server */}
        <Card className="glass-card overflow-hidden transition-all hover:shadow-xl">
          <div className="relative h-64 overflow-hidden">
            <img 
              src="/lovable-uploads/0f64557a-21be-4218-b46e-8ff786e0c272.png" 
              alt="Offline School Server" 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-tutor-navy text-white text-xs font-bold px-3 py-1 rounded-full">
              DEVELOPMENT
            </div>
          </div>
          <CardHeader>
            <CardTitle>Offline School Server</CardTitle>
            <CardDescription>Raspberry Pi-powered local server solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-tutor-dark-gray">
              Our Raspberry Pi-based local server enables device connectivity within schools,
              creating a mini educational network without internet dependency.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-start">
                <span className="bg-tutor-navy/10 p-1 rounded mr-2 text-tutor-navy">✓</span>
                <span className="text-sm">Local server for school-wide connectivity</span>
              </div>
              <div className="flex items-start">
                <span className="bg-tutor-navy/10 p-1 rounded mr-2 text-tutor-navy">✓</span>
                <span className="text-sm">Content updates via periodic synchronization</span>
              </div>
              <div className="flex items-start">
                <span className="bg-tutor-navy/10 p-1 rounded mr-2 text-tutor-navy">✓</span>
                <span className="text-sm">Supports multiple concurrent users</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-tutor-navy hover:bg-tutor-navy/80 text-white">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-tutor-orange/10 to-tutor-purple/10 rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              EduNova's Unique Differentiators
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-tutor-orange/20 p-2 rounded-full mr-3 text-tutor-orange mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-lg">Offline Accessibility</h3>
                  <p className="text-tutor-gray">Unlike global EdTech solutions requiring internet connectivity, EduNova operates entirely offline.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-tutor-orange/20 p-2 rounded-full mr-3 text-tutor-orange mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-lg">AI-Driven Adaptation</h3>
                  <p className="text-tutor-gray">Real-time learning customization enhances student engagement and retention.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-tutor-orange/20 p-2 rounded-full mr-3 text-tutor-orange mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-lg">Localized Multi-Language Support</h3>
                  <p className="text-tutor-gray">Content available in Amharic, Afaan Oromo, and English.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-tutor-orange/20 p-2 rounded-full mr-3 text-tutor-orange mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-lg">Diaspora Engagement</h3>
                  <p className="text-tutor-gray">Provides structured learning tools for Ethiopian families abroad seeking to preserve linguistic and cultural ties.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-tutor-orange/20 p-2 rounded-full mr-3 text-tutor-orange mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-lg">Hardware and Software Integration</h3>
                  <p className="text-tutor-gray">A dedicated Android-based tablet and Raspberry Pi-powered local server enable seamless implementation.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-xl mb-4 text-center">Ready to transform education?</h3>
            <p className="text-center text-tutor-gray mb-6">
              Join our waitlist to be the first to know when our products are available.
            </p>
            <Button className="w-full primary-button">Join Waitlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
