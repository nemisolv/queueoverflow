import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LocalSearchbarProps {
    route: string;
    iconPosition: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

export function LocalSearchbar({route, iconPosition, imgSrc, placeholder, otherClasses}: LocalSearchbarProps) {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();


    const debounceValue = useDebounce(searchValue, 1000);

    useEffect(() => {
        if(debounceValue) {
          


            const newUrl = new URLSearchParams(location.search);
            newUrl.set('q', debounceValue.trim());
            // setSearchParams({q: debounceValue});
            navigate(`${route}?${newUrl.toString()}`)
        }else {
            if(location.pathname ===  route

            ) {

                const newUrl = new URLSearchParams(location.search);
                newUrl.delete('q');
                navigate(`${route}?${newUrl.toString()}`)
            }
        }

    },[debounceValue])

    



     return <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>

        {iconPosition === 'left' && <img src={imgSrc} alt="search" className="w-6 h-6" />}
        <Input placeholder={placeholder} type="text" value={searchValue}
         onChange={
            (e) => {
                setSearchValue(e.target.value);
                // setSearchParams({q: e.target.value})
            }
         } className="paragraph-regular no-focus placeholder text-dark400_light700 border-none  background-light800_darkgradient shadow-none  outline-none" />
        {iconPosition === 'right' && <img src={imgSrc} alt="search" className="w-6 h-6" />}
     </div>
}

