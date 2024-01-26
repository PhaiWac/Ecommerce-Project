import Navbar from "../components/Navbar";

const MostItem = () => {
    return ( 
        <>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut ratione nulla deserunt veritatis quas in maiores nisi velit iusto debitis.
        </>
    )
}

function HomePage() {
    return (
        <>
            <Navbar/> 

            <div className="mt-28 relative container mx-auto">
                <img src="./image/index.jpeg" alt="" className="min-w-full h-[150px] md:h-[300px] object-cover"  />
                {/* <div className="p-5">
                    <img src="./image/index.jpeg" alt=""  />
                </div>
                <div className="p-5">
                    <MostItem/>
                </div> */}

            </div>
        </>
    )
}

export default HomePage ;