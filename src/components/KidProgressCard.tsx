
import React from 'react';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface KidProgressCardProps {
  name: string;
  avatar: string;
  completedTasks: number;
  totalTasks: number;
  points: number;
}

const KidProgressCard: React.FC<KidProgressCardProps> = ({
  name,
  avatar,
  completedTasks,
  totalTasks,
  points
}) => {
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <Card className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-sm">
      <div className="flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback>{avatar}</AvatarFallback>
        </Avatar>
        <h4 className="font-medium text-gray-800">{name}</h4>
        <div className="ml-auto flex items-center">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm font-medium">{points}</span>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2 mb-1" />
      <p className="text-xs text-gray-600 text-right">
        {completedTasks} of {totalTasks} tasks
      </p>
    </Card>
  );
};

export default KidProgressCard;
