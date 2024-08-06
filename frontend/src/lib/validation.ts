import {z} from "zod"
export const QuestionSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters long")
    .max(150, "Title must be at most 150 characters long"),
    explanation: z.string().min(30, "explanation must be at least 30 characters long"),
    tags: z.array(z.string().min(1,'Tag must be at least 1 character').max(15,'Tag too long, less than 16 characters')).nonempty("Please add at least one tag")
    .max(5, "You can add at most 5 tags"),
})

export const AnswerSchema = z.object({
    answer: z.string().min(10, "Answer must be at least 10 characters long")
})




export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters long")
}).refine(data => data.confirmPassword === data.password, {
  message: "Passwords do not match",
  path: ["confirmPassword"] // Specify which field the error message should appear on
});


export const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(2, "First name too short"),
    lastName: z.string().min(2, "Last name too short"),
})

export const userProfileSchema =z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    bio: z.string().max(200, "Bio must be at most 200 characters long"),
    location: z.string().max(50, "Location must be at most 50 characters long"),
    portfolioWebsite: z.string().url("Invalid URL"),
})

export const settingSchema = z.object({
    mfaEnabled: z.boolean(),
})