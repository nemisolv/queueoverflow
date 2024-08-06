import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filters";
import { useState } from "react";
import { useLocation, useSearchParams ,useNavigate} from "react-router-dom";

export default function GlobalFilters() {
    const location = useLocation();
    const [searchParams] = useSearchParams(location.search);
    const type = searchParams.get('type');
    const [active,setActive] = useState(type || '')
    const navigate = useNavigate();

    const handleTypeClick = (type: string) => {
        const newUrl = new URLSearchParams(searchParams)
        if(active === type) {
            setActive('');
            newUrl.delete('type')

        }else {
            setActive(type)
            newUrl.set('type', type);
        }
        navigate(`${location.pathname}?${newUrl.toString()}`)

    }
    return <div className="flex items-center gap-5 px-5">
        <p className="text-dark400_light900 body-medium">
            Type:
        </p>
        <div className="flex items-center gap-3">
            {GlobalSearchFilters.map(filter => (
                <Button key={filter.value} className={`light-border-2 small-medium rounded-full px-6 py-1 capitalize dark:text-light-800 dark:hover:text-primary-500 ${active===filter.value ? 'bg-primary-500 text-light-800 dark:hover:text-light-800':'bg-light-700 text-dark-400  dark:bg-dark-500' }  `} onClick={() => handleTypeClick(filter.value)}> {filter.name}</Button>
            ))}
        </div>
    </div>
}