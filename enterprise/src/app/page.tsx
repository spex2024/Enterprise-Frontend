'use client';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  Users,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Header from '@/components/page/header';
import { useUserStore } from '@/store/profile';
import { useEffect } from 'react';

interface Meal {
  mealId: string;
  main?: string;
  protein?: string;
  sauce?: string;
  extras?: string[];
}

interface Order {
  orderId: string;
  vendor: Vendor; // Ensure Vendor type is defined
  meals: Meal[]; // Changed from meal to meals array
  status: string;
  createdAt: string; // Use ISO date string
  totalPrice: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface Vendor {
  _id: string;
  imageUrl?: string;
  code?: string;
  name: string;
  location: string;
  totalSales: number;
}

interface UserSub {
  orders: Order[];
}

interface User {
  imageUrl?: string;
  company?: string;
  orders?: Order[];
  vendors?: Vendor[];
  users?: UserSub[];
}

interface UserStore {
  user?: User;
  fetchUser: () => Promise<void>;
}

export default function Dashboard() {
  const { user, fetchUser } = useUserStore() as UserStore;

  useEffect(() => {

    fetchUser();
  }, [fetchUser]);

  // Flatten orders from all users
  const allOrders = user?.users?.flatMap(user => user.orders) || [];

  // Sort orders by date in descending order and limit to 5
  const orders = allOrders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

  const vendors = user?.vendors;

  return (
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allOrders.length}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.users?.length}</div>
                <p className="text-xs text-muted-foreground"></p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emission Saved</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12</div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Carbon Points</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Recent transactions by employees.</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href={'/orders'}>
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="">Meal</TableHead>
                      <TableHead className="">Status</TableHead>
                      <TableHead className="">Date</TableHead>
                      <TableHead className="">Amount</TableHead>
                      <TableHead className="">Ordered By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.orderId}>
                          <TableCell>
                            <div className="font-medium">{order.vendor.name}</div>
                            <div className="text-sm text-muted-foreground md:inline">{order.vendor.code}</div>
                          </TableCell>
                          <TableCell>
                            {order.meals.map((meal) => (
                                <div key={meal.mealId}>{meal.main || 'N/A'}</div>
                            ))}
                          </TableCell>
                          <TableCell>
                            <Badge className="text-xs" variant="outline">{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="">GH₵{order.totalPrice.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {order.user.firstName} {order.user.lastName}
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Vendors</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                {vendors?.map((vendor) => (
                    <div className="flex items-center gap-4" key={vendor._id}>
                      <Avatar className="hidden h-12 w-13 sm:flex">
                        <AvatarImage src={vendor.imageUrl} alt="Avatar" />
                        <AvatarFallback>{vendor.code}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">{vendor.location}</p>
                      </div>
                      <div className="ml-auto font-medium">
                        <p className="text-sm font-medium leading-none">GH₵ {vendor.totalSales}</p>
                        <p className="text-xs text-muted-foreground">Total Sales</p>
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  );
}
