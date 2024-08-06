import AnswersTab from "@/components/shared/AnswersTab";
import EditProfile from "@/components/shared/EditProfile";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJoinedDate } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/stores/hooks"
import { fetchUserProfile } from "@/stores/slices/userSlice";
import { useEffect } from "react"
import { useParams } from "react-router-dom";


export default function Profile() {
    const {previewUserProfile,loading} = useAppSelector(state => state.user);
    const {currentUser} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    

    useEffect(() => {
        dispatch(fetchUserProfile({
            userId: Number(id)
        }))

    }, [id])

    return (   
     
     <div>
         {!loading ? <>
           <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
              <div className="flex flex-col items-start gap-4 lg:flex-row">
              <Avatar className=" size-[140px]">
                  <AvatarImage src={previewUserProfile?.picture} alt="profile picture" className="rounded-full w-full h-full object-cover" />
                  <AvatarFallback>
                    {currentUser?.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                
      
                <div className="mt-3">
                  <h2 className="h2-bold text-dark100_light900">{previewUserProfile.firstName + ' ' + previewUserProfile.lastName}</h2>
                  <p className="paragraph-regular text-dark200_light800">@{previewUserProfile.accountName}</p>
      
                  <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                    {previewUserProfile.portfolioWebsite && (
                      <ProfileLink 
                        imgUrl="/assets/icons/link.svg"
                        href={previewUserProfile.portfolioWebsite}
                        title="Portfolio"
                      />
                    )}
      
                    {previewUserProfile.location && (
                      <ProfileLink 
                        imgUrl="/assets/icons/location.svg"
                        title={previewUserProfile.location}
                      />
                    )}
      
                      <ProfileLink 
                        imgUrl="/assets/icons/calendar.svg"
                        title={getJoinedDate(new Date(previewUserProfile.createdAt))}
                      />
                  </div>
      
                  {previewUserProfile.bio && (
                    <p className="paragraph-regular text-dark400_light800 mt-8">
                      {previewUserProfile.bio}
                    </p>
                  )}
                </div>
              </div>
      
              <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
               {currentUser &&
                  currentUser.id === previewUserProfile.id &&  <EditProfile />
    
                    
              }
              </div>
            </div>
            
            <Stats
              reputation={previewUserProfile.reputation}
              totalQuestions={previewUserProfile.totalQuestions}
              totalAnswers={previewUserProfile.totalAnswers}
              badges={previewUserProfile.badgeCounts}
            />
      
            <div className="mt-10 flex gap-10">
              <Tabs defaultValue="top-posts" className="flex-1">
                <TabsList className="background-light800_dark400 min-h-[42px] p-1">
                  <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
                  <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
                </TabsList>
                <TabsContent value="top-posts" className="mt-5 flex w-full flex-col gap-6">
                  <QuestionTab 
                    userId={Number(id)}
                  />
                </TabsContent>
                <TabsContent value="answers" className="flex w-full flex-col gap-6">
                  <AnswersTab 
                    userId={Number(id)}
                  />
                </TabsContent>
              </Tabs>
            </div>
         </>
 :  <section>
 <div className='flex flex-col items-start gap-4 lg:flex-row'>
   <Skeleton className='h-36 w-36 rounded-full' />

   <div className='mt-3'>
     <Skeleton className='h-7 w-28' />
     <Skeleton className='mt-3 h-7 w-20' />

     <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
       <Skeleton className='h-9 w-36' />
       <Skeleton className='h-9 w-36' />
       <Skeleton className='h-9 w-36' />
     </div>

     <Skeleton className='mt-8 h-7 w-9/12' />
   </div>
 </div>

 <div className='mb-12 mt-10'>
   <Skeleton className='h-7 w-full' />

   <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
     <Skeleton className='h-28 rounded-md' />
     <Skeleton className='h-28 rounded-md' />
     <Skeleton className='h-28 rounded-md' />
     <Skeleton className='h-28 rounded-md' />
   </div>
 </div>

 <div className='mt-10 flex gap-10'>
   <div className='flex flex-1 flex-col'>
     <div className='flex'>
       <Skeleton className='h-11 w-24 rounded-r-none' />
       <Skeleton className='h-11 w-24 rounded-l-none' />
     </div>

     <div className='mt-5 flex w-full flex-col gap-6'>
       {[1, 2, 3, 4, 5].map((item) => (
         <Skeleton key={item} className='h-48 w-full rounded-xl' />
       ))}
     </div>
   </div>

   <div className='flex min-w-[278px] flex-col max-lg:hidden'>
     <Skeleton className='h-7 w-10' />

     <div className='mt-7 flex flex-col gap-4'>
       <Skeleton className='h-7' />
       <Skeleton className='h-7' />
       <Skeleton className='h-7' />
       <Skeleton className='h-7' />
       <Skeleton className='h-7' />
     </div>
   </div>
 </div>
</section>}
      </div>


      
      )
}