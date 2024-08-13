import { useEffect, useState, useCallback } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus } from "lucide-react";
import OrderTable from "@/components/page-ui/order-table";

// Define the Order type
interface Order {
    _id: string;
    orderId: string;
    user: string;
    vendor: { _id: string; name: string; location: string };
    meals: { mealName: string }[];
    quantity: number;
    status: string;
    totalPrice: number;
    imageUrl: string;
    createdAt: string;
    userName?: string;
}

interface AccordionCardProps {
    name: string;
    location: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        orders: Order[];
    }[];
    image: string;
}

export function AccordionCard({ name, location, user, image }: AccordionCardProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [newOrdersCount, setNewOrdersCount] = useState(0);

    // Memoized function to calculate new orders count
    const updateNewOrdersCount = useCallback(() => {
        const pendingOrdersCount = orders.reduce((count, order) =>
                count + (order.status === 'Pending' ? 1 : 0)
            , 0);

        setNewOrdersCount(pendingOrdersCount);
    }, [orders]);

    useEffect(() => {
        // Flatten users' orders and update local state
        const allOrders = user.flatMap(user => user.orders);
        setOrders(allOrders);
    }, [user]);

    useEffect(() => {
        updateNewOrdersCount();
    }, [orders, updateNewOrdersCount]);

    // Callback function to update order status
    const handleOrderStatusChange = (updatedOrder: Order) => {
        setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order =>
                order._id === updatedOrder._id ? updatedOrder : order
            );
            return updatedOrders;
        });
    };

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={name}>
                <AccordionTrigger>
                    <div className="flex items-center gap-3">
                        <img src={image} alt={name} width={50} />
                        <ul className="flex items-center">
                            <li>{name}</li>
                            <Minus size={20} strokeWidth={1} />
                            <li>{location}</li>
                        </ul>
                        {newOrdersCount > 0 && (
                            <span className="ml-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                                {newOrdersCount} New
                            </span>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <OrderTable users={user} onOrderStatusChange={handleOrderStatusChange} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
