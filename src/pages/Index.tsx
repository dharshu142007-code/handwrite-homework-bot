import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, ShoppingCart, CreditCard, Wallet, LogOut, Utensils } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';

// Import food images
import burgerImg from '@/assets/burger.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import friedChickenImg from '@/assets/fried-chicken.jpg';
import biryaniImg from '@/assets/biryani.jpg';
import friesImg from '@/assets/fries.jpg';
import pancakesImg from '@/assets/pancakes.jpg';
import sandwichImg from '@/assets/sandwich.jpg';
import noodlesImg from '@/assets/noodles.jpg';
import idliSambarImg from '@/assets/idli-sambar.jpg';
import dosaImg from '@/assets/dosa.jpg';
import pohaImg from '@/assets/poha.jpg';
import upmaImg from '@/assets/upma.jpg';
import parathaImg from '@/assets/paratha.jpg';
import dalRiceImg from '@/assets/dal-rice.jpg';
import choleBhatureImg from '@/assets/chole-bhature.jpg';
import rajmaRiceImg from '@/assets/rajma-rice.jpg';
import vegPulaoImg from '@/assets/veg-pulao.jpg';
import paneerButterMasalaImg from '@/assets/paneer-butter-masala.jpg';
import chapatiSabziImg from '@/assets/chapati-sabzi.jpg';
import khichdiImg from '@/assets/khichdi.jpg';
import mixVegCurryImg from '@/assets/mix-veg-curry.jpg';
import alooParathaImg from '@/assets/aloo-paratha.jpg';
import samosaImg from '@/assets/samosa.jpg';
import pakoraImg from '@/assets/pakora.jpg';
import breadOmeletteImg from '@/assets/bread-omelette.jpg';
import vadaPavImg from '@/assets/vada-pav.jpg';
import springRollsImg from '@/assets/spring-rolls.jpg';
import pastaImg from '@/assets/pasta.jpg';
import gulabJamunImg from '@/assets/gulab-jamun.jpg';
import iceCreamImg from '@/assets/ice-cream.jpg';
import kheerImg from '@/assets/kheer.jpg';
import jalebiImg from '@/assets/jalebi.jpg';
import brownieImg from '@/assets/brownie.jpg';
import teaImg from '@/assets/tea.jpg';
import coffeeImg from '@/assets/coffee.jpg';
import coldCoffeeImg from '@/assets/cold-coffee.jpg';
import juiceImg from '@/assets/juice.jpg';
import milkshakeImg from '@/assets/milkshake.jpg';
import fishCurryImg from '@/assets/fish-curry.jpg';
import butterChickenImg from '@/assets/butter-chicken.jpg';
import muttonCurryImg from '@/assets/mutton-curry.jpg';
import chickenWingsImg from '@/assets/chicken-wings.jpg';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  image?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CollegeCanteenApp() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Breakfast
    { id: 1, name: 'Idli Sambar', price: 40, category: 'Breakfast', tags: ['veg', 'south-indian'], image: idliSambarImg },
    { id: 2, name: 'Masala Dosa', price: 60, category: 'Breakfast', tags: ['veg', 'south-indian'], image: dosaImg },
    { id: 3, name: 'Poha', price: 35, category: 'Breakfast', tags: ['veg'], image: pohaImg },
    { id: 4, name: 'Aloo Paratha', price: 50, category: 'Breakfast', tags: ['veg', 'north-indian'], image: alooParathaImg },
    { id: 5, name: 'Upma', price: 40, category: 'Breakfast', tags: ['veg', 'south-indian'], image: upmaImg },
    { id: 6, name: 'Vada Pav', price: 30, category: 'Breakfast', tags: ['veg'], image: vadaPavImg },
    { id: 7, name: 'Paratha', price: 35, category: 'Breakfast', tags: ['veg', 'north-indian'], image: parathaImg },
    // Lunch
    { id: 8, name: 'Chicken Biryani', price: 150, category: 'Lunch', tags: ['non-veg', 'main-course'], image: biryaniImg },
    { id: 9, name: 'Chicken Pizza', price: 180, category: 'Lunch', tags: ['non-veg', 'fast-food'], image: pizzaImg },
    { id: 10, name: 'Chole Bhature', price: 80, category: 'Lunch', tags: ['veg', 'north-indian'], image: choleBhatureImg },
    { id: 11, name: 'Paneer Butter Masala', price: 120, category: 'Lunch', tags: ['veg', 'north-indian'], image: paneerButterMasalaImg },
    { id: 12, name: 'Rajma Chawal', price: 75, category: 'Lunch', tags: ['veg', 'north-indian'], image: rajmaRiceImg },
    { id: 13, name: 'Dal Rice', price: 70, category: 'Lunch', tags: ['veg', 'main-course'], image: dalRiceImg },
    { id: 14, name: 'Butter Chicken', price: 160, category: 'Lunch', tags: ['non-veg', 'north-indian'], image: butterChickenImg },
    // Dinner
    { id: 15, name: 'Chapati Sabzi', price: 60, category: 'Dinner', tags: ['veg'], image: chapatiSabziImg },
    { id: 16, name: 'Fish Curry', price: 140, category: 'Dinner', tags: ['non-veg', 'seafood'], image: fishCurryImg },
    { id: 17, name: 'Khichdi', price: 45, category: 'Dinner', tags: ['veg'], image: khichdiImg },
    { id: 18, name: 'Veg Pulao', price: 90, category: 'Dinner', tags: ['veg', 'main-course'], image: vegPulaoImg },
    { id: 19, name: 'Mix Veg Curry', price: 110, category: 'Dinner', tags: ['veg', 'north-indian'], image: mixVegCurryImg },
    { id: 20, name: 'Mutton Curry', price: 180, category: 'Dinner', tags: ['non-veg', 'main-course'], image: muttonCurryImg },
    // Snacks & Fast Food
    { id: 21, name: 'Chicken Burger', price: 100, category: 'Snacks', tags: ['non-veg', 'fast-food'], image: burgerImg },
    { id: 22, name: 'Fried Chicken', price: 130, category: 'Snacks', tags: ['non-veg', 'fast-food'], image: friedChickenImg },
    { id: 23, name: 'French Fries', price: 50, category: 'Snacks', tags: ['veg', 'snack'], image: friesImg },
    { id: 24, name: 'Grilled Sandwich', price: 60, category: 'Snacks', tags: ['veg', 'snack'], image: sandwichImg },
    { id: 25, name: 'Samosa', price: 20, category: 'Snacks', tags: ['veg', 'snack'], image: samosaImg },
    { id: 26, name: 'Pakora', price: 30, category: 'Snacks', tags: ['veg', 'snack'], image: pakoraImg },
    { id: 27, name: 'Spring Roll', price: 40, category: 'Snacks', tags: ['veg', 'snack'], image: springRollsImg },
    { id: 28, name: 'Chicken Wings', price: 120, category: 'Snacks', tags: ['non-veg', 'fast-food'], image: chickenWingsImg },
    { id: 44, name: 'Noodles', price: 70, category: 'Snacks', tags: ['veg', 'chinese'], image: noodlesImg },
    { id: 45, name: 'Pasta', price: 80, category: 'Snacks', tags: ['veg', 'italian'], image: pastaImg },
    { id: 46, name: 'Bread Omelette', price: 30, category: 'Snacks', tags: ['non-veg', 'snack'], image: breadOmeletteImg },
    // Desserts
    { id: 29, name: 'Gulab Jamun', price: 30, category: 'Desserts', tags: ['dessert', 'sweet'], image: gulabJamunImg },
    { id: 30, name: 'Ice Cream', price: 40, category: 'Desserts', tags: ['dessert', 'cold'], image: iceCreamImg },
    { id: 31, name: 'Pancakes', price: 60, category: 'Desserts', tags: ['dessert', 'sweet'], image: pancakesImg },
    { id: 32, name: 'Kheer', price: 35, category: 'Desserts', tags: ['dessert', 'sweet'], image: kheerImg },
    { id: 33, name: 'Chocolate Brownie', price: 60, category: 'Desserts', tags: ['dessert', 'sweet'], image: brownieImg },
    { id: 47, name: 'Jalebi', price: 25, category: 'Desserts', tags: ['dessert', 'sweet'], image: jalebiImg },
    // Beverages
    { id: 34, name: 'Chai', price: 15, category: 'Beverages', tags: ['beverage', 'hot'], image: teaImg },
    { id: 35, name: 'Coffee', price: 20, category: 'Beverages', tags: ['beverage', 'hot'], image: coffeeImg },
    { id: 36, name: 'Cold Coffee', price: 40, category: 'Beverages', tags: ['beverage', 'cold'], image: coldCoffeeImg },
    { id: 37, name: 'Milkshake', price: 50, category: 'Beverages', tags: ['beverage', 'cold'], image: milkshakeImg },
    { id: 38, name: 'Fresh Juice', price: 50, category: 'Beverages', tags: ['beverage', 'cold'], image: juiceImg },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  if (!user) {
    return null;
  }

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast({ title: "Added to cart", description: `${item.name} added successfully` });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast({ title: "Removed from cart" });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem = { ...item, id: Date.now() };
    setMenuItems((prev) => [...prev, newItem]);
    toast({ title: "Item added", description: `${item.name} added to menu` });
  };

  const updateMenuItem = (id: number, updates: Omit<MenuItem, "id">) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    setEditingItem(null);
    toast({ title: "Item updated" });
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    toast({ title: "Item deleted" });
  };

  const handlePlaceOrder = () => {
    setShowPaymentDialog(true);
  };

  const confirmOrder = () => {
    toast({ 
      title: "Order placed successfully!", 
      description: `Payment via ${paymentMethod.toUpperCase()}. Total: ₹${totalAmount}` 
    });
    setCart([]);
    setShowPaymentDialog(false);
  };

  return (
    <>
      <Helmet>
        <title>College Canteen - Order Food Online</title>
        <meta name="description" content="Order delicious food from your college canteen. Browse menu, add to cart, and manage orders easily." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-yellow-50 dark:from-gray-900 dark:via-background dark:to-gray-800">
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">College Canteen</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Fresh food, great taste!</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2" size="sm">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="cart">
                Cart ({cart.length})
              </TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="space-y-4">
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-2">
                    {item.image && (
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <CardDescription className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        ₹{item.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant={tag === 'non-veg' ? 'destructive' : 'outline'} 
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => addToCart(item)} size="sm" className="flex-1">
                          <ShoppingCart className="h-4 w-4 mr-1" /> Add
                        </Button>
                        <Button onClick={() => setEditingItem(item)} size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => deleteMenuItem(item.id)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cart" className="space-y-4">
              {cart.length === 0 ? (
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Your cart is empty</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <Card key={item.id} className="bg-card/80 backdrop-blur-sm">
                        <CardContent className="flex items-center justify-between p-4 gap-4">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-bold">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                            <span className="font-bold w-20 text-right text-primary">
                              ₹{item.price * item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 border-2">
                    <CardContent className="flex items-center justify-between p-6">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">₹{totalAmount}</span>
                    </CardContent>
                  </Card>

                  <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value="admin">
              <AdminPanel
                onAdd={addMenuItem}
                onUpdate={updateMenuItem}
                onDelete={deleteMenuItem}
                editingItem={editingItem}
                onEdit={setEditingItem}
                onCloseEdit={() => setEditingItem(null)}
                items={menuItems}
              />
            </TabsContent>
          </Tabs>
        </main>

        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Payment Method</DialogTitle>
              <DialogDescription>
                Choose how you'd like to pay for your order of ₹{totalAmount}
              </DialogDescription>
            </DialogHeader>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Wallet className="h-4 w-4" />
                  Cash on Delivery
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4" />
                  UPI Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4" />
                  Debit/Credit Card
                </Label>
              </div>
            </RadioGroup>
            <Button onClick={confirmOrder} className="w-full" size="lg">
              Confirm Order
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

function AdminPanel({
  onAdd,
  onUpdate,
  onDelete,
  editingItem,
  onEdit,
  onCloseEdit,
  items,
}: {
  onAdd: (item: Omit<MenuItem, "id">) => void;
  onUpdate: (id: number, updates: Omit<MenuItem, "id">) => void;
  onDelete: (id: number) => void;
  editingItem: MenuItem | null;
  onEdit: (item: MenuItem) => void;
  onCloseEdit: () => void;
  items: MenuItem[];
}) {
  const [form, setForm] = useState({ name: "", price: "", category: "", tags: "" });
  const { toast } = useToast();

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name,
        price: editingItem.price.toString(),
        category: editingItem.category,
        tags: editingItem.tags.join(", "),
      });
    } else {
      setForm({ name: "", price: "", category: "", tags: "" });
    }
  }, [editingItem]);

  const submitAdd = () => {
    if (!form.name || !form.price) {
      toast({ title: "Error", description: "Name and price are required", variant: "destructive" });
      return;
    }
    onAdd({
      name: form.name,
      price: Number(form.price),
      category: form.category || "Misc",
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    setForm({ name: "", price: "", category: "", tags: "" });
  };

  const submitUpdate = () => {
    if (!editingItem) return;
    onUpdate(editingItem.id, {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
            />
            <Input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
            />
            <Button onClick={submitAdd} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Edit Item</CardTitle>
          </CardHeader>
          <CardContent>
            {editingItem ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Editing: {editingItem.name}</p>
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                />
                <Input
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={submitUpdate} className="flex-1">
                    Save
                  </Button>
                  <Button onClick={onCloseEdit} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Edit className="h-12 w-12 mx-auto mb-2 opacity-50" />
                Click "Edit" on a menu item to modify it
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Menu Items ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">₹{item.price} • {item.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
