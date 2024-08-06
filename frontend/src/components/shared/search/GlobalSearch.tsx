import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GlobalResult from "./GlobalResult";

function GlobalSearch() {
    const location = useLocation();
    const [searchParams] = useSearchParams(location.search);
    const [open,setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>(searchParams.get('globalSearch') || ''); 
    const searchContainerRef = useRef(null)
    

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const newUrl = new URLSearchParams(searchParams);
       if(debounceValue) {
        newUrl.set('globalSearch', debounceValue);
       }else {
        newUrl.delete('globalSearch');
    }
    navigate(`${location.pathname}?${newUrl.toString()}`);

        

    }, [debounceValue])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if(searchContainerRef.current && 
                // @ts-ignore
                !searchContainerRef.current.contains(e.target)) {
                setOpen(false);
                setSearchValue('');
            }
        }
        setOpen(false)
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }

    },[])


    return <div
    className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}
    >
        <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
            
            <img src="/assets/icons/search.svg" className="size-6 cursor-pointer"/>

            <Input
            type="text"
            placeholder="Search globally..."
            className="no-focus paragraph-regular background-light800_lightgradient placeholder text-dark400_light700 border-none shadow-none outline-none"
            value={searchValue}
            onChange={(e) =>  {
                setSearchValue(e.target.value);
                if(!open) {
                    setOpen(true);
                }
                if(e.target.value === ''&& open) {
                    setOpen(false);
                }
            }}
            />

        </div>

        {
            open && <GlobalResult setOpen={setOpen}/>
        }
        
        
        </div>
}

export default GlobalSearch;