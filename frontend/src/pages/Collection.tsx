import { QuestionCard } from "@/components/card/QuestionCard";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionFilters } from "@/constants/filters";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {  fetchSavedQuestions } from "@/stores/slices/questionSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Home() {
    const { savedQuestions: questions, loading } = useAppSelector(state => state.question);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const pageNo = Number(searchParams.get('pageNo') || 1);

    useEffect(() => {
        dispatch(fetchSavedQuestions({
            pageNo,
            pageSize: 10,
            sortBy: 'createdAt',
            sortOrder,
            searchQuery: query
        }))
    }, [query, sortOrder, pageNo])

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Saved Questions </h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">

                <LocalSearchbar
                    route='/collection'
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for questions'
                    otherClasses='flex-1'
                />

                <Filter
                    filters={QuestionFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px] '

                />

            </div>

            <div className="mt-10 flex w-full flex-col gap-3">
                {
                    !loading && questions.metadata.length === 0 ?

                        <NoResult
                            title="There's no question to show"
                            description="Be the first to break the silence! Ask a Question and kickstart this discussion. Our query could be the next big thing others learn form."
                            link='/ask-question'
                            linkText='Ask a Question'


                        /> :
                        questions.metadata.map(question => (
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
            </div>
            {!loading && <div className="mt-6">
                <Pagination
                    pageNumber={questions?.pageNo || 1}
                    isNext={!questions?.last || false}
                />
            </div>}

            {loading && <>
                <div className='mb-12 mt-11 flex flex-wrap gap-5'>
                    <Skeleton className='h-14 flex-1' />
                    <Skeleton className='h-14 w-28' />
                </div>

                <div className='flex flex-col gap-6'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <Skeleton key={item} className='h-48 w-full rounded-xl' />
                    ))}
                </div>
            </>}
        </>

    );
}

export default Home;