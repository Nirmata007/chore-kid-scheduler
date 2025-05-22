
import { useState } from 'react';
import { Shield, MapPin, AlertCircle, Phone, Clock, Bell, Heart, Info, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Safety = () => {
  const [locationUpdates, setLocationUpdates] = useState([
    { id: 1, child: "Emma", location: "Lincoln Elementary School", status: "Arrived", time: "8:45 AM", icon: "🏫" },
    { id: 2, child: "Michael", location: "Oakwood Fields", status: "Arrived", time: "4:05 PM", icon: "⚽" },
    { id: 3, child: "Lily", location: "All-Star Gymnasium", status: "En route", time: "6:05 PM", icon: "🏆" }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "Dr. Smith", relation: "Pediatrician", phone: "(555) 123-4567", priority: "high" },
    { id: 2, name: "Jane Wilson", relation: "Neighbor", phone: "(555) 987-6543", priority: "medium" },
    { id: 3, name: "Grandma Beth", relation: "Family", phone: "(555) 456-7890", priority: "high" },
    { id: 4, name: "Poison Control", relation: "Emergency Services", phone: "(800) 222-1222", priority: "critical" }
  ]);
  
  const [safetyAlerts, setSafetyAlerts] = useState([
    { id: 1, title: "Weather Alert", description: "Thunderstorm warning in your area until 7 PM", severity: "medium", time: "2 hours ago" },
    { id: 2, title: "School Lockdown Drill", description: "Lincoln Elementary conducting drill tomorrow at 10 AM", severity: "low", time: "Yesterday" }
  ]);

  const [medicalInfo, setMedicalInfo] = useState([
    { id: 1, child: "Emma", info: "Peanut allergy - EpiPen in backpack", type: "allergy" },
    { id: 2, child: "Michael", info: "Asthma - Inhaler in sports bag", type: "condition" },
    { id: 3, child: "Alex", info: "No known allergies or conditions", type: "general" }
  ]);

  const callContact = (name: string) => {
    toast({
      title: `Calling ${name}`,
      description: "Initiating call...",
    });
  };

  const checkIn = (childId: number) => {
    setLocationUpdates(locationUpdates.map(update => 
      update.id === childId ? { ...update, status: "Checked in" } : update
    ));
    
    toast({
      title: "Check-in successful",
      description: `You've checked in on your child's location.`,
    });
  };

  return (
    <div className="p-4">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Safety Dashboard</h2>
          <p className="text-gray-600">Track locations, alerts, and emergency information</p>
        </div>
        
        {/* Location Tracking */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Location Updates</h3>
            </div>
            <Button variant="outline" size="sm">
              Refresh
            </Button>
          </div>
          <div className="space-y-3">
            {locationUpdates.map(update => (
              <div
                key={update.id}
                className={`flex items-start p-3 rounded-lg border-2 ${
                  update.status === "Arrived" 
                    ? 'bg-green-50 border-green-200' 
                    : update.status === "En route" 
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-xl mr-3">{update.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center text-sm mb-1">
                    <span className="font-medium">{update.child}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{update.time}</span>
                  </div>
                  <p className="font-medium text-gray-800">
                    {update.location}
                  </p>
                  <p className={`text-sm mt-1 font-medium ${
                    update.status === "Arrived" ? 'text-green-700' :
                    update.status === "En route" ? 'text-blue-700' :
                    'text-gray-700'
                  }`}>
                    Status: {update.status}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-shrink-0"
                  onClick={() => checkIn(update.id)}
                >
                  Check In
                </Button>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Emergency Contacts */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Emergency Contacts</h3>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Contact
            </Button>
          </div>
          <div className="space-y-3">
            {emergencyContacts.map(contact => (
              <div
                key={contact.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                  contact.priority === "critical" ? 'bg-red-50 border-red-200' :
                  contact.priority === "high" ? 'bg-orange-50 border-orange-200' :
                  'bg-white border-gray-200'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.relation} • {contact.phone}</p>
                </div>
                <Button 
                  variant={contact.priority === "critical" ? "destructive" : "outline"} 
                  size="sm"
                  onClick={() => callContact(contact.name)}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Safety Alerts */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center mb-3">
            <Bell className="w-5 h-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-800">Safety Alerts</h3>
          </div>
          <div className="space-y-3">
            {safetyAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg ${
                  alert.severity === "high" ? 'bg-red-50 border-l-4 border-red-400' : 
                  alert.severity === "medium" ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                  'bg-blue-50 border-l-4 border-blue-400'
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{alert.title}</span>
                  <span className="text-gray-500 text-xs">{alert.time}</span>
                </div>
                <p className="mt-1 text-sm">{alert.description}</p>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Medical Information */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Medical Information</h3>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Info
            </Button>
          </div>
          <div className="space-y-3">
            {medicalInfo.map(info => (
              <div
                key={info.id}
                className={`p-3 rounded-lg border-2 ${
                  info.type === "allergy" ? 'bg-red-50 border-red-200' :
                  info.type === "condition" ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center mb-1">
                  {info.type === "allergy" ? (
                    <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                  ) : info.type === "condition" ? (
                    <Info className="w-4 h-4 text-yellow-500 mr-1" />
                  ) : (
                    <Shield className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span className="font-medium">{info.child}</span>
                </div>
                <p className="text-sm">{info.info}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Safety;
