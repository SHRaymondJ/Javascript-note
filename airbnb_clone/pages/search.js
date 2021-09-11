import { format } from "date-fns"
import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard"

function search({ searchResult }) {
    const router = useRouter()
    const { search, startDate, endDate, noOfGuests } = router.query
    const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
    const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')

    console.log(searchResult)
    return (
        <div>
            <Header placeholder={`${search} | ${formattedStartDate} | ${formattedEndDate} | ${noOfGuests} guests`} />
            <main>
                <section className="pt-10 px-6">
                    <p className="text-xs">300+ Stays - {formattedStartDate} - {formattedEndDate} - for {noOfGuests} guests</p>

                    <h1 className="text-semibold text-3xl mt-2 mb-6">Stays in {search}</h1>

                    <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-900 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                </section>

                <div className="flex flex-col px-6">
                    {
                        searchResult.map(item => (
                            <InfoCard key={item.img} {...item}/>
                        ))
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default search

export async function getServerSideProps() {
    const searchResult = await fetch('https://links.papareact.com/isz').then(res => res.json())
    return {
        props: {
            searchResult
        }
    }
}