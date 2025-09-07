import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Create() {

    const [image, setSelectedImage] = useState(null)
    const [title, setTitle] = useState("")
    const [expiresIn, setTime] = useState("")
    const [time1, setTime1] = useState(false)
    const [time2, setTime2] = useState(false)
    const [time3, setTime3] = useState(false)
    let backendUrl = "http://localhost:5000"

    const navigate = useNavigate()


    const CreatePost = async (e) => {
        console.log(title, expiresIn, image)
        e.preventDefault()

        if (!image || !(image instanceof Blob)) {
            toast.error("Please select a valid image file")
            return
        }

        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("expiresIn", expiresIn)
            formData.append("content", image) // must match multer field name

            const { data } = await axios.post(backendUrl + '/api/post/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            console.log(data)
            toast.success("Post created successfully!")
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }
    }



    useEffect(() => {
        console.log(expiresIn)
    }, [expiresIn])

    return (
        <div className="bg-gradient-to-t from-black to-sky-200 w-full h-screen flex justify-center ">
            <div className="w-[80%] h-[80%] rounded-md bg-transparent mt-15 flex justify-center items-center">
                <form className="flex flex-col w-[85%] h-[90%] gap-3 p-5 items-center justify-center">
                    <h3 className="font-semibold text-2xl  font-sans">New Post</h3>
                    <div className="w-full sm:w-[60%] aspect-video border rounded-md overflow-hidden">
                        <img
                            className="w-full h-full object-cover rounded-md"
                            src={image ? URL.createObjectURL(image) : "https://tse3.mm.bing.net/th/id/OIP.L7IqpQaOasH9-YVvSgru-gAAAA?r=0&cb=thfvnextucfimg=1&w=467&h=467&rs=1&pid=ImgDetMain&o=7&rm=3"}
                            alt="Nature"
                        />
                    </div>


                    <div>
                        <input onChange={(e) => { setSelectedImage(e.target.files[0]) }} className="font-semibold text-center text-xl" type="file" id='post' accept='.png, .jpg, .jpeg' />
                        

                        <div className="flex gap-5 mt-2 text-center justify-center w-[100%]">
                            {[120, 240, 360].map((time) => (
                                <p
                                    key={time}
                                    onClick={() => setTime(time)}
                                    className={`border cursor-pointer px-5 rounded-full 
                  ${expiresIn === time ? "bg-blue-500 text-white" : "bg-white"}`}
                                >
                                    {time / 60}h
                                </p>
                            ))}
                        </div>

                    </div>
                    <input onChange={(e) => { setTitle(e.target.value) }} value={title} className="border-none text-center w-[25%] text-white px-3 py-1 font-semibold font-sans rounded-xl" type="text" placeholder='Title' />
                    <button onClick={CreatePost} className="border text-center px-15 mt-5 font-semibold text-2xl font-sans bg-black text-white py-2 rounded-full">Post</button>
                </form>
            </div>
        </div>
    )
}

export default Create