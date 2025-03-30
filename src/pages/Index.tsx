
import { Link } from 'react-router-dom';
import { 
  Brain,
  ChevronRight,
  Sparkles,
  BookOpen,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const Home2 = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useAuth();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Split name into first and last name
      const [firstName, ...lastNameParts] = data.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      // Insert into students table instead of customers
      const { error } = await supabase
        .from('students')
        .insert([
          {
            first_name: firstName,
            last_name: lastName || null,
            email: data.email,
          }
        ]);
      
      if (error) throw error;
      
      const notifyResponse = await supabase.functions.invoke('notify-signup', {
        body: {
          name: data.name,
          email: data.email
        }
      });
      
      if (!notifyResponse.data?.success) {
        console.warn("Email notification might not have been sent:", notifyResponse.data);
      }
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You'll be notified when our mobile app launches.",
      });
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "Failed to submit. Please try again.";
      
      if (error.code === '23505') {
        errorMessage = "This email is already registered.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-tutor-light-orange/10 via-white to-tutor-light-purple/10">
      <section className="pt-8 pb-0 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-3/5 space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm mb-2">
                <span className="text-sm font-medium text-tutor-orange flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-yellow-400" />
                  Powered by AI, adaptive to your needs
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-tutor-orange to-tutor-purple">EduNova</span>
              </h1>
              
              <p className="text-lg text-tutor-gray">
                Your personal AI tutor that makes learning exciting and helps you master any subject at your own pace!
              </p>
              
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Button 
                    className="primary-button"
                    asChild
                  >
                    <Link to="/dashboard">
                      Start Learning
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    className="primary-button"
                    asChild
                  >
                    <Link to="/login">
                      Sign Up
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button 
                  className="secondary-button"
                  asChild
                >
                  <Link to="/chat-tutor">
                    Try Learn
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-tutor-light-purple/20 to-tutor-beige rounded-3xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-3">
                      Get ready for the next Exam
                    </h2>
                    <p className="text-tutor-gray mb-4">
                      Know your readiness for your next national exam and work toward your target score.
                    </p>
                    <Button 
                      className="primary-button"
                      asChild
                    >
                      <Link to="/screening">
                        Take Assessment
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative animate-float max-w-[180px]">
                      <img 
                        src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" 
                        alt="Exam Preparation" 
                        className="rounded-2xl shadow-md"
                      />
                      <div className="absolute -top-2 -left-2 bg-tutor-purple text-white p-2 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-xs font-medium">Exam Prep</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/5 flex justify-center animate-float">
              <div className="relative">
                <img 
                  src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" 
                  alt="AI Tutor" 
                  className="rounded-3xl shadow-xl max-w-[300px]"
                />
                <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-tutor-orange" />
                    <span className="text-sm font-medium">Smart Lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-r from-tutor-beige to-tutor-light-orange/20 rounded-3xl mx-6 my-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="max-w-lg">
                <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm mb-2">
                  <span className="text-sm font-medium text-tutor-purple flex items-center">
                    <Bell className="h-4 w-4 mr-1" />
                    Coming Soon
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  EduNova Mobile App
                </h2>
                <p className="text-tutor-gray mb-6">
                  Learn anywhere, anytime with our upcoming mobile app. Get access to your AI tutor, fun games, and cool quizzes!
                </p>
                
                {isSubmitted ? (
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">Thank You!</h3>
                      <p className="text-sm text-tutor-gray">
                        We'll send you a special message when our super cool app is ready!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Type your name here" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-tutor-purple hover:bg-tutor-light-purple text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Notify Me When Available"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
              <div className="relative max-w-[240px] animate-float">
                <img 
                  src="/lovable-uploads/eadc44bc-fbb9-439b-b523-a4b715f71510.png" 
                  alt="EduNova Mobile App Preview" 
                  className="w-full h-auto rounded-3xl shadow-xl"
                />
                <div className="absolute -top-3 -right-3 bg-tutor-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                  COMING SOON
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home2;
