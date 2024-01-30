import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/loginPage/LoginForm";
import { Link } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";
import ForgotPassword from "@/components/loginPage/ForgotPassword";
import OAuth from "@/components/shared/OAuth/OAuth";

export default function Login() {
  return (
    <div className="bg-sky-800/30">
      <div className="container mx-auto h-screen px-1 md:px-8">
        <div className="grid place-items-center h-full">
          <Card className="mx-auto max-w-lg w-full py-10">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome Back!</CardTitle>
              <CardDescription>Let&apos;s Login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Login form */}
              <LoginForm />

              <ForgotPassword />

              {/* Divider */}
              <div className="flex items-center">
                <span className="border-b flex-1"></span>
                <span className="px-4">Or</span>
                <span className="border-b flex-1"></span>
              </div>

              {/* Google OAuth */}
              <OAuth />

              <p className="text-center">
                Don&apos;t have an account?{" "}
                <Link to={"/register"} className="text-sky-600 font-bold">
                  Register
                </Link>
              </p>
              <div className="w-fit mx-auto">
                <Link to={"/"} className="hover:text-primary">
                  <FaHouseChimney className="text-xl" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
