import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import ParseHTML from "./ParseHTML";
import { Filter } from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { Link, useSearchParams } from "react-router-dom";
import { getTimestamp } from "@/lib/utils";
import Votes from "./Votes";
import { useEffect } from "react";
import { fetchAnswersByQuestion } from "@/stores/slices/questionSlice";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AllAnswers() {
    const { answersByQuestion } = useAppSelector(state => state.question);
    const { currentQuestion } = useAppSelector(state => state.question);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    useEffect(() => {
        dispatch(fetchAnswersByQuestion({
            questionId: currentQuestion?.id,
            pageNo: 1,
            pageSize: 10,
            sortBy: 'createdAt',
            sortOrder,
        }))
    },[currentQuestion?.id, sortOrder])

    return (
        <div className="mt-11">
            <div className='flex items-center justify-between'>
                <h3 className='primary-text-gradient'>{answersByQuestion?.totalElements} Answers</h3>

                <Filter filters={AnswerFilters} />
            </div>

            <div>
                {answersByQuestion?.metadata?.map((answer) => (
                    <article key={answer.id} className='light-border border-b py-10'>
                        <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                            <Link to={`/profile/${answer.author.id}`} className="flex flex-1 items-start gap-2 sm:items-center">
                                
                                 <Avatar className="rounded-full size-[28px] object-cover max-sm:mt-0.5">
                  <AvatarImage src={answer.author?.picture} alt="profile picture" className="rounded-full w-full h-full object-cover" />
                  <AvatarFallback>
                    {answer.author?.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <p className="body-semibold text-dark300_light700">
                                        {answer.author.firstName} {answer.author.lastName  || ""} 
                                    </p>

                                    <p className="small-regular text-light400_light500 ml-1.5 mt-0.5 line-clamp-1 ">
                                    {" "}   answered {" "}
                                        {getTimestamp(new Date(answer.createdAt))}
                                    </p>
                                </div>
                            </Link>
                            <div className="flex justify-end">
                                <Votes
                                    type="Answer"
                                    itemId={answer.id}
                                    upvotes={answer.upvotes}
                                    hasupVoted={answer.upvoted}
                                    downvotes={answer.downvotes}
                                    hasdownVoted={answer.downvoted}
                                />
                            </div>

                        </div>
                        <ParseHTML data={answer.content} />
                    </article>
                ))}
            </div>

            <div className="mt-10 w-full">
                {/* <Pagination
                    pageNumber={page ? +page : 1}
                    isNext={result.isNextAnswer}
                /> */}
            </div>
        </div>
    );
}