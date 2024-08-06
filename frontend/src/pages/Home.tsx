import { QuestionCard } from "@/components/card/QuestionCard";
import { HomeFilter } from "@/components/home/HomeFilter";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { fetchQuestions } from "@/stores/slices/questionSlice";
import {  useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

function Home() {
    const { questions, loading} = useAppSelector(state => state.question);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const pageNo = Number(searchParams.get('pageNo') || 1);

    useEffect(() => {
        dispatch(fetchQuestions({
            pageNo,
            pageSize: 5,
            sortBy: 'createdAt',
            sortOrder,
            searchQuery: query
        }))
    }, [query, sortOrder,pageNo])


    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions </h1>
                <Link to='/ask-question' className="flex justify-end  max-sm:w-full">
                    <Button className="primary-gradient min-h-[46px] !text-light-900 px-4 py-3">
                        Ask a Question
                    </Button>
                </Link>



            </div>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">

                <LocalSearchbar
                    route='/'
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for questions'
                    otherClasses='flex-1'
                />

                <Filter
                    filters={HomePageFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px] '
                    containerClasses="hidden max-md:flex "

                />

            </div>
            <HomeFilter />

            <div className="mt-10 flex w-full flex-col gap-3">
                {
                 !loading &&   questions?.metadata?.length === 0 ?

                        <NoResult
                            title="There's no question to show"
                            description="Be the first to break the silence! Ask a Question and kickstart this discussion. Our query could be the next big thing others learn form."
                            link='/ask-question'
                            linkText='Ask a Question'


                        /> :
                        questions?.metadata?.map(question => (
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
                       <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
                        <Skeleton className="h-14 flex-1" />
                        <div className="hidden max-md:block">
                          <Skeleton className="h-14 w-28" />
                        </div>
                      </div>
                
                      <div className="my-10 hidden flex-wrap gap-6 md:flex">
                        <Skeleton className="h-9 w-40" />
                        <Skeleton className="h-9 w-40" />
                        <Skeleton className="h-9 w-40" />
                        <Skeleton className="h-9 w-40" />
                      </div>
                
                      <div className="flex flex-col gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                          <Skeleton key={item} className="h-48 w-full rounded-xl" />
                        ))}
                      </div>
                    </>
                }
            </div>

            <div className="mt-6">
                <Pagination
                pageNumber={questions?.pageNo || 1}
                isNext={!questions?.last || false}
                 />
            </div>
        </>

    );
}

export default Home;