import { formatAndDivideNumber } from "@/lib/utils";
import { useAppDispatch } from "@/stores/hooks";
import { downvoteAnswer, downvoteQuestion, toggleSaveQuestion, upvoteAnswer, upvoteQuestion } from "@/stores/slices/questionSlice";
import { useEffect } from "react";

interface Props {
  type: 'Question' | 'Answer';
  itemId: number;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}
type voteAction = 'upvote' | 'downvote';

export default function Votes({
  type,
  itemId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: Props) {

  const dispatch = useAppDispatch()


  const handleSave = async () => {
   dispatch(toggleSaveQuestion(
    itemId
   ))

    // return toast({
    //   title: `Question ${!hasSaved ? 'Saved in' : 'Removed from'} your collection`,
    //   variant: !hasSaved ? 'default' : 'destructive'
    // })
  }

  const handleVote = async (action: voteAction) => {

    if (action === 'upvote') {
      if (type === 'Question') {
        dispatch(upvoteQuestion({
          questionId: itemId,
          hasupVoted,
          hasdownVoted,
        })
        )
      } else if (type === 'Answer') {
        dispatch(upvoteAnswer({
          answerId: itemId,
          hasupVoted,
          hasdownVoted,
        }))
      }

      //   return toast({
      //     title: `Upvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
      //     variant: !hasupVoted ? 'default' : 'destructive'
      //   })
    }

      if(action === 'downvote') {
        if(type === 'Question') {
          console.log({itemId, hasupVoted, hasdownVoted})
          dispatch(downvoteQuestion({
            questionId: itemId,
            hasupVoted,
            hasdownVoted,
          })
          )
        } else if(type === 'Answer') {
          dispatch(downvoteAnswer({
            answerId: itemId,
            hasupVoted,
            hasdownVoted,
          }))
        }

    //     return toast({
    //       title: `Downvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
    //       variant: !hasupVoted ? 'default' : 'destructive'
    //     })

    //   }
    }
  }

    useEffect(() => {
      // viewQuestion({
      //   questionId: JSON.parse(itemId),
      //   userId: userId ? JSON.parse(userId) : undefined,
      // })
    }, [itemId]);

    return (
      <div className="flex gap-5">
        <div className="flex-center gap-2.5">
          <div className="flex-center gap-1.5">
            <img
              src={hasupVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
              }
              width={18}
              height={18}
              alt="upvote"
              className="cursor-pointer"
              onClick={() => handleVote('upvote')}
            />

            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatAndDivideNumber(upvotes)}
              </p>
            </div>
          </div>

          <div className="flex-center gap-1.5">
            <img
              src={hasdownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
              }
              alt="downvote"
              className="cursor-pointer size-[18px]"
              onClick={() => handleVote('downvote')}
            />

            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatAndDivideNumber(downvotes)}
              </p>
            </div>
          </div>
        </div>

        {type === 'Question' && (
          <img
            src={hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
            }
            alt="star"
            className="cursor-pointer size-[18px]"
            onClick={handleSave}
          />
        )}
      </div>
    )
  }
