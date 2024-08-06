import React, {useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Editor } from '@tinymce/tinymce-react';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionSchema } from "@/lib/validation"
import { API_KEY } from "@/configs";
import { Badge } from "../ui/badge";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createQuestion, updateQuestion } from "@/stores/slices/questionSlice";
import { useTheme } from "@/context/ThemeProvider";
import { useAppSelector } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface QuestionProps {
    type: 'create' | 'edit';
    questionDetails?: {
        title: string;
        explanation: string;
        tags: string[];
    }
    slug?: string;
}

export default function Question({type,questionDetails,slug}: QuestionProps) {
    const {mode} = useTheme();
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useAppSelector(state => state.question);

      

    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            title: questionDetails?.title || "",
            explanation: questionDetails?.explanation || "",
            tags: questionDetails?.tags || [] ,
        },
    })
     function onSubmit(values: z.infer<typeof QuestionSchema>) {
        if(type ==='create') {
            dispatch(createQuestion({
                title: values.title,
                explanation: values.explanation,
                tags: values.tags,
                navigate
            }));
        }else {
            dispatch(updateQuestion({
                title: values.title,
                explanation: values.explanation,
                slug,
                navigate

            }))
        }
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
        if (e.key === 'Enter' && field.name === 'tags') {
            e.preventDefault();

            const tagInput = e.target as HTMLInputElement;
            const tagValue = tagInput.value.trim();
            if (tagValue !== '') {
                if (tagValue.length > 15) {
                    return form.setError('tags', {
                        type: 'max',
                        message: 'Tag too long, less than 16 characters'
                    })
                }

                if (field.value.length >= 5) {
                    return form.setError('tags', {
                        type: 'max',
                        message: 'You can add at most 5 tags'
                    })
                }

                if (!field.value.includes(tagValue as never)) {
                    // @ts-ignore
                    form.setValue('tags', [...field.value, tagValue])
                    tagInput.value = '';
                    form.clearErrors('tags')
                } else {
                    toast.error('Tag already exists')
                }
            } else {
                form.trigger();
            }

        }
    }

    const handleRemoveTag = (tag: string, field: any ) => {
        
        form.setValue('tags', field.value.filter((t: string) => t !== tag))
    }

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">Question title <span className="text-red-500">*</span> </FormLabel>
                        <FormControl className='mt-3.5'>
                            <Input
                                className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2" {...field} />
                        </FormControl>
                        <FormDescription className="body-regular mt-2.5 text-light-500">
                            A clear and concise title that describes your question
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-3">
                        <FormLabel className="paragraph-semibold text-dark400_light800">Detailed explanation of your problem <span className="text-red-500">*</span> </FormLabel>
                        <FormControl className='mt-3.5'>
                            <Editor
                                apiKey={API_KEY.TINY_EDITOR}
                                onInit={(_evt, editor) => {
                                    // @ts-ignore
                                    editorRef.current = editor;
                                }}
                                // initialValue={field.value}
                                value={field.value}
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

            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Tags
                            <span className="text-red-500">*</span> </FormLabel>
                        <FormControl className='mt-3.5'>
                            <>
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2"
                                    onKeyDown={e => handleInputKeyDown(e, field)}
                                    disabled={field.value.length >= 5 || type ==='edit'}
                                />
                                {
                                    field.value.length > 0 && (
                                        <div className="flex-start mt-2.5 gap-2.5">
                                            {
                                                field.value.map((tag:any) => (
                                                    <Badge
                                                    aria-disabled={type==='edit'}
                                                    key={tag} className='subtle-medium background-light800_dark300 text-light400_light500 flex-center gap-2 rounded-md border-none px-4 py-2 capitalize'
                                                        
                                                    >
                                                        {tag}
                                                        {type==='create' && <img src="/assets/icons/close.svg" alt="close icon"
                                                        
                                                        className="size-3 cursor-pointer object-contain invert-0 dark:invert" onClick={() => handleRemoveTag(tag, field)} />}
                                                    </Badge>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </>
                        </FormControl>
                        <FormDescription className="body-regular mt-2.5 text-light-500">
                            Add up to 5 tags to describe what your question is about

                        </FormDescription>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />

            <Button
                className="primary-gradient text-light-900 max-w-[120px] h-[46px] mt-4 w-full"
                type="submit" disabled={loading}>
                {loading ?
                    (
                        <>{type === 'create' ? 'Posting...' : 'Updating...'}</>
                    ) : (
                        <>{type === 'create' ? 'Ask a Question' : 'Edit'}</>
                    )

                }
            </Button>
        </form>
    </Form>
}

