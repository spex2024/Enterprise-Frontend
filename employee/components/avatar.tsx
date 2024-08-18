"use client";

import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUserStore from "@/app/store/profile";
import useAuth from "@/app/hook/auth";

export default function ProfileAvatar() {
  const { user, fetchUser } = useUserStore();
  const { logout, success, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${user?.imageUrl}`,
            }}
            className="transition-transform"
            description={user?.code}
            name={`${user?.firstName} ${user?.lastName}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2 flex w-full">
            <p className="font-bold">Agency: {user?.agency.company}</p>
            <p className="font-bold text-xs">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="user">Profile</DropdownItem>
          <DropdownItem key="orders">Orders</DropdownItem>
          <DropdownItem key="settings">Reset Password</DropdownItem>

          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
