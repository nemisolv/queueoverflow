import { saveTokens } from "@/utils/authUtils";
import { useEffect } from "react"
import {  useNavigate, useSearchParams } from "react-router-dom"
import Cookies from 'js-cookie';
import UserService from "@/services/user.service";
import { useAppDispatch } from "@/stores/hooks";
import { loginSuccess } from "@/stores/slices/authSlice";

export default function OAuth2Redirect() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (token && refreshToken) {
            const handleLoginOauth2 = async () => {

                saveTokens(token, refreshToken);
                const response = await UserService.getFullInfoOfCurrentUser();
                Cookies.set('user', JSON.stringify(response.data));
                dispatch(loginSuccess(response.data))
                navigate('/');
            }
            handleLoginOauth2()
        }

    }, [])


    return <div
        className="flex-center h-screen"
    >
        <div
            className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light-500 dark:border-dark-500"
        >

        </div>


    </div>
}