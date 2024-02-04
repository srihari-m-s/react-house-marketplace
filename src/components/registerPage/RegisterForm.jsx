import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { registerSchema } from "@/helpers/FormSchemas";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RegisterForm() {
  const navigate = useNavigate();
  // Local States
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(registerSchema),
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
      setLoading(true);
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

      const TOAST_DURATION = 2000;
      toast.success("Login Successful!", { duration: TOAST_DURATION });
      setTimeout(() => {
        navigate("/");
      }, TOAST_DURATION);
    } catch (error) {
      toast.error("Registration unsuccessful. Please try again!");
    } finally {
      setLoading(false);
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
                <Input placeholder="full name" {...field} required />
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="inline mr-2 h-4 w-4 animate-spin" />{" "}
              {"Please wait"}
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
