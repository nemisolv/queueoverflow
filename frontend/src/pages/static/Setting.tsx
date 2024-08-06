import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { settingSchema } from "@/lib/validation"
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { enableMFA } from "@/stores/slices/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface SettingProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export default function Setting({ open, setOpen }: SettingProps) {
    const { currentUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof settingSchema>>({
        resolver: zodResolver(settingSchema),
        defaultValues: {
            mfaEnabled: currentUser?.mfaEnabled,

        },
    })
    function onSubmit(values: z.infer<typeof settingSchema>) {
        console.log("🚀 ~ onSubmit ~ values:", values)
        if (currentUser?.mfaEnabled !== values.mfaEnabled) {
            dispatch(enableMFA(values.mfaEnabled))

        }
        // setOpen(false)

    }

    return (
        <Dialog open={open} onOpenChange={setOpen} defaultOpen={true}>
            {/* <DialogTrigger asChild>
        <Button variant="outline">Setting</Button>
      </DialogTrigger> */}
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Workspace Settings
                    </DialogTitle>
                    <DialogDescription>
                        Update your workspace settings
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div>
                            {currentUser?.authProvider === 'LOCAL' && <div className="space-y-4">
                            <h3 className="mb-4 text-lg font-semibold">
                                Security
                            </h3>
                                <FormField
                                    control={form.control}
                                    name="mfaEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Two-factor authentication
                                                </FormLabel>
                                                <FormDescription>
                                                    Add an extra layer of security to your account.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    aria-label="Enable two-factor authentication"
                                                    className={field.value ? "bg-green-500 " : ""}

                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>}

                            {/* not implement:  */}

                            <div>
                                <h3 className="mb-4 mt-5 text-lg font-semibold">Email Notifications - <span className="text-red-500">currently not   working</span>
                                </h3>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        // @ts-ignore
                                        name="marketing_emails"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Marketing emails
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Receive emails about new products, features, and more.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className={field.value ? "bg-green-500 " : ""}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        // @ts-ignore
                                        name="security_emails"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Security emails</FormLabel>
                                                    <FormDescription>
                                                        Receive emails about your account security.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        // disabled
                                                        // aria-readonly
                                                        className={field.value ? "bg-green-500 " : ""}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button className="paragraph-medium btn- text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3 float-right bg-indigo-600 text-white">
                            Save changes
                        </Button>
                    </form>
                </Form>


                {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
