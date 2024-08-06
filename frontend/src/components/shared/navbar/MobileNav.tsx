import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { useAppSelector } from "@/stores/hooks";



const NavContent = () => {
  const location = useLocation();
  const pathname = location.pathname
  console.log("🚀 ~ NavContent ~ pathname:", pathname)
  return (<section className="flex h-full flex-col gap-6 pt-16">
    {sidebarLinks.map(item => {
      const isActive = item.route === pathname;
      return (<SheetClose asChild key={item.route} className="">
        <Link to={item.route} className={`${isActive ? 'text-light-900 primary-gradient rounded-lg' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4 `}>
          <img
            src={item.imgURL}
            className={`size-5  ${isActive ? '' : 'invert-colors'}`}

          />
          <span className={`${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</span>


        </Link>
      </SheetClose>)
    })

    }

  </section>
  )
}


function MobileNav() {
  const { currentUser } = useAppSelector(state => state.auth);




  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button >
          <img src="/assets/icons/hamburger.svg" alt="Menu" className="size-6 invert-colors sm:hidden" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none ">
        <Link to='/' className="flex items-center gap-2" >
          <img src='/assets/images/site-logo.svg' alt="StackOverFlow" className="size-[24px] " />
          <p className="h2-bold text-dark100_light900 ">Dev <span className="text-primary-500">Overflow</span></p>
        </Link>
        <div className="flex flex-col justify-between h-full ">
          <SheetClose asChild>
            <NavContent />

          </SheetClose>

          {
            !currentUser && (
              <div className="flex flex-col gap-3 mb-6">
                <SheetClose asChild>
                  <Link to='/auth/register'>
                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient"> Sign up</span>
                    </Button>
                  </Link>

                </SheetClose>
                <SheetClose asChild>
                  <Link to='/auth/login'>
                    <Button className="small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span> Sign in</span>
                    </Button>
                  </Link>

                </SheetClose>

              </div>
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )

}

export default MobileNav;