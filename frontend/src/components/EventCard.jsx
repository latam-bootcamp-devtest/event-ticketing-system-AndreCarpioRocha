import { useNavigate } from "react-router"


export const EventCard = ({ event }) => {
    const navigate = useNavigate()

    return (
        <article className="text-md p-4  flex flex-col gap-1.5 bg-gray-100 rounded-xl shadow-md cursor-pointer hover:bg-gray-400" onClick={() => {
            navigate(`event/${event.id}`)
        }} >
            <div>
                <img className="w-full" src={event.image} alt="" />
            </div>
            <div>
                <div className="flex gap-2 ">
                    <p className="font-bold">Event:</p>
                    <p>{event.name}</p>
                </div>
                <div className="flex gap-2 ">
                    <p className="font-bold">Date:</p>
                    <p>{event.date}</p>
                </div>

                <div className="flex gap-2 ">
                    <p className="font-bold">Availabe Seats:</p>
                    <p>0</p>
                </div>
            </div>

        </article>
    )
}
