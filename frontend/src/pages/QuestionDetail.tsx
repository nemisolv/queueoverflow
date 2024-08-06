import {  fetchQuestionBySlug } from "@/stores/slices/questionSlice"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Metric } from "@/components/shared/Metric"
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils"
import ParseHTML from "@/components/shared/ParseHTML"
import { RenderTag } from "@/components/shared/RenderTag"
import Answer from "@/components/form/Answer"
import AllAnswers from "@/components/shared/AllAnswers"
import Votes from "@/components/shared/Votes"
import { NoResult } from "@/components/shared/NoResult"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function QuestionDetail() {
    const { currentQuestion } = useAppSelector(state => state.question);
    const { previewUserProfile: currentUser } = useAppSelector(state => state.user);
    const { slug } = useParams<{ slug: string }>();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchQuestionBySlug(slug))

    }, [slug])

 




    return <>
    { currentQuestion ? <>
        <div className="flex-start w-full flex-col">
            <div className="flex justify-between w-full flex-col-reverse gap-5 sm:flex-row sm:items-center sm:gap-2 ">
                <Link to={`/profile/${currentQuestion.author.id}`} className="flex items-center gap-2">
                <Avatar className="rounded-full size-[38px] object-cover max-sm:mt-0.5">
                  <AvatarImage src={currentQuestion.author.picture} alt="profile picture" className="rounded-full w-full h-full object-cover" />
                  <AvatarFallback>
                    {currentQuestion.author?.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                    <h4 className="paragraph-semibold text-dark300_light700">{currentQuestion.author.firstName + ' ' + currentQuestion.author.lastName}</h4>
                </Link>

                <div className="flex justify-end">
                    <Votes
                        type="Question"
                        itemId={currentQuestion.id}
                        upvotes={currentQuestion.upvotes}
                        hasupVoted={currentQuestion.upvoted}
                        downvotes={currentQuestion.downvotes}
                        hasdownVoted={currentQuestion.downvoted}
                        hasSaved={currentQuestion.saved}
                    />
                </div>
            </div>
            <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{currentQuestion?.title}</h2>

        </div>
        <div className="flex flex-wrap gap-4 mt-5 mb-8">

            <Metric
                imgUrl="/assets/icons/clock.svg"
                alt="clock"
                value={` asked ${getTimestamp(new Date(currentQuestion?.createdAt))}`}
                title="Asked"
            />
            <Metric
                imgUrl="/assets/icons/like.svg"
                alt="upvotes"
                value={formatAndDivideNumber(currentQuestion.upvotes)}
                title="Votes"
            />
            <Metric
                imgUrl="/assets/icons/message.svg"
                alt="message"
                value={formatAndDivideNumber(currentQuestion?.answers)}
                title="Answers"
            />
            <Metric
                imgUrl="/assets/icons/eye.svg"
                alt="eye"
                value={formatAndDivideNumber(currentQuestion?.views)}
                title="Views"
            />
        </div>

        <ParseHTML data={currentQuestion.explanation} />

        <div className="mt-8 flex flex-wrap gap-2">
            {currentQuestion?.tags.map(tag => (
                <RenderTag key={tag.id} id={tag.id} name={tag.name} showCount />
            ))}
        </div>

        <AllAnswers />

        {currentUser ? <Answer questionId={currentQuestion?.id} title={currentQuestion?.title} content={currentQuestion?.explanation} /> : (
            <div className="mt-5 mb-4">
                <h4 className="text-xl text-dark200_light800 mb-3">
                    You must be logged in to answer this question
                </h4>
                <Link to="/auth/login" className="text-primary-500 hover:underline">Login</Link> to answer this question
            </div>
        )}




    </> : <NoResult
    title="No Question Found"
    description="The question you are looking for does not exist or has been removed. "
    link="/"
    linkText="Go back to home"
    
    />}
    </>
}
