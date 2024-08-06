import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface NoResultProps {
    title: string;
    description: string;
    link: string;
    linkText: string;
}



export function NoResult({ title, description, link, linkText }: NoResultProps) {
    return <div className="mt-10 flex-center w-full flex-col ">
        <img
            src="/assets/images/dark-illustration.png"
            alt="No result found"
            className="w-[270px] h-[200px]  object-contain dark:flex"
        />

        <h2 className="h2-bold text-dark20_light900 ">{title}</h2>
        <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">{description}</p>

        <Link to={link}>
            <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
                {linkText}
            </Button>
        </Link>

    </div>
}