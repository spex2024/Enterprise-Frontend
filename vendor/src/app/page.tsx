'use client'

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from "@/components/main/header"
import { useVendor } from "@/app/store/vendor"
import useAuthStore from "@/app/store/authenticate";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

// Define types for the vendor and its associated data
interface Meal {
    main: string;
   price : number
}

interface User {
    firstName: string;
    lastName: string;
    agency: {
        company: string;
    };
}

interface Order {
    orderId: string;
    user: User;
    meals: Meal[];
    status: string;
    createdAt: string | number | Date;
    totalPrice: number;
}

interface Agency {
    _id: string;
    company: string;
    branch: string;
    imageUrl: string;
    users: {
        orders: any[];
    }[];
}

interface Vendor {
    orders?: Order[];
    meals?: Meal[];
    agencies?: Agency[];
    totalSales:number
}

export default function Dashboard() {
    const { vendor } = useVendor() as { vendor: Vendor };
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const totalSales = vendor.orders?.reduce((total, order) => {
        const orderTotal = order.meals.reduce((orderSum, meal) => orderSum + meal.price, 0);
        return total + orderTotal;
    }, 0) || 0;
    const agencies: Agency[] = vendor.agencies || [];
    const { orders } = vendor;
      console.log(vendor.orders)
    // Sort orders by createdAt in descending order and limit to the top 5
    const recentOrders = orders
        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, [isAuthenticated, router]);

    // Optionally, you can return a loading indicator while checking authentication
    if (!isAuthenticated) {
        return null
    }

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
                            <div className="text-2xl font-bold">{vendor.orders?.length}</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{vendor.meals?.length}</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">GH₵{vendor.totalSales}</div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Agencies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{vendor.agencies?.length}</div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Transactions</CardTitle>
                                <CardDescription>Recent transactions from your store.</CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <Link href={'/pages/orders'}>
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Meal</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders?.map((order) => (
                                        <TableRow key={order.orderId}>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {order.user?.firstName} {order.user?.lastName}
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    {order.user?.agency.company || 'N/A'}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {order.meals.map((meal, index) => (
                                                    <div key={index}>{meal.main || 'N/A'}</div>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className="text-xs" variant="outline">
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">GH₵{order.totalPrice.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Agencies</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            {agencies?.map((agency) => (
                                <div className="flex items-center gap-4" key={agency._id}>
                                    <Avatar className="hidden h-12 w-10 sm:flex">
                                        <AvatarImage src={agency.imageUrl} alt={agency.company} />
                                        <AvatarFallback>{agency.company.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">{agency.company}</p>
                                        <p className="text-sm text-muted-foreground">{agency.branch}</p>
                                    </div>
                                    <div className="ml-auto font-medium grid gap-1">
                                        <p className="text-md font-medium leading-none">
                                            {agency.users.reduce((total, user) => total + user.orders.length, 0)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Total Orders</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
