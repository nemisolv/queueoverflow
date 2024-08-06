import { Link } from "react-router-dom";
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAppDispatch } from "@/stores/hooks";
import { followTag } from "@/stores/slices/tagSlice";


interface TagCardProps {
    tag: {
        id: number;
        name: string;
        description?: string;
        createdAt?: string;
        questionCount?: number;
        followerCount?: number;
        following?: boolean;
    }
}

export default function TagCard({ tag }: TagCardProps) {
    const dispatch = useAppDispatch();
    const handleFollowTag = (e: React.MouseEvent,tagId: number) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(followTag({
            tagId
        }))
    }


    return <Link to={`/tags/${tag.id}`} className="shadow-light100_darknone">
        <article className="background-light900_dark200 light-border flex w-full min-w-[240px] flex-col rounded-2xl border px-8 py-10 sm:w-[240px] ">
            <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                <p className="paragraph-semibold text-dark300_light900 ">{tag.name}</p>
            </div>
            <p className="small-medium text-dark400_light500 mt-3.5 flex-between  ">
                <span className="body-semibold primary-text-gradient mr-2.5">{tag.questionCount} + </span>
    
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger  onClick={(e) => handleFollowTag(e,tag.id)}> 
                                {tag.following ?  <BookmarkFilledIcon className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                           
                                {/* <BookmarkIcon className="w-4 h-4 hover:text-primary-500 cursor-wait" /> */}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    {tag.following ? 'Unfollow' : 'Follow'}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    



               
            </p>

        </article>


    </Link>

}