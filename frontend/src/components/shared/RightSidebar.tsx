import { Link } from "react-router-dom"
import { RenderTag } from "./RenderTag"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { useEffect } from "react";
import { fetchTop10HotQuestions } from "@/stores/slices/questionSlice";
import { fetchTop10PopularTags } from "@/stores/slices/tagSlice";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "../ui/skeleton";


export function RightSidebar() {
    const { hotQuestions, loading: questionLoading } = useAppSelector(state => state.question);
    const { popularTags, loading: tagLoading } = useAppSelector(state => state.tag);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTop10HotQuestions());
        dispatch(fetchTop10PopularTags());
    }, [])
    return <aside className="background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col 
    
     overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px]">

        <div >
            <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
            {
                !questionLoading ?
                    <ScrollArea className="h-[400px]  rounded-md  p-4">
                        <div className="mt-7 flex w-full flex-col gap-[30px] ">

                            {hotQuestions.slice(0, 10).map(question => (
                                <Link to={`/questions/${question.id}`}
                                    key={question.id}
                                    className="flex cursor-pointer items-center justify-between gap-7"
                                >
                                    <p className="body-medium text-dark500_light700 text-left line-clamp-2">{question.title} </p>


                                    <img src="/assets/icons/chevron-right.svg" alt="chevron right"
                                        className="size-5 invert-colors"
                                    />
                                </Link>
                            ))


                            }


                        </div>
                    </ScrollArea> 
                    : <div className="flex flex-col gap-3 h-[350px] w-full mt-7"> {[1, 2, 3, 4, 5].map(_ => <Skeleton key={_} className="h-14 flex-1" />)}</div>
            }
        </div>

        <div className="mt-20">
            <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
               
            {
                   !tagLoading ?
                   <ScrollArea className="h-[400px]  rounded-md  p-4">
                    <div className="mt-7 flex flex-col gap-4  ">
                        { popularTags.slice(0,10).map(tag => (
                        <RenderTag key={tag.id} id={tag.id} name={tag.name}
                            totalQuestions={tag.totalQuestions}
                            showCount
                        />
                        ))}
                        </div>
                        </ScrollArea>
                  
                    :





            <div className="h-[350px] flex w-full flex-col gap-3 mt-7"> {[1, 2, 3, 4, 5].map(_ => <Skeleton key={_} className="h-9 flex-1" />)}</div>
            
        }
         
        </div>
    </aside >
}