
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would send an email
      // For now, we'll simulate the email sending process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-tutor-orange/10 to-transparent pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg text-tutor-gray mt-4 max-w-3xl mx-auto">
            Have questions or need help? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-tutor-light-gray">
            <div className="flex items-center justify-center w-12 h-12 bg-tutor-orange/10 rounded-full mb-6 mx-auto">
              <Mail className="h-6 w-6 text-tutor-orange" />
            </div>
            
            <h2 className="text-2xl font-semibold text-center mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject"
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-tutor-light-gray">
              <p className="text-tutor-gray text-center text-sm">
                You can also email us directly at{' '}
                <a 
                  href="mailto:contact@edunova.com" 
                  className="text-tutor-orange hover:underline"
                >
                  contact@edunova.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
