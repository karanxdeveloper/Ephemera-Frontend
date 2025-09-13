import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    let backendUrl = import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true

    const [data, setData] = useState([])

    const [image, setSelectedImage] = useState(null)
    const [title, setTitle] = useState("")
    const [expiresIn, setTime] = useState("")

    const [currState, setCurrState] = useState("Sign Up")
    const [name, setName] = useState("")
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("")

    const [userData, setUserData] = useState(null)

    const [menuToggle,setMenuToggle] = useState(false)

    const [loading, setLoading] = useState(true);

    const [loginLoading,setLoginLoading] = useState(null)

    const  [createLoading,setCreateLoading] = useState(null)

    const navigate = useNavigate()


    const fetchData = async () => { //fetch the post data
        axios.defaults.withCredentials = true
        const response = await axios.get(backendUrl + '/api/post/data')
        // console.log(response)
        setData(response.data.posts)
    }


    const CreatePost = async (e) => { // to create post
        setCreateLoading(true)
        e.preventDefault()

        if (!image || !(image instanceof Blob)) {
            toast.error("Please select a valid image file")
            return
        }

        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("expiresIn", expiresIn)
            formData.append("content", image)

            console.log(formData)

            const { data } = await axios.post(backendUrl + '/api/post/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            setCreateLoading(false)
            toast.success("Post created successfully!")
            navigate("/")
            
            setSelectedImage(null)
            setTitle("")
            setTime("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const login = async (e) => { //login function
        setLoginLoading(true)
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/user/login', {
                email, password
            })
            setLoginLoading(false)
            getUserData()
            navigate('/')
            setMail("")
            setPassword("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const register = async (e) => { //register function
       setLoginLoading(true)
        e.preventDefault()
        try {
            const { data } = await axios.post(backendUrl + "/api/user/register", {
                name, email, password
            })
            
                toast.success(data.message)
                setLoginLoading(false)
                navigate('/')
                setMail("")
            setPassword("")
            setName("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async () => { // get user logged In user data
        try {
           

            const { data } = await axios.post(backendUrl + '/api/user/userData')
            console.log(data)
            console.log(data.user)
            setUserData(data.user)
        } catch (error) {
            toast.error(error.message)
        }
    }


    const logout = async () => { // logout function
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + "/api/user/logout")
            console.log(data.message)
            setUserData(null)
            navigate("/login")
        } catch (error) {

        }
    }

    useEffect(()=>{
        getUserData(),fetchData()
        console.log(backendUrl)
    },[])




    const value = {
        fetchData,
        CreatePost,
        login,
        register,
        getUserData,
        logout,
        currState,
        setCurrState,
        setName,
        setMail,
        setPassword,
        setTime,
        setTitle,
        setSelectedImage,
        data,
        setData,
        userData,
        name,
        email,
        password,
        image,
        title,
        expiresIn,
        menuToggle,
        setMenuToggle,
        loading,
        setLoading,
        loginLoading,
        setLoginLoading,
        createLoading,
        setCreateLoading

    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}