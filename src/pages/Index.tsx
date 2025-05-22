import { useState, useEffect } from 'react';
import { Check, Star, Clock, Home, Calendar, Book, Backpack, Trophy, Bell, Menu, X, ChevronRight, MapPin, Cloud, Sun, Plus, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import AddScheduleItem from '@/components/AddScheduleItem';
import { Link } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(125);
  const [showWeeklyView, setShowWeeklyView] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([
    { 
      id: 1, 
      time: "10:00 AM", 
      activity: "Daycare end-of-year party", 
      location: "Little Sprouts Daycare",
      child: "Alex",
      category: "daycare",
      note: "Bring cupcakes (24 count)",
      points: 10,
      icon: "🧁",
      address: "123 Sprout Avenue",
      driveTime: "15 min" 
    },
    { 
      id: 2, 
      time: "12:00 PM", 
      activity: "School field trip", 
      location: "Natural History Museum",
      child: "Emma",
      category: "school",
      note: "Submit permission slip!",
      points: 10,
      icon: "🏛️",
      address: "455 Museum Drive",
      driveTime: "25 min" 
    },
    { 
      id: 3, 
      time: "4:00 PM", 
      activity: "Soccer practice", 
      location: "Oakwood Fields",
      child: "Michael",
      category: "sports",
      note: "Bring water bottle and cleats",
      points: 15,
      icon: "⚽",
      address: "789 Oakwood Park Road",
      driveTime: "20 min" 
    },
    { 
      id: 4, 
      time: "6:15 PM", 
      activity: "Cheer practice", 
      location: "All-Star Gymnasium",
      child: "Lily",
      category: "sports",
      note: "Pickup at entrance B",
      points: 15,
      icon: "📣",
      address: "321 All-Star Boulevard",
      driveTime: "35 min" 
    },
  ]);

  const chores = [
    { id: 5, task: "Make beds", assignee: "Michael & Emma", points: 5, icon: "🛏️", category: "home", priority: "medium", rescheduled: false },
    { id: 6, task: "Feed the dog", assignee: "Alex", points: 10, icon: "🐕", category: "home", priority: "high", rescheduled: false },
    { id: 7, task: "Put toys away", assignee: "Lily", points: 5, icon: "🧸", category: "home", priority: "medium", rescheduled: false },
    { id: 8, task: "Mow the lawn", assignee: "Dad", points: 20, icon: "🌿", category: "home", priority: "low", rescheduled: true, rescheduleReason: "Rain forecasted" },
  ];

  const upcomingEvents = [
    { id: 9, date: "Monday", activity: "Dentist appointment - Michael", time: "3:30 PM", category: "health" },
    { id: 10, date: "Tuesday", activity: "Ballet class - Lily", time: "5:00 PM", category: "sports" },
    { id: 11, date: "Wednesday", activity: "Parent-Teacher Conference - Emma", time: "4:00 PM", category: "school" },
    { id: 12, date: "Friday", activity: "Family Movie Night", time: "7:30 PM", category: "home" },
  ];

  const notifications = [
    { id: 13, message: "Permission slip due tomorrow for Emma's field trip", source: "Lincoln Elementary", time: "2 hours ago", urgent: true },
    { id: 14, message: "Soccer game location changed to Memorial Field", source: "Youth Soccer League", time: "Yesterday", urgent: false },
    { id: 15, message: "Daycare closed next Monday for staff training", source: "Little Sprouts Daycare", time: "Yesterday", urgent: true },
  ];

  const rewards = [
    { id: 16, name: "Ice Cream Treat", points: 50, icon: "🍦" },
    { id: 17, name: "Movie Night", points: 100, icon: "🎬" },
    { id: 18, name: "Extra Screen Time (30 min)", points: 75, icon: "📱" },
    { id: 19, name: "Trip to the Zoo", points: 200, icon: "🦁" },
  ];

  const handleAddScheduleItem = (newItem: any) => {
    setScheduleItems(prev => [...prev, {
      ...newItem,
      points: 10, // Default points
      icon: getIconForCategory(newItem.category),
    }]);
  };

  const getIconForCategory = (category: string): string => {
    switch(category) {
      case 'school': return "🏫";
      case 'daycare': return "🧸";
      case 'sports': return "⚽";
      case 'health': return "💊";
      case 'chore': return "🧹";
      default: return "📝";
    }
  };

  const toggleComplete = (id: number, points: number = 0) => {
    const newCompletedItems = completedItems.includes(id) 
      ? completedItems.filter(item => item !== id)
      : [...completedItems, id];
    
    setCompletedItems(newCompletedItems);

    // Add points only when completing (not uncompleting)
    if (!completedItems.includes(id)) {
      setEarnedPoints(prev => prev + points);
      toast({
        title: "Task Completed!",
        description: points > 0 ? `You earned ${points} points!` : "Great job keeping on schedule!",
      });
    } else {
      // Remove points when marking as incomplete
      setEarnedPoints(prev => Math.max(0, prev - points));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'school': return <Book className="w-5 h-5 text-blue-500" />;
      case 'daycare': return <Backpack className="w-5 h-5 text-purple-500" />;
      case 'sports': return <Trophy className="w-5 h-5 text-green-500" />;
      case 'home': return <Home className="w-5 h-5 text-orange-500" />;
      case 'health': return <span className="text-red-500 text-xl">🏥</span>;
      default: return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const completedCount = completedItems.length;
  const totalDailyItems = scheduleItems.length + chores.length;
  const progressPercentage = (completedCount / totalDailyItems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Mobile frame for visual effect */}
      <div className="max-w-md mx-auto h-screen overflow-y-auto pb-20 relative shadow-2xl bg-white">
        {/* App Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mr-3 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-bold">FamilySync</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6" />
              <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 mr-1" />
                <span className="text-sm font-medium">{earnedPoints}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsMenuOpen(false)}>
            <div className="bg-white h-full w-64 shadow-xl p-4" onClick={e => e.stopPropagation()}>
              <div className="flex flex-col h-full">
                <div className="mb-6 mt-2">
                  <h2 className="text-2xl font-bold text-indigo-700">FamilySync</h2>
                  <p className="text-gray-500 text-sm">Family Management Made Easy</p>
                </div>
                
                <nav className="space-y-1">
                  {['dashboard', 'school', 'daycare', 'sports', 'home', 'health', 'safety', 'rewards'].map((item) => (
                    <button
                      key={item}
                      className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                        activeTab === item 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setActiveTab(item);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item === 'dashboard' && <Calendar className="w-5 h-5 mr-3" />}
                      {item === 'school' && <Book className="w-5 h-5 mr-3" />}
                      {item === 'daycare' && <Backpack className="w-5 h-5 mr-3" />}
                      {item === 'sports' && <Trophy className="w-5 h-5 mr-3" />}
                      {item === 'home' && <Home className="w-5 h-5 mr-3" />}
                      {item === 'health' && <Heart className="w-5 h-5 mr-3" />}
                      {item === 'safety' && <Shield className="w-5 h-5 mr-3" />}
                      {item === 'rewards' && <Star className="w-5 h-5 mr-3" />}
                      <span className="capitalize">{item}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-auto mb-4">
                  <button className="flex items-center text-gray-700 hover:text-indigo-600">
                    <span className="mr-2">Settings</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-indigo-600 mt-2">
                    <span className="mr-2">Help & Support</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4">
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Date & View Toggle */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{getTimeBasedGreeting()}</h2>
                  <p className="text-gray-600">{formatDate(currentDate)}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowWeeklyView(!showWeeklyView)}
                >
                  {showWeeklyView ? "Daily View" : "Weekly View"}
                </Button>
              </div>
              
              {/* Progress Card */}
              <Card className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 border-0 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-indigo-800">Today's Progress</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{earnedPoints} points</span>
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-3 mb-2" />
                <p className="text-indigo-700 text-sm font-medium">
                  {completedCount} of {totalDailyItems} tasks completed
                </p>
              </Card>

              {/* Notifications Card */}
              <Card className="p-4 border-0 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
                  <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                </div>
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg text-sm ${
                        notification.urgent ? 'bg-red-50 border-l-4 border-red-400' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{notification.source}</span>
                        <span className="text-gray-500 text-xs">{notification.time}</span>
                      </div>
                      <p className="mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Daily Schedule or Weekly Overview */}
              {showWeeklyView ? (
                <Card className="p-4 border-0 shadow-md">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-800">Weekly Overview</h3>
                  </div>
                  <div className="space-y-3">
                    {upcomingEvents.map(event => (
                      <div
                        key={event.id}
                        className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-200"
                      >
                        <div className="flex-shrink-0 mr-3">
                          {getCategoryIcon(event.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <span className="font-medium mr-2">{event.date}</span>
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{event.time}</span>
                          </div>
                          <p className="font-medium text-gray-800">
                            {event.activity}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                <Card className="p-4 border-0 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-800">Today's Schedule</h3>
                    </div>
                    <AddScheduleItem onAddItem={handleAddScheduleItem}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Event
                      </Button>
                    </AddScheduleItem>
                  </div>
                  <div className="space-y-3">
                    {scheduleItems.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-start p-3 rounded-lg border-2 transition-all duration-200 ${
                          completedItems.includes(item.id)
                            ? 'bg-green-50 border-green-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex-shrink-0 mr-3 mt-1">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{item.time}</span>
                            <span className="mx-2">•</span>
                            <span className="font-medium">{item.child}</span>
                          </div>
                          <p className={`font-medium ${
                            completedItems.includes(item.id) ? 'text-green-700 line-through' : 'text-gray-800'
                          }`}>
                            {item.activity}
                          </p>
                          <div className="flex items-start text-sm text-gray-600 mt-1">
                            <MapPin className="w-3 h-3 mr-1 mt-0.5" />
                            <div>
                              <p>{item.location}</p>
                              <p className="text-xs">{item.driveTime} drive</p>
                            </div>
                          </div>
                          {item.note && (
                            <div className="mt-2 text-sm bg-yellow-50 p-1.5 rounded-md text-yellow-800">
                              {item.note}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => toggleComplete(item.id, item.points)}
                          className={`ml-2 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            completedItems.includes(item.id)
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedItems.includes(item.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Home Chores */}
              <Card className="p-4 border-0 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Home className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-800">Home Chores</h3>
                  </div>
                  <AddScheduleItem onAddItem={handleAddScheduleItem} defaultType="chore">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Chore
                    </Button>
                  </AddScheduleItem>
                </div>
                <div className="space-y-3">
                  {chores.map(chore => (
                    <div
                      key={chore.id}
                      className={`flex items-start p-3 rounded-lg border-2 transition-all duration-200 ${
                        chore.rescheduled ? 'bg-blue-50 border-blue-200' :
                        completedItems.includes(chore.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="text-xl mr-3 flex-shrink-0">{chore.icon}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-1">
                          <span className="font-medium mr-2">{chore.assignee}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            chore.priority === 'high' ? 'bg-red-100 text-red-700' :
                            chore.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {chore.priority}
                          </span>
                        </div>
                        <p className={`font-medium ${
                          chore.rescheduled ? 'text-blue-700' :
                          completedItems.includes(chore.id) ? 'text-green-700 line-through' : 'text-gray-800'
                        }`}>
                          {chore.task}
                        </p>
                        {chore.rescheduled && (
                          <div className="mt-1 text-sm flex items-center text-blue-700">
                            <Cloud className="w-3 h-3 mr-1" />
                            <span>{chore.rescheduleReason} - Moved to Saturday</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center ml-2">
                        <div className="flex items-center mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-xs font-medium">{chore.points}</span>
                        </div>
                        {!chore.rescheduled && (
                          <button
                            onClick={() => toggleComplete(chore.id, chore.points)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              completedItems.includes(chore.id)
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {completedItems.includes(chore.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Assistant Insights */}
              <Card className="p-4 border-0 shadow-md bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-center mb-3">
                  <div className="text-purple-600 text-xl mr-2">🤖</div>
                  <h3 className="text-lg font-bold text-purple-800">AI Assistant Insights</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white border border-purple-200">
                    <div className="flex items-start">
                      <Cloud className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-800">Weather Alert</p>
                        <p className="text-sm text-gray-600">Rain forecasted tomorrow. "Mow the lawn" has been rescheduled to Saturday.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-purple-200">
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-800">Schedule Conflict</p>
                        <p className="text-sm text-gray-600">Travel time between soccer and cheer practice is tight. Consider leaving soccer 15 minutes early.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Health Tab */}
          {activeTab === 'health' && (
            <div className="mt-2">
              <Link to="/health">
                <Button className="w-full mb-4">Go to Health Dashboard</Button>
              </Link>
              <p className="text-center text-gray-600">
                Track medications, appointments, and wellness information for your family.
              </p>
            </div>
          )}

          {/* Safety Tab */}
          {activeTab === 'safety' && (
            <div className="mt-2">
              <Link to="/safety">
                <Button className="w-full mb-4">Go to Safety Dashboard</Button>
              </Link>
              <p className="text-center text-gray-600">
                Track locations, alerts, and emergency information for your family.
              </p>
            </div>
          )}

          {/* Rewards View */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Rewards</h2>
                <p className="text-gray-600">Earn points by completing tasks and activities</p>
              </div>
              
              <Card className="p-4 bg-gradient-to-r from-yellow-100 to-amber-100 border-0 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-amber-800">Your Points</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-xl">{earnedPoints}</span>
                  </div>
                </div>
                <p className="text-amber-700 text-sm">Keep completing tasks to earn more points!</p>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                {rewards.map(reward => (
                  <Card 
                    key={reward.id} 
                    className={`p-4 border-0 shadow-md text-center hover:shadow-lg transition-shadow ${
                      earnedPoints >= reward.points ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{reward.icon}</div>
                    <h4 className="font-bold text-gray-800">{reward.name}</h4>
                    <div className="flex items-center justify-center mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{reward.points} points</span>
                    </div>
                    <Button 
                      className="mt-3 w-full"
                      variant={earnedPoints >= reward.points ? "default" : "outline"}
                      disabled={earnedPoints < reward.points}
                    >
                      {earnedPoints >= reward.points ? "Redeem" : "Locked"}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Other tabs - School, Daycare, Sports, Home would be implemented similarly */}
          {(activeTab === 'school' || activeTab === 'daycare' || activeTab === 'sports' || activeTab === 'home') && (
            <div className="h-full flex flex-col items-center justify-center py-10 text-center">
              <div className="text-6xl mb-4">
                {activeTab === 'school' && "📚"}
                {activeTab === 'daycare' && "🧸"}
                {activeTab === 'sports' && "⚽"}
                {activeTab === 'home' && "🏠"}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{activeTab}</h2>
              <p className="text-gray-600 max-w-xs">
                This section would contain detailed information about your {activeTab} activities and schedules.
              </p>
            </div>
          )}
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-md">
          <div className="flex items-center justify-around">
            {['dashboard', 'school', 'daycare', 'sports', 'home', 'health', 'safety'].map((item) => (
              <button
                key={item}
                className={`flex flex-col items-center py-3 px-2 ${
                  activeTab === item ? 'text-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(item)}
              >
                {item === 'dashboard' && <Calendar className="w-5 h-5" />}
                {item === 'school' && <Book className="w-5 h-5" />}
                {item === 'daycare' && <Backpack className="w-5 h-5" />}
                {item === 'sports' && <Trophy className="w-5 h-5" />}
                {item === 'home' && <Home className="w-5 h-5" />}
                {item === 'health' && <Heart className="w-5 h-5" />}
                {item === 'safety' && <Shield className="w-5 h-5" />}
                <span className="text-xs mt-1 capitalize">{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
