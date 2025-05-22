
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Image, Paperclip, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Communication = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Mom', avatar: '👩', text: 'Don\'t forget to pick up Emma from soccer practice today!', time: '10:30 AM' },
    { id: 2, sender: 'Dad', avatar: '👨', text: 'I\'ll be home late tonight, meeting ran over.', time: '12:15 PM' },
    { id: 3, sender: 'Lily', avatar: '👧', text: 'Can someone bring my science book? I left it at home.', time: '1:45 PM' },
    { id: 4, sender: 'Michael', avatar: '👦', text: 'I\'m at Jake\'s house working on our project. Will be home by dinner.', time: '3:20 PM' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'Me',
        avatar: '👩',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto h-screen overflow-y-auto pb-20 relative shadow-2xl bg-white">
        {/* App Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white">
              <h1 className="text-xl font-bold">Syncly</h1>
            </Link>
          </div>
        </div>

        <div className="p-4">
          <Card className="border-0 shadow-md mb-4">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Family Chat</h2>
                <Button variant="ghost" size="icon">
                  <Users className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 h-[400px] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex mb-4 ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender !== 'Me' && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{msg.avatar}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[75%] ${msg.sender === 'Me' ? 'bg-indigo-500 text-white' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
                    {msg.sender !== 'Me' && (
                      <div className="font-medium text-xs mb-1">{msg.sender}</div>
                    )}
                    <p>{msg.text}</p>
                    <div className={`text-xs mt-1 text-right ${msg.sender === 'Me' ? 'text-indigo-100' : 'text-gray-500'}`}>{msg.time}</div>
                  </div>
                  {msg.sender === 'Me' && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarFallback>{msg.avatar}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5 text-gray-500" />
                </Button>
                <Input 
                  placeholder="Type a message..." 
                  className="flex-grow"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} variant="default" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-0 shadow-md mb-4">
            <h2 className="text-lg font-bold mb-3">Shared Documents</h2>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Permission slip - Field trip</p>
                  <p className="text-sm text-gray-500">PDF · Uploaded yesterday</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Soccer tournament schedule</p>
                  <p className="text-sm text-gray-500">PDF · Uploaded 3 days ago</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </Card>
          
          <Link to="/">
            <Button variant="outline" className="w-full">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Communication;
