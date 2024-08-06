import AuthService from "@/services/auth.service";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    if (!token) {
        return <Navigate
            to="/auth/login" />
    }

    useEffect(() => {

        const verifyEmail = async () => {
            try {
                setLoading(true);
                await AuthService.verifyEmail(token)
                setSuccess(true);
                setMessage("Your email has been verified. You can now login to your account.")
            } catch (error: any) {
                console.log(error);
                setMessage("Verification link is invalid or expired. Please try again or request a new verification link.")
            } finally {
                setLoading(false);
            }
        }

        verifyEmail();

    }, [])





    return <div>

        {loading ? <div className="flex-center h-screen">
            <div className="flex-center flex-col">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-light800_dark300"></div>
                <p className="text-light900_dark100 mt-4">Verifying email...</p>

            </div>
        </div> : <div className="mx-auto max-w-[500px]  flex-center h-screen">
            <div className="flex-col background-light800_dark300 shadow-light100_dark100 py-6 px-8 rounded-lg dark:border-light-500 dark:border w-full">

                <CheckCircledIcon className={`size-20  mx-auto ${success ? 'text-green-400' : 'text-red-600'}`} />

                <h2 className="h3-bold text-dark200_light800 text-center mt-2">{
                    success ? "Email Verified" : "Email Verification Failed"
                }</h2>
                <p className="body-regular text-light400_light500 mt-2 text-center">
                    {message}
                </p>

                <Button className="text-white bg-primary-500 w-full mt-4 hover:opacity-90">
                    <Link to={success ? '/auth/login' : '/auth/register'}>
                        {success ? ' Discover QueueOverflow right now' : 'Try again'}
                    </Link>
                </Button>

            </div>
        </div>}


    </div>


}