import { sidebarLinks } from "@/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { useAppSelector } from "@/stores/hooks";
import { LogOut } from "lucide-react";
import { logOut } from "@/utils/authUtils";
function LeftSidebar() {
    const location = useLocation();
    const pathname = location.pathname;
    const { currentUser } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    return <aside className="background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-24 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[300px]">
        <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map(item => {
                const isActive = item.route === pathname;
                if (item.route === '/profile') {
                    if (!currentUser) return null;
                    else {
                        item.route = `/profile/${currentUser.id}`
                    }
                }
                return (
                    <Link key={item.route} to={item.route} className={`${isActive ? 'text-light-900 primary-gradient rounded-lg' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4 `}>
                        <img
                            src={item.imgURL}
                            className={`size-5  ${isActive ? '' : 'invert-colors'}`}

                        />
                        <span className={`${isActive ? 'base-bold' : 'base-medium'}  max-lg:hidden`}>{item.label}</span>


                    </Link>)
            })

            }

        </section>

        {
            !currentUser && (
                <div className="flex flex-col gap-3 ">
                    <Link to='/auth/register'>
                        <Button className="small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                            <img src="/assets/icons/sign-up.svg" alt="" className="size-5 invert-colors lg:hidden " />
                            <span className="max-lg:hidden"> Sign up</span>
                        </Button>
                    </Link>

                    <Link to='/auth/login'>
                        <Button className="small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none
                        text-primary-500">
                            <img src="/assets/icons/account.svg" alt="" className="size-5 invert-colors lg:hidden " />
                            <span className="max-lg:hidden "> Sign in</span>
                        </Button>
                    </Link>


                </div>
            )
        }
        {
            currentUser && <Button className="small-medium text-dark400_light900 light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none " variant="destructive"
            onClick={() => {logOut(navigate)}}
            >
                <LogOut className="mr-2 h-4 w-4" />
                <span >Log out</span>
            </Button>
        }
    </aside>
}

export default LeftSidebar;