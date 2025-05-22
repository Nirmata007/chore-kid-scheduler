import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Trash2, ListPlus, ShoppingCart, ChevronLeft, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  completed: boolean;
  addedBy: string;
  addedAt: string;
}

const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('active');
  const [activeCategories, setActiveCategories] = useState(['produce', 'dairy', 'meat', 'bakery', 'pantry', 'frozen', 'other']);
  const [editingCategory, setEditingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [currentUserName, setCurrentUserName] = useState('Mom'); // This would come from auth in a real app

  // Initialize with some sample items
  useEffect(() => {
    const sampleItems = [
      { id: 1, name: 'Milk', category: 'dairy', completed: false, addedBy: 'Mom', addedAt: new Date().toISOString() },
      { id: 2, name: 'Bread', category: 'bakery', completed: false, addedBy: 'Dad', addedAt: new Date().toISOString() },
      { id: 3, name: 'Apples', category: 'produce', completed: false, addedBy: 'Lily', addedAt: new Date().toISOString() },
      { id: 4, name: 'Cereal', category: 'pantry', completed: true, addedBy: 'Michael', addedAt: new Date(Date.now() - 86400000).toISOString() },
    ];
    
    // Check if we have items in localStorage
    const savedItems = localStorage.getItem('groceryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(sampleItems);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('groceryItems', JSON.stringify(items));
    }
  }, [items]);

  const addItem = () => {
    if (!newItem.trim()) return;
    
    const item: GroceryItem = {
      id: Date.now(),
      name: newItem.trim(),
      category: selectedCategory === 'all' ? 'other' : selectedCategory,
      completed: false,
      addedBy: currentUserName,
      addedAt: new Date().toISOString()
    };
    
    setItems([...items, item]);
    setNewItem('');
    
    toast({
      title: "Item Added",
      description: `${item.name} added to the grocery list.`
    });
  };

  const toggleComplete = (id: number) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item removed from the grocery list."
    });
  };

  const clearCompleted = () => {
    setItems(items.filter(item => !item.completed));
    toast({
      title: "Completed Items Cleared",
      description: "All completed items have been removed from the list."
    });
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;
    
    const category = newCategory.trim().toLowerCase();
    if (!activeCategories.includes(category)) {
      setActiveCategories([...activeCategories, category]);
      setNewCategory('');
      setEditingCategory(false);
      
      toast({
        title: "Category Added",
        description: `${category} added to categories.`
      });
    } else {
      toast({
        title: "Category Already Exists",
        variant: "destructive"
      });
    }
  };

  // Filter items based on selected category and tab
  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const statusMatch = selectedTab === 'all' || 
                       (selectedTab === 'active' && !item.completed) || 
                       (selectedTab === 'completed' && item.completed);
    return categoryMatch && statusMatch;
  });

  // Group items by category for display
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = acc[item.category] || [];
    category.push(item);
    acc[item.category] = category;
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  // Get sorted categories
  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto h-screen overflow-y-auto pb-20 relative shadow-2xl bg-white">
        {/* App Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white">
              <h1 className="text-xl font-bold">Syncly</h1>
            </Link>
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-4">
          <Card className="p-4 border-0 shadow-md mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Grocery List</h2>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="active">To Buy</TabsTrigger>
                  <TabsTrigger value="completed">Purchased</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Add Item Form */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add an item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="flex-grow"
              />
              <Button onClick={addItem} className="flex-shrink-0">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>

            {/* Category Selection */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm text-gray-700">Filter by Category</h3>
                <Button variant="ghost" size="sm" onClick={() => setEditingCategory(!editingCategory)}>
                  {editingCategory ? "Done" : "Edit"}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <Badge
                  className={`cursor-pointer ${selectedCategory === 'all' ? 'bg-indigo-600' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Badge>
                {activeCategories.map(category => (
                  <Badge
                    key={category}
                    className={`cursor-pointer ${selectedCategory === category ? 'bg-indigo-600' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    {editingCategory && (
                      <button
                        className="ml-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategories(activeCategories.filter(c => c !== category));
                        }}
                      >
                        &times;
                      </button>
                    )}
                  </Badge>
                ))}

                {editingCategory && (
                  <div className="flex items-center gap-1 mt-1 w-full">
                    <Input
                      placeholder="New category..."
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="text-sm py-1 px-2 h-8"
                    />
                    <Button size="sm" onClick={addCategory} className="h-8 py-0">Add</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Grocery Items */}
            <div className="space-y-6">
              {sortedCategories.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  {selectedTab === 'active' ? "No items to buy!" : 
                   selectedTab === 'completed' ? "No completed items yet." : 
                   "No items added yet."}
                </div>
              ) : (
                sortedCategories.map(category => (
                  <div key={category} className="space-y-2">
                    <h3 className="font-semibold text-gray-700 capitalize border-b pb-1">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {groupedItems[category].map(item => (
                        <div 
                          key={item.id} 
                          className={`flex items-center justify-between p-2 rounded-md border ${
                            item.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <Checkbox 
                              checked={item.completed} 
                              onCheckedChange={() => toggleComplete(item.id)}
                              className="mr-2"
                            />
                            <div>
                              <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                                {item.name}
                              </p>
                              <div className="text-xs text-gray-500">
                                Added by {item.addedBy} • {new Date(item.addedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            {filteredItems.some(item => item.completed) && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={clearCompleted}>
                  Clear Purchased Items
                </Button>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Button className="w-full flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save List
            </Button>
          </div>
        </div>

        {/* Bottom Navigation - reusing the same structure as other pages */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-md">
          <div className="flex items-center justify-around">
            <Link to="/" className="flex flex-col items-center py-3 px-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home w-5 h-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            
            <Link to="/calendar" className="flex flex-col items-center py-3 px-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days w-5 h-5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span className="text-xs mt-1">Calendar</span>
            </Link>
            
            <Link to="/groceries" className="flex flex-col items-center py-3 px-2 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-square w-5 h-5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
              <span className="text-xs mt-1">Add</span>
            </Link>
            
            <Link to="/communication" className="flex flex-col items-center py-3 px-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-5 h-5"><path d="m12 22c5.523 0 10-4.477 10-10S17.523 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 15c-1.38 0-2.5-1.12-2.5-2.5S10.62 10 12 10s2.5 1.12 2.5 2.5S13.38 15 12 15z"/></svg>
              <span className="text-xs mt-1">Chat</span>
            </Link>
            
            <Link to="/rewards" className="flex flex-col items-center py-3 px-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5"><path d="m12 17.27 8.152 4.73L19.69 11.692l5.29-4.73-7.257-1.055L12 2 8.824 5.907l-7.257 1.055 5.29 4.73-1.463 10.308z"/></svg>
              <span className="text-xs mt-1">Rewards</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
