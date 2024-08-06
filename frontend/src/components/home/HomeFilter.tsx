import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function HomeFilter() {

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(location.search);
    const typeFilter = searchParams.get('sortOrder');
    const [active,setActive] = useState(typeFilter || 'newest');

    const handleTypeClick = (type: string)=> {
        if(active !== type) {
            const newUrl = new URLSearchParams(location.search);
            newUrl.set('sortOrder', type);
            setSearchParams({sortOrder: type});
            setActive(type);
        }else {
            const newUrl = new URLSearchParams(location.search);
            newUrl.delete('sortOrder');
            setSearchParams(newUrl.toString());
            
            // setSearchParams({sortBy: ''});
            setActive('');
        }
    }

    return <div className="mt-10 flex-wrap gap-3 md:flex max-md:hidden">
        {
            HomePageFilters.map(item => (
                <Button key={item.value} onClick={()=> handleTypeClick(item.value)}
                    className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value ? 'bg-primary-100 text-primary-500' : 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-300'}`}
                >
                    {item.name}
                </Button>
            ))
        }

    </div>

}

