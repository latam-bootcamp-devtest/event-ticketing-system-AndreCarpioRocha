import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"


export const BookignPage = () => {

    const [booking, setBookings] = useState([])
    const navigate = useNavigate()

    console.log(booking)

    const getBookings = async () => {
        try {
            let resFetch = await fetch(`https://goldfish-app-fbulw.ondigitalocean.app/User/4e9f51de-8897-4742-8d8c-bc69f0a89b29/Events?applicationId=e8961fdc-6f43-4d5c-b569-aca1c3bc7ce2`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            })

            if (resFetch.ok) {
                resFetch = await resFetch.json()
                setBookings(resFetch)
            }
            console.log('Fetch faild')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBookings()
    }, [])

    return (

        <>
            <header className='py-5 px-10'>
                <button className='text-xl font-bold' onClick={() => {
                    navigate('/')
                }} > ⬅ List of event</button>
            </header>
            <main className="flex flex-col gap-5 min-h-[100vh]  max-w-[85%] mx-auto ">

                <h1 className="text-2xl font-bold">List of Bookings</h1>

                <div className="w-full grid gap-5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 300px))" }}>
                    {
                        booking.map((booking, index) => {
                            return (

                                <article key={booking.id} className="text-md p-4  flex flex-col gap-1.5 bg-gray-100 rounded-xl shadow-md cursor-pointer hover:bg-gray-400"  >
                                    <div>
                                        <img className="w-full" src={''} alt="" />
                                    </div>
                                    <div>
                                        <div className="flex gap-2 ">
                                            <p className="font-bold">Event:</p>
                                            <p>{''}</p>
                                        </div>
                                        <div className="flex gap-2 ">
                                            <p className="font-bold">Date:</p>
                                            <p>{''}</p>
                                        </div>

                                        <div className="flex gap-2 ">
                                            <p className="font-bold">Availabe Seats:</p>
                                            <p>0</p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    }
                </div>

                {booking.length == 0 && <p className="text-2xl font-bold flex gap-2 justify-center items-center m-auto" > <span className="w-5 h-5 border-4 border-black border-l-transparent rounded-full animate-spin"></span> Loading </p>
                }
            </main>
        </>



    )
}
