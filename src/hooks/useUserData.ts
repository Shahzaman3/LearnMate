import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoadmap {
  id: string;
  user_id: string;
  title: string;
  goal: string;
  roadmap_data: any;
  progress: number;
  total_steps: number;
  completed_steps: number;
  difficulty: string | null;
  last_accessed: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  totalRoadmaps: number;
  completedSteps: number;
  currentStreak: number;
  averageScore: number;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalRoadmaps: 0,
    completedSteps: 0,
    currentStreak: 7, 
    averageScore: 85, 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

    
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      } else if (profileData) {
        setProfile(profileData);
      }

      
      const { data: roadmapsData, error: roadmapsError } = await supabase
        .from('user_roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('last_accessed', { ascending: false });

      if (roadmapsError) {
        console.error('Error fetching roadmaps:', roadmapsError);
      } else if (roadmapsData) {
        setRoadmaps(roadmapsData);
        
        
        const totalSteps = roadmapsData.reduce((sum, roadmap) => sum + roadmap.completed_steps, 0);
        setStats(prev => ({
          ...prev,
          totalRoadmaps: roadmapsData.length,
          completedSteps: totalSteps,
        }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRoadmap = async (title: string, goal: string, roadmapData: any, difficulty: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_roadmaps')
        .insert({
          user_id: user.id,
          title,
          goal,
          roadmap_data: roadmapData,
          total_steps: roadmapData.length,
          difficulty,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving roadmap:', error);
        throw error;
      }

      
      await fetchUserData();
      return data;
    } catch (error) {
      console.error('Error saving roadmap:', error);
      throw error;
    }
  };

  const updateRoadmapProgress = async (roadmapId: string, completedSteps: number, progress: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_roadmaps')
        .update({
          completed_steps: completedSteps,
          progress,
          last_accessed: new Date().toISOString(),
        })
        .eq('id', roadmapId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating roadmap progress:', error);
        throw error;
      }

      
      await fetchUserData();
    } catch (error) {
      console.error('Error updating roadmap progress:', error);
      throw error;
    }
  };

  return {
    profile,
    roadmaps,
    stats,
    loading,
    saveRoadmap,
    updateRoadmapProgress,
    refreshUserData: fetchUserData,
  };
};