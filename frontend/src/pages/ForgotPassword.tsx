import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { forgotPasswordSchema } from "@/lib/validation"
import AuthService from "@/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

function ForgotPassword() {
    const [loading,setLoading] = useState(false)

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
       const resetPassword = async () => {
        try {
            setLoading(true);
            await AuthService.forgotPassword(values.email)
            toast.success("Password reset link has been sent to your email")
            
        }catch(error: any) {
        console.log("🚀 ~ resetPassword ~ error:", error)
        }finally{
            setLoading(false)
        }
       } 

         resetPassword()
       

    }

    return (
        <>
            <div className="shadown-lg  flex-center flex-col w-full h-screen ">
                
                <div className="w-full flex-center gap-5 mx-auto max-w-[800px]  px-4 background-light800_dark300 p-8 rounded-xl ">
                    <div>
                        <img src='/assets/images/forgot-password.jpg' alt="Forgot password" className="w-[280px]"  />
                    </div>
                    <Form {...form}>
                        
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 flex-1">
                <div className="flex gap-2">
                    <img src='/assets/images/site-logo.svg' alt="QueueOverFlow" className="size-[24px] " />
                    <p className="h2-bold text-dark100_light900 ">Queue <span className="text-primary-500">Overflow</span></p>
                </div>
                <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" paragraph-medium text-dark100_light900">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} className="no-focus paragraph-regular placeholder:body-regular   min-h-[46px] light-border-2 border  " {...field} />
                                </FormControl>

                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <Button className='w-full bg-primary-500 text-light-900'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Reset Password'}
                    </Button>

                        <div className="my-3 float-right text-sm ">
                            <Link to="/" className="text-primary !underline">
                                Back to home
                            </Link>
                        </div>
                    </form>
                </Form>
                        
                       
                </div>
            </div>
        </>
    )
}

export default ForgotPassword