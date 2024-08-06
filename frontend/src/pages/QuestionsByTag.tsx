import { QuestionCard } from "@/components/card/QuestionCard";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { fetchQuestionsByTag } from "@/stores/slices/questionSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function QuestionsByTag() {
    const { questionsByTag: questions, loading } = useAppSelector(state => state.question);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    useEffect(() => {
        dispatch(fetchQuestionsByTag({
            tagId: Number(id),
            pageNo: 1,
            pageSize: 10,
            sortBy: 'createdAt',
            sortOrder: 'desc',
            searchQuery: query
        }))
    }, [query])


    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Tag: {questions.title}</h1>


            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">

                <LocalSearchbar
                    route={`/tags/${id}`}
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for questions'
                    otherClasses='flex-1'
                />



            </div>
            <div className="mt-10 flex w-full flex-col gap-3">
                {
                    !loading && questions?.metadata?.length === 0 ?

                        <NoResult
                            title="There's no question to show"
                            description="Be the first to break the silence! Ask a Question and kickstart this discussion. Our query could be the next big thing others learn form."
                            link='/ask-question'
                            linkText='Ask a Question'


                        /> :
                        questions.metadata?.map(question => (
                            <QuestionCard key={question.id} id={question.id}
                                title={question.title}
                                tags={question.tags}
                                author={question.author}
                                upvotes={question.upvotes}
                                slug={question.slug}
                                views={question.views}
                                answers={question.answers}
                                createdAt={question.createdAt}
                            />
                        ))
                }
                {
                    loading && <>
                        <section>
                            <Skeleton className='h-12 w-52' />

                            <Skeleton className='mb-12 mt-11 h-14 w-full' />

                            <div className='mt-10 flex flex-col gap-6'>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                    <Skeleton key={item} className='h-48 w-full rounded-xl' />
                                ))}
                            </div>
                        </section></>
                }
            </div>
        </>

    );
}

export default QuestionsByTag;