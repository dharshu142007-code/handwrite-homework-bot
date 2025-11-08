import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ShoppingCart, CreditCard, Wallet } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CollegeCanteenApp() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Breakfast
    { id: 1, name: "Poha", price: 30, category: "Breakfast", tags: ["vegetarian", "light"] },
    { id: 2, name: "Idli Sambar", price: 40, category: "Breakfast", tags: ["vegetarian", "south-indian"] },
    { id: 3, name: "Aloo Paratha", price: 50, category: "Breakfast", tags: ["vegetarian", "north-indian"] },
    { id: 4, name: "Upma", price: 35, category: "Breakfast", tags: ["vegetarian"] },
    { id: 5, name: "Masala Dosa", price: 60, category: "Breakfast", tags: ["vegetarian", "south-indian"] },
    
    // Lunch
    { id: 6, name: "Dal Rice", price: 70, category: "Lunch", tags: ["vegetarian", "combo"] },
    { id: 7, name: "Chole Bhature", price: 80, category: "Lunch", tags: ["vegetarian"] },
    { id: 8, name: "Paneer Butter Masala", price: 120, category: "Lunch", tags: ["vegetarian"] },
    { id: 9, name: "Veg Biryani", price: 100, category: "Lunch", tags: ["vegetarian", "rice"] },
    { id: 10, name: "Rajma Rice", price: 75, category: "Lunch", tags: ["vegetarian", "combo"] },
    
    // Dinner
    { id: 11, name: "Roti Sabzi", price: 60, category: "Dinner", tags: ["vegetarian"] },
    { id: 12, name: "Fried Rice", price: 90, category: "Dinner", tags: ["vegetarian", "chinese"] },
    { id: 13, name: "Palak Paneer", price: 110, category: "Dinner", tags: ["vegetarian"] },
    { id: 14, name: "Mix Veg Curry", price: 85, category: "Dinner", tags: ["vegetarian"] },
    
    // Snacks
    { id: 15, name: "Samosa", price: 15, category: "Snacks", tags: ["vegetarian", "fried"] },
    { id: 16, name: "Vada Pav", price: 20, category: "Snacks", tags: ["vegetarian"] },
    { id: 17, name: "Pakora", price: 25, category: "Snacks", tags: ["vegetarian", "fried"] },
    { id: 18, name: "Pav Bhaji", price: 70, category: "Snacks", tags: ["vegetarian"] },
    
    // Desserts
    { id: 19, name: "Gulab Jamun", price: 30, category: "Desserts", tags: ["sweet", "hot"] },
    { id: 20, name: "Ice Cream", price: 40, category: "Desserts", tags: ["sweet", "cold"] },
    { id: 21, name: "Kheer", price: 35, category: "Desserts", tags: ["sweet", "traditional"] },
    { id: 22, name: "Jalebi", price: 25, category: "Desserts", tags: ["sweet", "fried"] },
    { id: 23, name: "Rasgulla", price: 30, category: "Desserts", tags: ["sweet", "cold"] },
    
    // Beverages
    { id: 24, name: "Chai", price: 10, category: "Beverages", tags: ["hot"] },
    { id: 25, name: "Coffee", price: 15, category: "Beverages", tags: ["hot"] },
    { id: 26, name: "Lassi", price: 30, category: "Beverages", tags: ["cold", "sweet"] },
    { id: 27, name: "Cold Drink", price: 20, category: "Beverages", tags: ["cold"] },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { toast } = useToast();

  const categories = Array.from(new Set(menuItems.map((item) => item.category)));
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
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-foreground">College Canteen</h1>
            <p className="text-muted-foreground">Order your favorite food</p>
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

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary">{item.category}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                        <Button onClick={() => addToCart(item)} size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cart" className="space-y-4">
              {cart.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Your cart is empty
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div>
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
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                            <span className="font-bold w-20 text-right">
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

                  <Card className="bg-primary/5">
                    <CardContent className="flex items-center justify-between p-4">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
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
        <Card>
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

        <Card>
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
                  <Button onClick={onCloseEdit} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Click "Edit" on a menu item to modify it
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ₹{item.price} • {item.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(item.id)}
                  >
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
