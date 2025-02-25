import './Loading.css'

interface LoadingProps {
    details: string
}

export const Loading = ({ details = 'Loading...' }: LoadingProps) => {
    return (
        <div className="flex flex-col justify-center items-center mt-16 top-0 bottom-0">
            <span className="loader"></span>
            <strong className="text-lg mt-2">{details}</strong>
        </div>
    )
}
