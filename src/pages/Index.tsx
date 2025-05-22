
import { useState } from 'react';
import { Check, Star, Clock, Home, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  const toggleComplete = (id: number) => {
    setCompletedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const scheduleItems = [
    { id: 1, time: "7:00 AM", activity: "Wake up & brush teeth", type: "morning", icon: "🦷" },
    { id: 2, time: "7:30 AM", activity: "Get dressed", type: "morning", icon: "👕" },
    { id: 3, time: "8:00 AM", activity: "Breakfast", type: "morning", icon: "🥞" },
    { id: 4, time: "12:00 PM", activity: "Lunch", type: "afternoon", icon: "🥪" },
    { id: 5, time: "3:00 PM", activity: "Homework time", type: "afternoon", icon: "📚" },
    { id: 6, time: "6:00 PM", activity: "Dinner", type: "evening", icon: "🍽️" },
    { id: 7, time: "8:00 PM", activity: "Bath time", type: "evening", icon: "🛁" },
    { id: 8, time: "9:00 PM", activity: "Story time & sleep", type: "evening", icon: "📖" },
  ];

  const chores = [
    { id: 9, task: "Make bed", points: 5, icon: "🛏️", difficulty: "easy" },
    { id: 10, task: "Feed the pet", points: 10, icon: "🐕", difficulty: "easy" },
    { id: 11, task: "Put toys away", points: 5, icon: "🧸", difficulty: "easy" },
    { id: 12, task: "Help set table", points: 15, icon: "🍴", difficulty: "medium" },
    { id: 13, task: "Water plants", points: 10, icon: "🌱", difficulty: "medium" },
    { id: 14, task: "Take out trash", points: 20, icon: "🗑️", difficulty: "hard" },
  ];

  const completedCount = completedItems.length;
  const totalItems = scheduleItems.length + chores.length;
  const progressPercentage = (completedCount / totalItems) * 100;
  const earnedStars = Math.floor(completedCount / 3);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning! ☀️";
    if (hour < 17) return "Good Afternoon! 🌤️";
    return "Good Evening! 🌙";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {getTimeBasedGreeting()}
          </h1>
          <p className="text-lg text-gray-600">Let's have an awesome day!</p>
        </div>

        {/* Progress Card */}
        <Card className="p-6 bg-gradient-to-r from-yellow-200 to-orange-200 border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-orange-800">Today's Progress</h2>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < earnedStars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-4 mb-2" />
          <p className="text-orange-700 font-medium">
            {completedCount} of {totalItems} tasks completed! 
            {earnedStars > 0 && ` You earned ${earnedStars} star${earnedStars > 1 ? 's' : ''}! ⭐`}
          </p>
        </Card>

        {/* Today's Schedule */}
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-blue-800">Today's Schedule</h2>
          </div>
          <div className="space-y-3">
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  completedItems.includes(item.id)
                    ? 'bg-green-50 border-green-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => toggleComplete(item.id)}
              >
                <div className="text-2xl mr-3">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.time}
                  </div>
                  <p className={`font-medium ${
                    completedItems.includes(item.id) ? 'text-green-700 line-through' : 'text-gray-800'
                  }`}>
                    {item.activity}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  completedItems.includes(item.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}>
                  {completedItems.includes(item.id) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chores */}
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center mb-4">
            <Home className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-green-800">House Chores</h2>
          </div>
          <div className="space-y-3">
            {chores.map((chore) => (
              <div
                key={chore.id}
                className={`flex items-center p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  completedItems.includes(chore.id)
                    ? 'bg-green-50 border-green-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
                onClick={() => toggleComplete(chore.id)}
              >
                <div className="text-2xl mr-3">{chore.icon}</div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    completedItems.includes(chore.id) ? 'text-green-700 line-through' : 'text-gray-800'
                  }`}>
                    {chore.task}
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-1" />
                    {chore.points} points
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      chore.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      chore.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {chore.difficulty}
                    </span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  completedItems.includes(chore.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300'
                }`}>
                  {completedItems.includes(chore.id) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievement Message */}
        {completedCount > 0 && (
          <Card className="p-4 bg-gradient-to-r from-purple-200 to-pink-200 border-0 shadow-lg text-center">
            <p className="text-purple-800 font-bold text-lg">
              {completedCount >= totalItems ? "🎉 Amazing job! You completed everything!" :
               completedCount >= totalItems / 2 ? "🌟 You're doing great! Keep it up!" :
               "💪 Great start! You've got this!"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
