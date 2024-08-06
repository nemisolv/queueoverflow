import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/lib/validation"
import { useState } from "react"
import { register } from "@/stores/slices/authSlice"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { Link } from "react-router-dom"
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "@/configs"
export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.auth)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        },
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log(values)
        dispatch(register({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
        }))
    }


    return <div className=" mx-auto max-w-[500px] flex-center h-screen">
        <div className="  flex-col background-light800_dark300 shadow-light100_dark100  py-6 px-8 rounded-lg dark:border-light-500 dark:border">
            <h2 className="h3-bold  text-center     ">Sign up to QueueOverflow</h2>
            <p className="body-regular text-light400_light500 mt-2 text-center">
                Welcome back! Sign up to your account to continue
            </p>
            <div className="flex-between">
            <Button className="mt-6 body-medium ">
                    <Link to={GOOGLE_AUTH_URL} className="flex-center gap-2 shadow  py-2 px-4 hover:opacity-90 rounded-md  body-medium dark:light-border-2 dark:border dark:hover:primary-gradient  dark:bg-light-700 dark:text-dark-200 ">
                        <img src="/assets/images/google.png" alt="google" />
                        <span className="">Continue with Google</span>
                    </Link>
                </Button>
                <Button className="mt-6 body-medium ">
                    <Link to={GITHUB_AUTH_URL} className="flex-center gap-2 shadow  py-2 px-4 hover:opacity-90 rounded-md  body-medium dark:light-border-2 dark:border dark:hover:primary-gradient dark:bg-light-700 dark:text-dark-200">
                        <img src="/assets/images/github.png" alt="google" className="size-4" />
                        <span className="">Continue with Github</span>
                    </Link>
                </Button>
            </div>

            <div className='my-4 flex-between gap-3 '>
                <div className="h-[1px] bg-slate-200 w-full "></div>
                <span className="text-light400_light500 body-regular">OR</span>
                <div className="h-[1px] bg-slate-200 w-full "></div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                    <div className="flex-between gap-4 ">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" paragraph-medium">First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: John" {...field} className="no-focus paragraph-regular placeholder:body-regular   min-h-[46px] light-border-2 border  text-dark200_light700  " {...field} />
                                    </FormControl>

                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" paragraph-medium">Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex:Doe " {...field} className="no-focus paragraph-regular   min-h-[46px] light-border-2 border placeholder:body-regular    text-dark200_light700" {...field} />
                                    </FormControl>

                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>



                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" paragraph-medium">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} className="no-focus paragraph-regular placeholder:body-regular   min-h-[46px] light-border-2 border  text-dark200_light700" {...field} />
                                </FormControl>

                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" paragraph-medium">Password</FormLabel>
                                <FormControl >
                                    <div className="relative">
                                        <Input  {...field} type={showPassword ? 'text' : 'password'} className="no-focus paragraph-regular placeholder:body-regular    min-h-[46px] light-border-2 border  text-dark200_light700  transition-all transform pr-[40px]" />
                                        <img src={`/assets/icons/${showPassword ? 'eye' : 'eye-close'}.svg`} alt="" className="absolute top-2/4 right-[10px] -translate-y-2/4 transition-all transform" onClick={() => setShowPassword(!showPassword)} />
                                    </div>
                                </FormControl>

                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                        <p className=" text-light400_light500 body-regular  flex justify-end mt-4">Already have an account? &nbsp; <Link to='/auth/login' className='hover:underline text-primary-500'> Sign in</Link></p>
                    <Button type="submit"
                        className='bg-primary-500 text-white w-full rounded-md py-2 hover:opacity-90 '
                        disabled={loading}
                    >Register Now</Button>
                </form>
            </Form>


        </div>


    </div>
}