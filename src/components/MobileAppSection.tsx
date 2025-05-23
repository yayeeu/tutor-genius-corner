
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const MobileAppSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

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
            id: crypto.randomUUID(), // Generate a UUID for the student record
            first_name: firstName,
            last_name: lastName || null,
            email: data.email,
          }
        ]);
      
      if (error) throw error;
      
      // Step 2: Call the edge function to send a notification email
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
      
      // Handle unique constraint violation
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

  return (
    <section className="py-20 bg-gradient-to-br from-tutor-orange/5 to-tutor-purple/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="max-w-lg">
              <div className="inline-block px-3 py-1 bg-white rounded-full shadow-sm mb-2">
                <span className="text-sm font-medium text-tutor-purple flex items-center">
                  <Bell className="h-4 w-4 mr-1" />
                  Coming Soon
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                EduNova Mobile App
              </h2>
              <p className="text-tutor-gray mb-6">
                Learn anywhere, anytime with our upcoming mobile app. Get instant access to your AI tutor, track your progress, and study on the go. Sign up now to be the first to know when it launches.
              </p>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Thank You!</h3>
                  <p className="text-sm text-tutor-gray">
                    We'll notify you as soon as our mobile app is available for download.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full primary-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Notify Me When Available"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-sm lg:max-w-md animate-float">
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
  );
};

export default MobileAppSection;
