import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import VendorDetailsModal from "@/components/page-ui/vendor-modal";

interface Agency {
    name: string;
    initials: string;
    company: string;
}

interface Order {
    _id: string;
    orderId: string;
    totalPrice: number;
}

interface Vendor {
    _id: string;
    name: string;
    location: string;
    agencies: Agency[];
    imageUrl: string;
    code: string;
    owner: string;
    orders: Order[];
}

interface VendorTableProps {
    vendors: Vendor[];
}

export default function VendorTable({ vendors }: VendorTableProps) {
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleViewClick = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedVendor(null);
    };

    return (
        <div className="w-full p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Agencies</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Sales</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors.map((vendor) => (
                                <TableRow key={vendor._id}>
                                    <TableCell>
                                        <Image
                                            src={vendor.imageUrl}
                                            width={50}
                                            height={50}
                                            alt={`${vendor.name} Image`}
                                            className="object-cover rounded-lg"
                                        />
                                    </TableCell>
                                    <TableCell>{vendor.name}</TableCell>
                                    <TableCell>{vendor.location}</TableCell>
                                    <TableCell>{vendor.code}</TableCell>
                                    <TableCell>{vendor.owner}</TableCell>
                                    <TableCell>{vendor.agencies.length}</TableCell>
                                    <TableCell>{vendor.orders.length}</TableCell>
                                    <TableCell>${vendor.orders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleViewClick(vendor)}
                                                    >
                                                        <Eye size={20} strokeWidth={1.25} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    View details
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {selectedVendor && (
                <VendorDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    vendor={selectedVendor}
                />
            )}
        </div>
    );
}
