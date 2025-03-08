import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export const EventPage = () => {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [showFrom, setShowForm] = useState(false)

    const [customer, setCustomer] = useState('')
    const [tickets, setTickets] = useState(1)

    const navigate = useNavigate()

    console.log(import.meta.env.APPLICATION_ID)




    const getEvent = async () => {
        try {
            let resFetch = await fetch(`https://goldfish-app-fbulw.ondigitalocean.app/Event/${id}?applicationId=e8961fdc-6f43-4d5c-b569-aca1c3bc7ce2`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            })

            if (resFetch.ok) {
                resFetch = await resFetch.json()
                setEvent(resFetch)
            }
            console.log('Fetch faild')
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        getEvent()
    }, [])


    const bookEvent = async (e) => {
        e.preventDefault()
        try {
            let resFetch = await fetch(`https://goldfish-app-fbulw.ondigitalocean.app/Booking`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    applicationId: 'e8961fdc-6f43-4d5c-b569-aca1c3bc7ce2',
                    userId: '4e9f51de-8897-4742-8d8c-bc69f0a89b29',
                    eventId: event.id,
                    ticketQuantity: tickets,
                    customerName: customer
                })

            })

            if (resFetch.ok) {
                console.log('Reservado')
                resFetch = await resFetch.json()

            }
            console.log('Fetch faild')
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>
            <header className='py-5 px-10'>
                <button className='text-xl font-bold' onClick={() => {
                    navigate('/')
                }} > ⬅ List of event</button>
            </header>
            <main className="min-w-[100vw] min-h-[100vh] flex  justify-center items-center ">


                {event &&
                    <div className="flex flex-row gap-10 max-w-[85%] w-[70rem]">
                        <div className="w-[50%]">
                            <img src={event.image} alt="" />
                        </div>

                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="text-xl font-bold">Evenet: {event.name}</p>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                            </div>

                            <div>
                                <p className="text-xl font-bold">Event Description: {event.description} </p>
                                <p>Ticket Price: {event.price} $ </p>
                                <p>Available Seats: {event.availableTickets}  </p>
                            </div>


                            <form onSubmit={bookEvent} className="flex flex-col gap-3" style={{ display: showFrom ? 'flex' : 'none' }}>
                                <div className="flex flex-col   gap-2">
                                    <label className="" htmlFor="">Custumer Name: </label>
                                    <input className="bg-gray-300 py-1 px-2 rounded-lg" type="text" value={customer} onChange={(e) => {
                                        setCustomer(e.target.value)
                                    }} required />
                                </div>

                                <div className="flex flex-col  gap-2">
                                    <label className="" htmlFor="">Tickets to Booke </label>
                                    <input className="bg-gray-300 py-1 px-2 rounded-lg" type="number" value={tickets}
                                        onChange={(e) => { setTickets(e.target.value) }} min={1} max={10} />
                                </div>

                                <p>Total price: {(tickets * parseFloat(event.price)) | 0}</p>

                                <button type="submit" className="py-2 px-6 bg-emerald-400 text-white cursor-pointer hover:bg-emerald-500" >
                                    Book NOW
                                </button>
                            </form>




                            <button style={{ display: showFrom ? 'none' : 'block' }} className="py-2 px-6 bg-emerald-400 text-white cursor-pointer hover:bg-emerald-500" onClick={() => { setShowForm(true) }}>
                                Book Ticket
                            </button>

                        </div>




                    </div>
                }

                {!event && <p className="text-2xl font-bold flex gap-2 justify-center items-center" > <span className="w-5 h-5 border-4 border-black border-l-transparent rounded-full animate-spin"></span> Loading </p>
                }



            </main>
        </>

    )
}
