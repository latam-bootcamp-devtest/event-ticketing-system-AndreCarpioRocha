import { useEffect, useState } from "react"
import { EventCard } from "../components/EventCard"
import { Link } from "react-router"


export const EventsPage = () => {

    const [events, setEvens] = useState([])


    console.log(events)
    const getEvents = async () => {
        try {
            let resFetch = await fetch('https://goldfish-app-fbulw.ondigitalocean.app/Event?applicationId=e8961fdc-6f43-4d5c-b569-aca1c3bc7ce2', {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            })

            if (resFetch.ok) {
                resFetch = await resFetch.json()
                resFetch = resFetch.map(event => {
                    let dateFormat = new Date(event.date)
                    event.dateFormat = dateFormat.getDay() + "/" + (dateFormat.getMonth() + 1) + "/" + dateFormat.getFullYear()
                    return event
                })
                setEvens(resFetch)

            }
            console.log('Fetch faild')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])



    return (
        <main className="flex flex-col gap-5 min-h-[100vh]  max-w-[85%] mx-auto ">
            <div className="flex  justify-between p-1 items-center">
                <h1 className="text-3xl font-bold m-5">Upcoming Events</h1>
                <Link to={'/bookings'} className=" h-12 text-xl bg-emerald-400 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-emerald-500">My Bookings</Link>
            </div>


            <div className="w-full grid gap-5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 300px))" }}>
                {
                    events.map(event => {
                        return (
                            <EventCard key={event.id} event={event}></EventCard>
                        )
                    })
                }
            </div>
            {events.length == 0 && <p className="text-2xl font-bold flex gap-2 justify-center items-center m-auto" > <span className="w-5 h-5 border-4 border-black border-l-transparent rounded-full animate-spin"></span> Loading </p>
            }
        </main>

    )
}
