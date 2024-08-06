import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


interface FilterProps {
filters: {
        name: string,
        value: string
    }[];
    otherClasses?: string;
    containerClasses?: string;
}

export function Filter({ filters, otherClasses, containerClasses }: FilterProps) {
    const location = useLocation();
    const [searchParams] = useSearchParams(location.search);
    const navigate = useNavigate();

    const handleUpdateParams  = (value: string) => {
        const newUrl = new URLSearchParams(location.search);
        newUrl.set('sortOrder', value);
        navigate(`?${newUrl.toString()}`)
    }

    return <div
        className={`relative ${containerClasses} select-none `}
    >
        <Select
        onValueChange={(value) => handleUpdateParams(value)}
        defaultValue={searchParams.get('sortOrder') || ''}
        >
            <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5  py-2.5`}>
                <div className="line-clamp-1 flex-1 text-left">
                    <SelectValue placeholder="Select a filter" />
                </div>
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    {
                        filters.map(item => (

                            <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                        ))
                    }
                </SelectGroup>

            </SelectContent>
        </Select>
    </div>
}