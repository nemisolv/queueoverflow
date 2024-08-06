import { useEffect } from "react"
import { QuestionCard } from "../card/QuestionCard"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { fetchUserQuestions } from "@/stores/slices/userSlice";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";



const QuestionTab =  ({userId}: {userId: number}) => {
  const {userQuestions} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const pageNo = Number(searchParams.get('pageNo') || 1);

  if(!userQuestions) return null;

  useEffect(() => {
    dispatch(fetchUserQuestions({
      userId,
      pageNo,
      pageSize: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }))
  },[userId, pageNo])

  return (
    <>
  {userQuestions.totalElements > 0 ? (  <> {userQuestions.metadata.map((question) => (
        <QuestionCard 
          key={question.id}
          slug={question.slug}
          id={question.id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}

        <div className="mt-6">
                <Pagination
                pageNumber={userQuestions?.pageNo || 1}
                isNext={!userQuestions?.last || false}
                 />
            </div></>): <p className="paragraph-semibold text-center mt-10 ">don't have any questions yet!</p>}
    </>
  )
}

export default QuestionTab