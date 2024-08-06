import { useAppDispatch } from "@/stores/hooks";
import { deleteQuestion } from "@/stores/slices/questionSlice";
import { useNavigate } from "react-router-dom";

interface Props {
    type: 'Question' | 'Answer';
    itemId: number;
    slug?: string;
}


export default function EditDeleteAction({type, itemId, slug}: Props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleEdit = () => {
        if(type === 'Question') {
          navigate(`/question/edit/${slug}`)
        } else if(type === 'Answer') {
          // Edit answer
        }
      };
    
      const handleDelete = async () => {
        if(type === 'Question') {
          dispatch(deleteQuestion({
            questionId: itemId
          }))
        } else if(type === 'Answer') {
          // Delete answer
        //   await deleteAnswer({ 
        //     answerId: JSON.parse(itemId), 
        //     path: pathname 
        //   })
        }
      };
    
      return (
        <div className="flex items-center justify-end gap-3 max-sm:w-full">
          {type === 'Question' && (
            <img 
              src="/assets/icons/edit.svg"
              alt="Edit"
              className="cursor-pointer object-contain size-4"
              onClick={handleEdit}
            />
          )}
    
            <img 
              src="/assets/icons/trash.svg"
              alt="Delete"
              className="cursor-pointer object-contain size-4"
              onClick={handleDelete}
            />
        </div>
        )
}
