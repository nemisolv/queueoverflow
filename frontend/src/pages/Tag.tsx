import TagCard from "@/components/card/TagCard";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { fetchAllTags } from "@/stores/slices/tagSlice";
import { useAppSelector } from "@/stores/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

function Tag() {
    const { tags, loading } = useAppSelector(state => state.tag)
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const pageNo = Number(searchParams.get('pageNo') || 1);

    useEffect(() => {
        dispatch(fetchAllTags({
            pageNo,
            pageSize: 10,
            sortBy: 'createdAt',
            sortOrder,
            searchQuery: query
        }))
    }, [query, sortOrder, pageNo])


    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Tags </h1>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">

                <LocalSearchbar
                    route='/tags'
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for amazing minds'
                    otherClasses='flex-1'
                />

                <Filter
                    filters={TagFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px] '

                />

            </div>

            <section className="mt-12 flex flex-wrap gap-4">
                {!loading && (Array.isArray(tags.metadata) && tags.metadata?.length > 0 ? tags.metadata?.map((tag: any) => (
                    <TagCard key={tag.id} tag={tag} />
                )) : <NoResult
                    title='No tags Found'
                    description="We couldn't find any tags matching your search criteria. Please try again."
                    link="/community"
                    linkText='View All tags'
                />)
                }

                {loading &&
            <>
                     <div className=' flex flex-wrap items-center justify-between gap-5'>
            <Skeleton className='h-14 flex-1' />
          </div>
    
          <div className='flex flex-wrap gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Skeleton
                key={item}
                className='h-60 w-full rounded-2xl sm:w-[240px]'
              />
            ))}
          </div>
            </>
      }


            </section>

            <div className="mt-6">
                <Pagination
                    pageNumber={tags?.pageNo || 1}
                    isNext={!tags?.last || false}
                />
            </div>
        </>

    );
}

export default Tag;