import { Link } from "react-router-dom";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-1">
      <img src={imgUrl} alt="icon" className="size-5" />

      {href ? (
        <Link to={href} target="_blank" className="paragraph-medium text-blue-500">
          {title}
        </Link> 
      ) : (
        <p className="paragraph-medium text-dark400_light700">
          {title}
        </p>
      )}
    </div>
  )
}

export default ProfileLink