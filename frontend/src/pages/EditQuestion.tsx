import Question from "@/components/form/Question";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchQuestionBySlug } from "@/stores/slices/questionSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditQuestion() {
    const {currentQuestion} = useAppSelector(state => state.question);
    const dispatch = useAppDispatch();
    const {slug} = useParams<{slug: string}>();

    const questionDetails = {
        title: currentQuestion.title,
        explanation: currentQuestion.explanation,
        tags: currentQuestion.tags.map(tag => tag.name)
    }

    useEffect(() => {
        dispatch(fetchQuestionBySlug(slug))

    
    },[])

    return <div>
        <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

        <div className="mt-9">
            <Question
            type="edit"
            questionDetails={questionDetails}
            slug={slug}

            />
        </div>

    </div>
}