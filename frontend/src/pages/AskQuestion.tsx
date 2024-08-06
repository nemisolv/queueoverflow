import Question from "@/components/form/Question";

export default function AskQuestion() {
    return <div>
        <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

        <div className="mt-9">
            <Question
            type="create"
            />
        </div>

    </div>
}