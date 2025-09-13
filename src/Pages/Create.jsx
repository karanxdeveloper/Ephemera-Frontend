import { useContext } from "react"
import { AppContext } from "../Context/AppContext"

function Create() {

    const { image, setSelectedImage, setTime, setTitle, title, expiresIn, CreatePost, createLoading } = useContext(AppContext)

    return (
        <div className="bg-black w-full h-screen flex justify-center ">
            <div className="w-[80%] h-[80%] rounded-md bg-transparent mt-15 flex justify-center items-center">
                <form className="flex flex-col w-[85%] h-[90%] gap-3 p-5 items-center justify-center">
                    <h3 className="font-semibold text-2xl select-none text-white select-none font-sans">New Post</h3>
                    <div className="w-full select-none sm:w-[60%] flex justify-center items-center border rounded-md overflow-hidden">
                        <img
                            className="max-h-[500px] select-none w-auto h-auto object-contain rounded-md"
                            src={image ? URL.createObjectURL(image) : "https://tse3.mm.bing.net/th/id/OIP.L7IqpQaOasH9-YVvSgru-gAAAA?r=0&cb=thfvnextucfimg=1&w=467&h=467&rs=1&pid=ImgDetMain&o=7&rm=3"}
                            alt="Nature"
                        />
                    </div>


                    <div>
                        <input onChange={(e) => { setSelectedImage(e.target.files[0]) }} className="font-semibold text-white select-none text-center text-xl" type="file" id='post' accept='.png, .jpg, .jpeg' />


                        <div className="flex gap-5 mt-2 text-center justify-center select-none w-[100%]">
                            {[120, 240, 600].map((time) => (
                                <p
                                    key={time}
                                    onClick={() => setTime(time)}
                                    className={`border cursor-pointer select-none px-5 rounded-full 
                  ${expiresIn === time ? "bg-blue-500 text-white" : "bg-white"}`}
                                >
                                    {time / 60} minutes
                                </p>
                            ))}
                        </div>

                    </div>
                    <input onChange={(e) => { setTitle(e.target.value) }} value={title} className="border-none text-center w-[75%] sm:w-[25%] text-white px-3 py-1 font-semibold font-sans rounded-xl" type="text" placeholder='Title' />
                    {createLoading ? <div className="flex justify-center items-center"><div className="border text-center w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin"></div></div>
                        : <button onClick={(e) => CreatePost(e)} className="border select-none text-center px-15 mt-5 font-semibold text-2xl font-sans bg-black text-white py-2 rounded-full">Post</button>}
                </form>
            </div>
        </div>
    )
}

export default Create