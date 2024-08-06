import { Link } from "react-router-dom";
import { RenderTag } from "../shared/RenderTag";
import { Metric } from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { useAppSelector } from "@/stores/hooks";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
    id: number;
    title: string;
    tags: {
        id: number;
        name: string;
    }[],
    author: {
        id: number;
        firstName: string;
        lastName: string;
        picture: string;
    };
    upvotes: number;
    views: number;
    answers: number;
    createdAt: string;
    slug: string;
}


export function QuestionCard({
    id,title, author,tags,upvotes,views,answers, createdAt,slug
}: QuestionProps) {

    const {currentUser} = useAppSelector(state => state.auth);
    const showActionButtons = currentUser && currentUser.id === author.id;
    return <div className="card-wrapper  rounded-[10px] p-9 sm:px-11">

        <div className="flex flex-col-reverse items-start jusitfy-between gap-5 sm:flex-row">

            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">{getTimestamp(new Date(createdAt))}</span>
            <Link to={`/questions/${slug}`}>
                <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
            </Link>

        </div>
        {/* if signed in add edit delete actions */}

        {
           showActionButtons && (
            <EditDeleteAction type="Question" itemId={id} slug={slug}/>
           )
        }



        <div className="mt-3.5 flex flex-wrap gap-2">
            {
                tags.map(tag => (
                    <RenderTag key={tag.id} id={tag.id} name={tag.name} />
                ))
            }
        </div>

        <div className="mt-6 flex-between w-full flex-wrap gap-3 ">
            <Metric
            imgUrl={author.picture || '/assets/icons/avatar.svg'}
            alt="user"
            value={author.firstName + ' ' + author.lastName}
            title={` - asked ${getTimestamp(new Date(createdAt))}`}
            href={`/profile/${author.id}`}
            isAuthor
            />
           <div className="flex items-center gap-10">
           <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatAndDivideNumber(upvotes)}
            title="Votes"
            />
            <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers)}
            title="Answers"
            />
            <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title="Views"
            />
           </div>
        </div>

    </div>
}