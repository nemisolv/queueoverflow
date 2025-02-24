
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Metric } from "../shared/Metric";
import { QuestionBasicInfo } from "@/types/model-type";
interface Props {
  id: number;
  question: QuestionBasicInfo
  author: {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
  };
  upvotes: number;
  createdAt: string;
}

const AnswerCard = ({
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {

  return (
    <Link
      to={`/questions/${question.slug}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(new Date(createdAt))}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.firstName + ' ' + author.lastName}
          title={` • asked ${getTimestamp(new Date(createdAt))}`}
          href={`/profile/${author.id}`}
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
