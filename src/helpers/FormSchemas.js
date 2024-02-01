import * as z from "zod";

// Register Schema
export const registerSchema = z
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

// Login Schema
export const loginSchema = z.object({
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

// Create Listing Schema
export const createListingSchema = z.object({
  name: z.string().min(1, {
    message: "Required",
  }),
  location: z.string().min(1, {
    message: "Required",
  }),
  type: z.string(),
  offer: z.boolean(),
  regularPrice: z.coerce.number(),
  discountedPrice: z.coerce.number(),
  parking: z.boolean(),
  furnitured: z.boolean(),
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  imageUrls: z
    .array(z.instanceof(File))
    .refine((data) => data.length >= 2 && data.length <= 6, {
      message: "Please provide at least 2 and up to 6 File objects.",
    })
    .refine(
      (data) =>
        Object.values(data).every((file) => file.type.startsWith("image/")),
      {
        message: "All files must be image files.",
      }
    ),
});
