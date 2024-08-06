import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validation"
import { useState } from "react"
import { login } from "@/stores/slices/authSlice"
import {  useAppDispatch, useAppSelector } from "@/stores/hooks"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "@/configs"
export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { loading } = useAppSelector(state => state.auth)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
      
        dispatch(login({
            email: values.email,
            password: values.password,
            navigate,
            state: location.state
        }))
    }

    return <div className=" mx-auto  max-w-[500px] flex-center h-screen">
        <div className="  flex-col  background-light800_dark300 shadow-light100_dark100  py-6 px-8 rounded-lg dark:border-light-500 dark:border">
            <h2 className="h3-bold  text-center ">Sign in to QueueOverflow</h2>
            <p className="body-regular text-light400_light500 mt-2 text-center">
                Welcome back! Sign in to your account to continue
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

                    <div>
                        <FormDescription className="text-light400_light500 body-regular flex items-center justify-end">
                            Don't have an account? <Link to="/auth/register" className="text-primary-500 body-medium ml-2 hover:underline"> Sign up</Link>
                        </FormDescription>
                    </div>
                    <Button type="submit"
                        className='bg-primary-500 text-white w-full rounded-md py-2 hover:opacity-90 '
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>
            </Form>
            <Link to="/auth/forgot-password" className="hover:text-primary-500 body-medium ml-2 hover:underline float-right mt-3 text-light-500"> Reset your password</Link>

        </div>


    </div>
}