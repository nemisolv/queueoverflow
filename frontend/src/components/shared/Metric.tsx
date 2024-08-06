import { Link } from "react-router-dom";

interface MetricProps {
    imgUrl: string;
    alt: string;
    title: string;
    value: string | number;
    href?: string;
    // textStyles: string;
    isAuthor?: boolean
}



export function Metric({
    imgUrl, alt, value, title, href,
    isAuthor
}: MetricProps) {

    const metricContent = (
        <>
            <img src={imgUrl} alt={alt} className={`object-cover size-5 ${href ? 'rounded-full' : ''}`} />
            <span className="text-dark200_light700 small-medium flex-center gap-1">{value}
                <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>
                    {title}
                </span>

            </span></>
    )
    if (href) {
        return <Link to={href} className="flex-center gap-1">
            {metricContent}
        </Link>
    }

    return <div className="flex-center flex-wrap gap-1">
        {metricContent}
    </div>
}