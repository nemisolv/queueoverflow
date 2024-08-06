import Theme from "@/components/shared/Theme";
import MobileNav from "@/components/shared/navbar/MobileNav";
import { Link, useNavigate } from "react-router-dom";
import GlobalSearch from "@/components/shared/search/GlobalSearch";
import { useAppSelector } from "@/stores/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LogOut,
  Settings,
  User,
} from "lucide-react"
import { logOut } from "@/utils/authUtils";
import { useState } from "react";
import Setting from "@/pages/static/Setting";



function HeaderMainLayout() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [openSetting, setOpenSetting] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(navigate);
  }

  return (
    <header className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link to='/' className="flex items-center gap-2" >
        <img src='/assets/images/site-logo.svg' alt="StackOverFlow" className="size-[24px] " />
        <p className="h2-bold text-dark100_light900 max-sm:hidden">Queue <span className="text-primary-500">Overflow</span></p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5 ">
        <Theme />

        {currentUser && (
          <DropdownMenu  >
            <DropdownMenuTrigger  ><Avatar className=" size-10 "
            >
              <AvatarImage src={currentUser?.picture} alt="profile picture" className="rounded-full w-full h-full object-cover" />
              <AvatarFallback>
                {currentUser?.firstName[0]}
              </AvatarFallback>
            </Avatar></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align='end' hideWhenDetached >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(`/profile/${currentUser.id}`)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className='cursor-pointer'>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem className='cursor-pointer' onClick={() => setOpenSetting(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

              </DropdownMenuGroup>
              <DropdownMenuSeparator />



              <DropdownMenuItem className='cursor-pointer'
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span >Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>




        )}

        <div className="sm:hidden"><MobileNav /></div>

      </div>
      <Setting open={openSetting} setOpen={setOpenSetting} />
    </header>
  );
}
export default HeaderMainLayout;