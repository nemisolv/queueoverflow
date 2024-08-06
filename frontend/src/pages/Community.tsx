import UserCard from "@/components/card/UserCard";
import { Filter } from "@/components/shared/Filter";
import { NoResult } from "@/components/shared/NoResult";
import { LocalSearchbar } from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { fetchUsers } from "@/stores/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect } from "react";
import { User } from "@/types/model-type";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

function Community() {
    const { users, loading } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const pageNo = Number(searchParams.get('pageNo') || 1);



    useEffect(() => {
        dispatch(fetchUsers({
            pageNo,
            pageSize: 10,
            sortBy: 'createdAt',
            sortOrder,
            searchQuery: query
        }))
    }, [query, sortOrder, pageNo])


    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Users </h1>
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">

                <LocalSearchbar
                    route='/community'
                    iconPosition='left'
                    imgSrc='/assets/icons/search.svg'
                    placeholder='Search for amazing minds'
                    otherClasses='flex-1'
                />

                <Filter
                    filters={UserFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px] '

                />

            </div>

            <section className="mt-12 flex flex-wrap gap-4">

                {loading ? (
                    <> 

                        <div className="flex flex-wrap gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <Skeleton key={item} className="h-60 w-full rounded-2xl sm:w-[260px]" />
                            ))}
                        </div></>
                ) : users.metadata.length > 0 ? (
                    users.metadata.map((user: User) => <UserCard key={user.id} user={user} />)
                ) : (
                    <NoResult
                        title="No Users Found"
                        description="We couldn't find any users matching your search criteria. Please try again."
                        link="/community"
                        linkText="View All Users"
                    />
                )}



            </section>
            <div className="mt-6">
                <Pagination
                    pageNumber={users?.pageNo || 1}
                    isNext={!users?.last || false}
                />
            </div>

        </>

    );
}

export default Community;