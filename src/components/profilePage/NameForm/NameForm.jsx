import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firbase.config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullname: z.string().min(1, {
    message: "Fullname cannot be empty.",
  }),
});

export default function NameForm() {
  const auth = getAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: auth?.currentUser?.displayName,
    },
  });

  //   Local states
  const [editMode, setEditMode] = useState(false);

  function handleEditClick() {
    setEditMode((prev) => !prev);
  }

  async function updateFullname(values) {
    console.log(values);
    const { fullname } = values;

    try {
      if (auth.currentUser.displayName !== fullname) {
        // Update in firebase
        await updateProfile(auth.currentUser, {
          displayName: fullname,
        });

        // Update in firestore
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          fullname,
        });
        toast.success("Profile Updated");
      }
    } catch (error) {
      toast.error("Could not update Fullname. Please try again!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateFullname)} className="space-y-6">
        {/* Fullname */}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="formItem">
              <span className="flex items-center justify-between">
                <FormLabel className="text-xl">
                  {" "}
                  <FaUser className="inline mr-2 w-4 h-4" /> Full name
                </FormLabel>

                <Button
                  type={"submit"}
                  variant="outline"
                  className="rounded-full"
                  onClick={handleEditClick}
                  size="sm"
                >
                  <FaRegEdit className="mr-2 h-4 w-4" />
                  {editMode ? "Save" : "Edit"}
                </Button>
              </span>
              <FormControl>
                <Input
                  placeholder="fullname"
                  {...field}
                  disabled={!editMode}
                  className="text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <div className="space-y-2">
          <p className="text-xl m-0">
            <MdOutlineAlternateEmail className="mr-2 h4 w-4 inline" /> Email
          </p>
          <p className="border p-2 rounded m-0 text-lg">
            {auth?.currentUser?.email}
          </p>
        </div>
      </form>
    </Form>
  );
}
