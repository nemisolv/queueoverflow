import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { RightSidebar } from "@/components/shared/RightSidebar";
import { Button } from "@/components/ui/button";

import {ArrowLeftIcon} from '@radix-ui/react-icons'

function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    return <div
        className="background-light850_dark100 relative"
    >

        <Navbar />

        <main
            className="flex"
        >
            <LeftSidebar/>
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
                {location.pathname !== '/' && <div>
                    <Button 
                    onClick={() => navigate(-1)}
                    >
                        
                        <ArrowLeftIcon className="size-6"/>
                        
    
    
                    </Button>
                </div>}
                <div className="mx-auto w-full max-w-5xl">
                    <Outlet />
                </div>
            </section>


            <RightSidebar/>

        </main>

        {/* <FooterMainLayout /> */}

    </div>
}


export default MainLayout;