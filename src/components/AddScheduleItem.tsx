
import { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type ScheduleItemType = 'school' | 'daycare' | 'sports' | 'health' | 'chore' | 'other';

interface AddScheduleItemProps {
  onAddItem: (item: any) => void;
  defaultType?: ScheduleItemType;
  children?: React.ReactNode;
}

const AddScheduleItem = ({ onAddItem, defaultType = 'other', children }: AddScheduleItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    activity: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    location: '',
    child: '',
    category: defaultType,
    note: '',
    address: '',
    toBringItems: [] as { id: number; text: string; checked: boolean }[]
  });
  const [newToBringItem, setNewToBringItem] = useState('');

  const familyMembers = [
    { id: 1, name: "Alex", avatar: "👦", role: "child", age: 5 },
    { id: 2, name: "Emma", avatar: "👧", role: "child", age: 8 },
    { id: 3, name: "Michael", avatar: "👦", role: "child", age: 12 },
    { id: 4, name: "Lily", avatar: "👧", role: "child", age: 16 },
    { id: 5, name: "All", avatar: "👨‍👩‍👧‍👦", role: "all", age: 0 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToBringItem = () => {
    if (newToBringItem.trim()) {
      setFormData(prev => ({
        ...prev,
        toBringItems: [
          ...prev.toBringItems,
          { id: Date.now(), text: newToBringItem.trim(), checked: false }
        ]
      }));
      setNewToBringItem('');
    }
  };

  const handleToggleToBringItem = (id: number) => {
    setFormData(prev => ({
      ...prev,
      toBringItems: prev.toBringItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const handleRemoveToBringItem = (id: number) => {
    setFormData(prev => ({
      ...prev,
      toBringItems: prev.toBringItems.filter(item => item.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new item with a unique ID and the current form data
    const newItem = {
      id: Date.now(),
      ...formData,
      driveTime: '20 min', // Default value or could be calculated
    };
    
    onAddItem(newItem);
    
    toast({
      title: "Item Added",
      description: `${formData.activity} has been added to your schedule.`,
    });
    
    // Reset form and close dialog
    setFormData({
      activity: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '',
      location: '',
      child: '',
      category: defaultType,
      note: '',
      address: '',
      toBringItems: []
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Schedule Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activity" className="text-right">
                Activity
              </Label>
              <Input
                id="activity"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="child" className="text-right">
                Child
              </Label>
              <Select 
                value={formData.child} 
                onValueChange={(value) => handleSelectChange('child', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  {familyMembers.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      <div className="flex items-center">
                        <span className="mr-2">{member.avatar}</span>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange('category', value as ScheduleItemType)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="daycare">Daycare</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="chore">Chore</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="note" className="text-right pt-2">
                Notes
              </Label>
              <Textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            {/* To-Bring List */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                To Bring
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add item..."
                    value={newToBringItem}
                    onChange={(e) => setNewToBringItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddToBringItem())}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleAddToBringItem}
                  >
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2 mt-2">
                  {formData.toBringItems.map(item => (
                    <div key={item.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                      <Checkbox 
                        checked={item.checked}
                        onCheckedChange={() => handleToggleToBringItem(item.id)}
                        id={`item-${item.id}`}
                      />
                      <Label 
                        htmlFor={`item-${item.id}`}
                        className={`flex-grow ${item.checked ? 'line-through text-gray-500' : ''}`}
                      >
                        {item.text}
                      </Label>
                      <Button 
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveToBringItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add to Schedule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddScheduleItem;
