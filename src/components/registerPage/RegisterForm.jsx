import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firbase.config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    fullname: z.string().min(1, {
      message: "Full Name is required",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(20, {
        message: "Password must be atmost 20 characters",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(20, {
        message: "Password must be atmost 20 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Both passwords should match.",
  });

export default function RegisterForm() {
  const navigate = useNavigate();
  // Local States
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values);
    const { email, password, fullname } = values;

    try {
      const auth = getAuth();
      // Create user in firebase authentication
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("created usercreds", userCredentials);
      // Get created user
      const user = userCredentials.user;
      // Update Profile
      updateProfile(auth.currentUser, {
        displayName: fullname,
      });

      // Save to firstore
      const userDetails = { ...values };
      delete userDetails.password;
      delete userDetails.confirmPassword;
      userDetails.createdAt = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), userDetails);

      navigate("/");
    } catch (error) {
      toast.error("Registration unsuccessful. Please try again!");
    }
  }

  function handlePasswordClick() {
    setShowPass(!showPass);
  }
  function handleConfirmPasswordClick() {
    setShowConfirmPass(!showConfirmPass);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        id="register-form"
        noValidate
      >
        {/* Fullname */}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="fullname" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="password"
                    type={showPass ? "text" : "password"}
                    {...field}
                    required
                  />
                </FormControl>
                <button
                  className="absolute right-0 top-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={handlePasswordClick}
                  type="button"
                >
                  {showPass ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="formItem">
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type={showConfirmPass ? "text" : "password"}
                    {...field}
                    required
                  />
                </FormControl>
                <button
                  className="absolute right-0 top-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={handleConfirmPasswordClick}
                  type="button"
                >
                  {showConfirmPass ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
