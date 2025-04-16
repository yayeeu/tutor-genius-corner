
import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const AchievementCard = ({ 
  icon: Icon, 
  title, 
  description, 
  progress 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  progress: number 
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-6 hover:shadow-lg transition-all">
    <div className="bg-aku-yellow/10 p-4 rounded-full">
      <Icon className="h-8 w-8 text-aku-yellow" />
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-aku-blue">{title}</h3>
      <p className="text-sm text-aku-blue/70 mb-2">{description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-aku-green h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const Achievements = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const achievements = [
    {
      icon: Trophy,
      title: t('achievements.learningStreak.title'),
      description: t('achievements.learningStreak.description'),
      progress: 75
    },
    {
      icon: Star,
      title: t('achievements.topicMastery.title'),
      description: t('achievements.topicMastery.description'),
      progress: 50
    },
    {
      icon: Target,
      title: t('achievements.goalProgress.title'),
      description: t('achievements.goalProgress.description'),
      progress: 30
    }
  ];

  return (
    <div className="min-h-screen bg-aku-cream/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-aku-blue">
          {t('achievements.title')}
        </h1>
        
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
