import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from "react-hook-form";
import { userProfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChangeEvent, useState } from "react";
import { changeUserAvatar, updateInfo } from "@/stores/slices/authSlice";


export default function EditProfile() {
  const { currentUser } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.question);
  const [profilePicture, setProfilePicture] = useState(currentUser?.picture);

  const [open, setOpen] = useState(false);



  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      bio: currentUser?.bio || '',
      location: currentUser?.location || '',
      portfolioWebsite: currentUser?.portfolioWebsite || ''

    },
  })
  function onSubmit(values: z.infer<typeof userProfileSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values)
    dispatch(updateInfo({
      firstName: values.firstName,
      lastName: values.lastName,
      bio: values.bio,
      location: values.location,
      portfolioWebsite: values.portfolioWebsite,
    }))
    setOpen(false)

  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    // create a new FormData
    const formData = new FormData();
    // @ts-ignore
    formData.append('files', file); // where 'file' is the file you want to upload
        // @ts-ignore
    formData.append('userId', currentUser?.id);
    formData.append('uploadDir', '/users');
    dispatch(changeUserAvatar(formData));
  }

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
        Edit Profile
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>


      <div className="flex-center flex-col my-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Label htmlFor="profilePicture" className="cursor-pointer">
              <Avatar className=" size-[140px]">
                <AvatarImage src={profilePicture} alt="profile picture" className="rounded-full w-full h-full object-cover" />
                <AvatarFallback>
                  {currentUser?.firstName[0]}
                </AvatarFallback>
              </Avatar>


              <Input type="file" className="hidden"
                onChange={(e) => handleAvatarChange(e)} id="profilePicture"
              />
            </Label>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Upload a new profile picture
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>



      </div>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
          <div className="flex flex-between gap-10 sm:gap-20">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">First name <span className="text-red-500">*</span> </FormLabel>
                  <FormControl className='mt-3.5'>
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Last name</FormLabel>
                  <FormControl className='mt-3.5'>
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Bio
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    placeholder="e.g. Software Engineer, Frontend Developer, etc."
                    className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2" {...field} />
                </FormControl>
                <FormDescription className="body-regular mt-1.5 text-light-500">
                  Tell us a bit about yourself
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Portfolio Website
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    placeholder="e.g. https://myportfolio.com"
                    className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2" {...field} />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Share your portfolio website
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Location
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 min-h-[46px] border light-border-2"
                    placeholder="e.g. VN, Nigeria"
                    {...field} />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Where are you based?
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">

            <Button
              className="primary-gradient text-light-900 max-w-[120px] h-[46px] mt-4 w-full flex "
              type="submit" disabled={loading}

            >
              {loading ? 'Saving...' : 'Save'

              }
            </Button>
          </div>
        </form>
      </Form>


      {/* <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter> */}
    </DialogContent>
  </Dialog>

}