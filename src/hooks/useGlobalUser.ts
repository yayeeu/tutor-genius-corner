
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Logger from '@/utils/logger';

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  grade_level?: number;
}

export const useGlobalUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async (): Promise<UserProfile | null> => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          return null;
        }

        const { data: profile, error } = await supabase
          .from('students')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        return profile;
      } catch (error) {
        Logger.error('Failed to fetch user profile', { error });
        toast({
          title: "Error",
          description: "Failed to load user profile. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });

  const invalidateUserData = () => {
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  };

  return {
    profile,
    isLoading,
    error,
    invalidateUserData
  };
};
