
import { useState } from 'react';
import { Heart, Clock, Calendar, AlertCircle, Pill, Activity, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const Health = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: "Allergy Medication", person: "Michael", time: "8:00 AM", taken: false, dosage: "1 tablet", frequency: "Daily" },
    { id: 2, name: "Vitamins", person: "Emma", time: "9:00 AM", taken: true, dosage: "1 tablet", frequency: "Daily" },
    { id: 3, name: "Antibiotics", person: "Alex", time: "12:00 PM", taken: false, dosage: "1 teaspoon", frequency: "Twice daily", endDate: "May 28, 2025" }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, type: "Pediatrician", person: "All children", date: "June 2, 2025", time: "2:30 PM", location: "Dr. Smith's Office", address: "123 Medical Center Dr", notes: "Annual check-up" },
    { id: 2, type: "Dentist", person: "Emma & Michael", date: "June 15, 2025", time: "10:00 AM", location: "Family Dental", address: "456 Smile Ave", notes: "Regular cleaning" },
    { id: 3, type: "Eye Doctor", person: "Lily", date: "July 10, 2025", time: "3:45 PM", location: "Vision Care Center", address: "789 Sight Blvd", notes: "Vision test" }
  ]);
  
  const toggleMedication = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
    
    toast({
      title: "Medication status updated",
      description: "The medication status has been updated successfully."
    });
  };

  const calculateHealthProgress = () => {
    const takenCount = medications.filter(med => med.taken).length;
    return (takenCount / medications.length) * 100;
  };

  return (
    <div className="p-4">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Health Dashboard</h2>
          <p className="text-gray-600">Track medications, appointments, and wellness</p>
        </div>
        
        {/* Progress Card */}
        <Card className="p-4 bg-gradient-to-r from-red-100 to-pink-100 border-0 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-red-800">Today's Medications</h3>
            <div className="flex items-center space-x-1">
              <Pill className="w-5 h-5 text-red-500" />
              <span className="font-medium">{medications.filter(med => med.taken).length} of {medications.length} taken</span>
            </div>
          </div>
          <Progress value={calculateHealthProgress()} className="h-3 mb-2" />
          <p className="text-red-700 text-sm font-medium">
            {calculateHealthProgress() === 100 ? "All medications taken today!" : "Some medications still need to be taken"}
          </p>
        </Card>

        {/* Medications */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Pill className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Medications</h3>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Medication
            </Button>
          </div>
          <div className="space-y-3">
            {medications.map(med => (
              <div 
                key={med.id}
                className={`flex items-start p-3 rounded-lg border-2 transition-all duration-200 ${
                  med.taken ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{med.time}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{med.person}</span>
                  </div>
                  <p className={`font-medium ${med.taken ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                    {med.name} - {med.dosage}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {med.frequency} {med.endDate && `until ${med.endDate}`}
                  </p>
                </div>
                <button
                  onClick={() => toggleMedication(med.id)}
                  className={`ml-2 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    med.taken ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}
                >
                  {med.taken && <Heart className="w-4 h-4 text-white" />}
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Appointments */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Appointment
            </Button>
          </div>
          <div className="space-y-3">
            {appointments.map(apt => (
              <div
                key={apt.id}
                className="p-3 rounded-lg border-2 border-gray-200 bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{apt.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{apt.time}</span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {apt.type} - {apt.person}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {apt.location}, {apt.address}
                    </p>
                    {apt.notes && (
                      <p className="text-sm bg-blue-50 p-1.5 mt-2 rounded-md text-blue-800">
                        {apt.notes}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Health Metrics */}
        <Card className="p-4 border-0 shadow-md">
          <div className="flex items-center mb-3">
            <Activity className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-800">Health Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 border border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Sleep Tracking</p>
                <p className="text-2xl font-bold text-purple-700">7.5 hrs</p>
                <p className="text-xs text-gray-500">Family Average</p>
              </div>
            </Card>
            <Card className="p-3 border border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Activity</p>
                <p className="text-2xl font-bold text-green-700">8,500</p>
                <p className="text-xs text-gray-500">Avg. Steps</p>
              </div>
            </Card>
            <Card className="p-3 border border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Water</p>
                <p className="text-2xl font-bold text-blue-700">5 cups</p>
                <p className="text-xs text-gray-500">Today's Intake</p>
              </div>
            </Card>
            <Card className="p-3 border border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Mood</p>
                <p className="text-2xl font-bold text-yellow-700">😊</p>
                <p className="text-xs text-gray-500">Family Mood</p>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Health;
