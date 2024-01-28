import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleIcon from "../../../assets/svg/googleIcon.svg";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/registerPage/RegisterForm";
import { FaHouseChimney } from "react-icons/fa6";

export default function Register() {
  return (
    <div className="bg-sky-800/30">
      <div className="container mx-auto h-screen px-1 md:px-8">
        <div className="grid place-items-center h-full">
          <Card className="mx-auto max-w-lg w-full py-10">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create an Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Register Form */}
              <RegisterForm />

              {/* Divider */}
              <div className="flex items-center">
                <span className="border-b flex-1"></span>
                <span className="px-4">Or</span>
                <span className="border-b flex-1"></span>
              </div>

              {/* Google OAuth */}
              <div className="grid place-items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="py-6 bg-transparent"
                >
                  <img src={GoogleIcon} alt="Google" className="h-8 w-8 mr-2" />{" "}
                  Sign Up With Google
                </Button>
              </div>
              <p className="text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-sky-600 font-bold">
                  Login
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
