import { useEffect, useState } from "react";
import { ReloadIcon } from '@radix-ui/react-icons'
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import GlobalFilters from "./GlobalFilters";
import { publicRequest } from "@/configs/axiosConfig";




export default function GlobalResult({setOpen}: {setOpen: (value: boolean) => void}){
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState([]);
    const [searchParams] = useSearchParams();
    const globalSerach = searchParams.get('globalSearch');
    console.log("🚀 ~ GlobalResult ~ globalSerach:", globalSerach)
    const type = searchParams.get('type');

    useEffect(() => {
        if (globalSerach) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await publicRequest.get(`/global/global-search?globalSearch=${globalSerach}&type=${type}`);
                    const { data } = response;
                    setResults(data);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                }
            }

            fetchData();
        }

    }, [globalSerach, type])

    console.log('length::',results)

    const renderLink = (type: string, id: number, slug: string): string => {
        switch (type) {
            case 'user':
                return `/profile/${id}`;
            case 'question':
                return `/questions/${slug}`
            case 'answer':
                return `/questions/${slug}`
            case 'tag':
                return `/tags/${id}`
            default:
                return '/'
        }
    }
    return <div className="absolute top-full w-full min-h-[200px] z-10 bg-light-800 dark:bg-dark-400 py-5 shadow-md  rounded-xl">
        <GlobalFilters/>
        <p className="h-[1px] w-full my-5 bg-light-700/50 dark:bg-dark-500/50"></p>

        <div className="space-y-5">

            <h4 className="body-semibold text_dark300_light700 ml-5">Top Match</h4>
        </div>

        {
            loading ? <div className="flex-center px-5 flex-col">
                <ReloadIcon className="animate-spin my-2 size-10 text-primary-500" />
                <p className="text-dark200_light800 body-regular">Browsing the entire database</p>

            </div> : <div className="flex flex-col gap-2">
                {
                    results?.length > 0 ? results?.map((item: any, index) => (
                        <Link key={item?.type + item?.id + index} 
                        to={renderLink(item?.type, item?.id, item?.slug)} 
                        className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                        onClick={() => setOpen(false)}
                        >
                            <img src='/assets/icons/tag.svg' className="size-[18px] invert-colors mt-1 object-contain" />

                            <div className="flex flex-col">
                                <p className="body-medium text-dark200_light800 line-clamp-1">{item?.title}</p>
                                <p className="text-light400_dark500 small-medium capitalize mt-1 font-bold">{item?.type}</p>
                            </div>
                        </Link>
                    )) : <div className="flex-center flex-col px-5 "
                    ><p className="text-dark200_light800 body-regular px-5 py-2.5 ">Opps, No results found</p></div>
                }
            </div>
        }

    </div>
}