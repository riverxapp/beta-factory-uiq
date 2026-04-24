import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Coffee, Utensils, Wifi, Music } from "lucide-react"

const menuCategories = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      { name: "Bruschetta", price: 8.99, description: "Toasted bread with tomato, basil, and mozzarella" },
      { name: "Calamari", price: 10.99, description: "Crispy fried squid with marinara sauce" },
      { name: "Spinach Artichoke Dip", price: 9.99, description: "Creamy blend with tortilla chips" },
    ],
  },
  {
    id: "mains",
    name: "Main Courses",
    items: [
      { name: "Grilled Salmon", price: 18.99, description: "Atlantic salmon with lemon butter sauce" },
      { name: "Steak Frites", price: 24.99, description: "Ribeye steak with herb butter and fries" },
      { name: "Chicken Parmesan", price: 16.99, description: "Breaded chicken with marinara and mozzarella" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Tiramisu", price: 7.99, description: "Classic Italian coffee-flavored dessert" },
      { name: "Chocolate Lava Cake", price: 8.99, description: "Warm chocolate cake with vanilla ice cream" },
      { name: "Panna Cotta", price: 6.99, description: "Creamy vanilla custard with berry compote" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Espresso", price: 2.99, description: "Double shot of our house blend" },
      { name: "Fresh Juice", price: 4.99, description: "Seasonal fruit juice" },
      { name: "Craft Beer", price: 6.99, description: "Rotating selection of local brews" },
    ],
  },
]

const amenities = [
  { icon: Coffee, label: "Free Coffee" },
  { icon: Utensils, label: "Full Menu" },
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Music, label: "Live Music" },
]

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Our Menu
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our carefully crafted selection of dishes and drinks
        </p>
      </div>

      {/* Menu Categories */}
      <Tabs defaultValue="appetizers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {menuCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {menuCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {category.items.map((item) => (
                  <Card key={item.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <Badge variant="secondary">${item.price.toFixed(2)}</Badge>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      {/* Amenities */}
      <section className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">
          Amenities
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity) => (
            <Card key={amenity.label} className="text-center">
              <CardContent className="pt-6">
                <amenity.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                <p className="font-semibold">{amenity.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <p className="mb-6 text-lg text-muted-foreground">
          Ready to order? Visit us or call ahead for reservations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="lg" className="gap-2">
                Order Now <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Dine In</DropdownMenuItem>
              <DropdownMenuItem>Takeout</DropdownMenuItem>
              <DropdownMenuItem>Delivery</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="lg">
            Make a Reservation
          </Button>
        </div>
      </section>
    </div>
  )
}