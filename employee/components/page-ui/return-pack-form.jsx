"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@nextui-org/react";
import toast from "react-hot-toast";

import useAuth from "../../app/hook/auth";
import useUserStore from "../../app/store/profile"; // Use only the components you need

// Define the Zod schema for validation
const returnPackSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .max(100, "Code must be less than 100 characters"),
});

export default function ReturnPackForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(returnPackSchema),
  });

  const { returnPack, success, error } = useAuth();
  const { user, fetchUser } = useUserStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (success) {
      toast.success(success);

      // After success, check if the user's pack is still active
      if (user?.pack?.status === "active") {
        setIsButtonDisabled(true);
      }
    } else if (error) {
      toast.error(error);
    }
  }, [success, error, user]);

  const onSubmit = async (data) => {
    try {
      // Replace with your API call
      await returnPack(data);
      reset();

      // Fetch user data again after submission to check pack status
      await fetchUser();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          {...register("code")}
          isRequired
          aria-invalid={errors.code ? "true" : "false"}
          label="Pack Code"
          placeholder="Enter the pack code"
        />
        {errors.code && (
          <span className="text-red-500">{errors.code.message}</span>
        )}
      </div>
      <Button
        className="w-[70%] rounded-none bg-black mt-2"
        color="primary"
        isDisabled={isButtonDisabled}
        type="submit"
      >
        Return Pack Request
      </Button>
    </form>
  );
}
