import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { API_KEY } from "@/configs";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import { AnswerSchema } from "@/lib/validation";
import { useRef } from "react";
import { useAppDispatch } from "@/stores/hooks";
import { createAnswer } from "@/stores/slices/questionSlice";

interface AnswerProps {
    questionId: number;
    title: string;
    content: string;

}

export default function Answer({questionId
    // , title, content

}: AnswerProps) {
    const { mode } = useTheme();
    // const [isSubmittingAI, setIsSubmittingAI] = useState(false);
    const dispatch = useAppDispatch();
    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            answer: "",
        },

    })
    const editorRef = useRef(null);

    const handleCreateAnswer = (values: z.infer<typeof AnswerSchema>) => {
        console.log(values)
        dispatch(createAnswer({
            questionId,
            content: values.answer
        }))
        form.reset();
        // clear the editor
        // @ts-ignore
        editorRef.current.setContent('');
    }

    // const generateAIAnswer = async () => {
    //     try {
    //         setIsSubmittingAI(true);
    //         const response = await AnswerService.generateAIAnswer(`${title} : ${content}`);
        
    //     console.log("🚀 ~ generateAIAnswer ~ response:", response)
    //     }catch(error) {
    //         console.log("🚀 ~ generateAIAnswer ~ error:", error)
            
    //     }finally{
    //         setIsSubmittingAI(false)
    //     }
    // }

    return (
        <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>

                {/* <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
                onClick={generateAIAnswer}
                >
                    {isSubmittingAI ? (
            <>
            Generating...
            </>
          ) : (
                    <>
                        <img
                            src="/assets/icons/stars.svg"
                            alt="star"
                            className="object-contain size-3"
                        />
                        Generate AI Answer
                    </>
                    )} 
                </Button> */}
            </div>
            <Form {...form}>
                <form
                    className="mt-6 flex w-full flex-col gap-10"
                    onSubmit={form.handleSubmit(handleCreateAnswer)}
                >
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-3">
                                <FormControl className="mt-3.5">


                                    <Editor
                                        apiKey={API_KEY.TINY_EDITOR}
                                        onInit={(_evt, editor) => {
                                            // @ts-ignore
                                            editorRef.current = editor;
                                        }}
                                        initialValue=""
                                        init={{
                                            height: 350,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
                                                'codesample',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'codesample | bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist ',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                                            content_css: mode === 'dark' ? 'dark' : 'light',
                                        }}
                                        onEditorChange={(content) => {
                                            field.onChange(content)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="primary-gradient w-fit text-white"
                            // disabled={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}