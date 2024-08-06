import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchUserAnswers } from "@/stores/slices/userSlice";
import { useEffect } from "react";
import AnswerCard from "../card/AnswerCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";



const AnswersTab = ({ userId }: { userId: number }) => {
  const { userAnswers } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const pageNo = Number(searchParams.get('pageNo') || 1);
  useEffect(() => {
    dispatch(fetchUserAnswers({
      userId,
      pageNo: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }))
  }, [userId, pageNo])

  return (
    <>
      {userAnswers.totalElements > 0 ? (<>{userAnswers.metadata.map((item) => (
        <AnswerCard
          key={item.id}
          id={item.id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes}
          createdAt={item.createdAt}
        />
      ))}

        <div className="mt-6">
          <Pagination
            pageNumber={userAnswers?.pageNo || 1}
            isNext={!userAnswers?.last || false}
          />
        </div></>) : <p className="paragraph-semibold text-center mt-8 ">You don't have any answers yet!</p>}

    </>

  )
}

export default AnswersTab