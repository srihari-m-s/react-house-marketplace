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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

const formSchema = z.object({
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
});

export default function LoginForm() {
  const navigate = useNavigate();
  // Local state
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // console.log(values);
    const { email, password } = values;

    try {
      setLoading(true);
      const auth = getAuth();

      const loginResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const TOAST_DURATION = 2000;
      if (loginResponse.user) {
        toast.success("Login Successful!", { duration: TOAST_DURATION });
        setTimeout(() => {
          navigate("/profile");
        }, TOAST_DURATION);
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordClick() {
    setShowPass(!showPass);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
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
