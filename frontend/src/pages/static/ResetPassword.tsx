import InputPassword from "@/components/shared/InputPassword"
import { Button } from "@/components/ui/button"
import { Form,  FormField } from "@/components/ui/form"
import { resetPasswordSchema } from "@/lib/validation"
import AuthService from "@/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

function ResetPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    if(!token) navigate('/auth/forgot-password')

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        const resetPassword = async () => {
            try {
                setLoading(true);
                await AuthService.resetPassword({
                    newPassword: values.password,
                    token
                })
                toast.success('Password reset successfully')
                setTimeout(() => {
                    navigate('/auth/login')
                }, 2000)

            } catch (error: any) {
                console.log("🚀 ~ resetPassword ~ error:", error)
                toast.error(error.response.data.errors[0])
            } finally {
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
                        <img src='/assets/images/forgot-password.jpg' alt="Forgot password" className="w-[280px]" />
                    </div>
                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 flex-1">
                            <div className="flex gap-2">
                                <img src='/assets/images/site-logo.svg' alt="QueueOverFlow" className="size-[24px] " />
                                <p className="h2-bold text-dark100_light900 ">Queue <span className="text-primary-500">Overflow</span></p>
                            </div>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <InputPassword  label="Password" field={field} />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <InputPassword  label="Confirm Password" field={field} />
                                )} />
                            <Button className='w-full bg-primary-500 text-light-900' disabled={loading}>{
                                loading ? 'Loading...' : 'Reset Password'
                            }</Button>

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

export default ResetPassword