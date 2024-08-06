import { Link } from "react-router-dom"
import { RenderTag } from "../shared/RenderTag";
import { TagBasicInfo, User } from "@/types/model-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// interface UserCardProps {
//     user: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         email: string;
//         username: string;
//         picture: string;
//         // role: string;
//         // profilePicture: string;
//     } | any

// }


export default  function UserCard({ user }: {user:User})  {
   


    return <Link to={`/profile/${user.id}`} className="shadow-light100_darknone w-full  xs:w-[260px] max-sm:flex ] min-h-[300px">

        <article className="background-light900_dark200 light-border flex-center w-full flex-col rounded-2xl border p-8 h-full  ">
        <Avatar className=" size-[120px]">
                <AvatarImage src={user?.picture} alt="profile picture" className="rounded-full w-full h-full object-cover" />
                <AvatarFallback>
                  {user?.firstName[0]}
                </AvatarFallback>
              </Avatar>

            <div className="mt-4 text-center">
                <h3 className="h3-bold text-dark200_light900 line-clamp-1">{`${user.firstName} ${user.lastName}`}</h3>
                <p className="body-regular text-dark500_light500 mt-2">@{user.accountName}</p>

                <div className="mt-2 flex-between gap-2  ">
                    {user?.tags?.slice(0,3)?.map((tag: TagBasicInfo) => (
                        <RenderTag key={tag.id}
                        id={tag.id}
                        name={tag.name}

                    />
                    ))

                    }

                </div>
            </div>
        </article>


    </Link>
}