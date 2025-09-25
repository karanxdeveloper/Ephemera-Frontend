import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    let backendUrl = import.meta.env.VITE_BACKEND_URL
    axios.defaults.withCredentials = true

    const [data, setData] = useState([])

    const [media, setSelectedMedia] = useState(null)
    const [title, setTitle] = useState("")
    const [expiresIn, setTime] = useState("")

    const [currState, setCurrState] = useState("Sign Up")
    const [name, setName] = useState("")
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("")

    const [userData, setUserData] = useState(null)

    const [menuToggle, setMenuToggle] = useState(false)

    const [loading, setLoading] = useState(true);

    const [loginLoading, setLoginLoading] = useState(null)

    const [createLoading, setCreateLoading] = useState(null)

    const [viewPost, setViewPost] = useState(null)
    const [viewPostTitle, setViewPostTitle] = useState("")

    const [postUser, setPostUser] = useState("")

    const [posts, setPosts] = useState([]);

    const [isVerified, setIsVerified] = useState(null)

    const [otp, setOtp] = useState("")

    const [otpLoading, setOtpLoading] = useState(false)

    const [tags, setTags] = useState([]);

    const [profilePosts, setProfilePosts] = useState([])

    const [postUserId, setPostUserId] = useState("")

    const [mediaType, setMediaType] = useState("")

    const [scrollingPosts, setScrollingPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingScroll, setLoadingScroll] = useState(false);

    const [postId,setPostId] = useState("")
    const [viewPostData, setViewPostData] = useState(null);

    const navigate = useNavigate()


    const fetchData = async () => { //fetch the post data
        axios.defaults.withCredentials = true
        const response = await axios.get(backendUrl + '/api/post/data')
        setData(response.data.posts)

    }


    const CreatePost = async (e) => { // to create post
        e.preventDefault()
        if (!media) {
            toast.error("choose a media")
            return
        }

        if (!media || !(media instanceof Blob)) {
            toast.error("Please select a valid media file")
            return
        } else if (!expiresIn) {
            toast.error("choose your post time")
            return
        } else if (!title) {
            toast.error("Please write a title")
            return
        }

        setCreateLoading(true)
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("expiresIn", expiresIn)
            formData.append("content", media)

            tags.forEach(tag => {
                formData.append("tags", tag);
            });


            const { data } = await axios.post(backendUrl + '/api/post/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            setCreateLoading(false)
            toast.success("Post created successfully!")
            navigate("/")

            setSelectedMedia(null)
            setTitle("")
            setTime("")
            setTags([])
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
            isAccountVerified()
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
        e.preventDefault()
        setLoginLoading(true)


        try {
            const { data } = await axios.post(backendUrl + "/api/user/register", {
                name, email, password
            })

            toast.success(data.message)
            isAccountVerified()
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

            setUserData(data.user)
        } catch (error) {
            toast.error(error.message)
        }
    }


    const logout = async () => { // logout function
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + "/api/user/logout")
            setUserData(null)
            navigate("/login")
        } catch (error) {

        }
    }

    const openImage = async (id) => { // to get the single post 

        try {
            setOtpLoading(true)
            if (id) {

                const { data } = await axios.get(backendUrl + "/api/post/single-post", {
                    params: { postId: id }
                })

                setViewPostData(data.post)
                setViewPost(data.post.content)
                setViewPostTitle(data.post.title)
                setPostUser(data.post.user.name)
                setPostUserId(data.post.user._id)
                setPostId(data.post._id)
                setOtpLoading(false)
                console.log(data)
                setMediaType(data.post.mediaType)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const isAccountVerified = async () => { //to check if account is verified or not
        try {
            const { data } = await axios.post(backendUrl + "/api/user/isVerified");
            setIsVerified(data.success);

        } catch (error) {
            toast.error(error.message);
        }
    };

    const sendVerificationOtp = async () => { //to send verification otp to user's email
        try {
            setOtpLoading(true)
            const { data } = await axios.post(backendUrl + "/api/user/verify-MailOtp")
            console.log(data)
            if (data.success) {
                setOtpLoading(false)
                navigate("/VerifyAccount")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const verifyOtp = async (e) => { // to check the otp that the user have entered
        e.preventDefault()
        try {
            setOtpLoading(true)
            const { data } = await axios.post(backendUrl + "/api/user/verify-Mail", {
                otp
            })

            console.log(data)
            if (data.success) {
                isAccountVerified()
                setOtpLoading(false)
                navigate("/")
            }
            toast.success(data.success)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const ProfileInfo = async () => { // to get info of own account profile
        try {
            const { data } = await axios.get(backendUrl + "/api/post/profileInfo")
            setProfilePosts(data.post)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const userProfiles = async (id) => { // to get info of other user profile
        try {
            const { data } = await axios.get(backendUrl + "/api/post/fetchProfile", {
                params: { userId: id }
            })
            setProfilePosts(data.post)
            console.log(data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchScrollingPosts = async () => {
        if (loadingScroll || !hasMore) return;
        setLoadingScroll(true);

        try {
            const res = await axios.get(backendUrl + `/api/post/scrolling-posts`, {
                params: { page, limit: 5 },
                withCredentials: true // because you use cookies
            });

            console.log(res.data);

            if (!res.data.posts || res.data.posts.length === 0) {
                setHasMore(false);
            } else {
                setScrollingPosts((prev) => [...prev, ...res.data.posts]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error("Error fetching posts", err);
        } finally {
            setLoadingScroll(false);
        }
    };

const toggleLike = async (id) => {
  try {
    const res = await axios.post(`${backendUrl}/api/post/like`, { postId: id });

    if (res.data.success) {
      const { postId, likesCount, isLiked } = res.data;

      setScrollingPosts(prev =>
        prev.map(p => p._id === postId ? { ...p, likesCount, isLiked } : p)
      );

      setViewPostData(prev =>
        prev?._id === postId ? { ...prev, likesCount, isLiked } : prev
      );
    }
  } catch (err) {
    console.error("Error toggling like:", err);
  }
};



    useEffect(() => {
        getUserData(), fetchData(), isAccountVerified()
    }, [])




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
        setSelectedMedia,
        data,
        setData,
        userData,
        name,
        email,
        password,
        media,
        title,
        expiresIn,
        menuToggle,
        setMenuToggle,
        loading,
        setLoading,
        loginLoading,
        setLoginLoading,
        createLoading,
        setCreateLoading,
        openImage,
        viewPost,
        viewPostTitle,
        postUser,
        posts,
        setPosts,
        isVerified,
        sendVerificationOtp,
        setOtp,
        otp,
        verifyOtp,
        otpLoading,
        setOtpLoading,
        isAccountVerified,
        tags,
        setTags,
        ProfileInfo,
        profilePosts,
        postUserId,
        userProfiles,
        mediaType,
        scrollingPosts,
        fetchScrollingPosts,
        hasMore,
        loadingScroll,
        setScrollingPosts,
        setPage,
        setHasMore,
        toggleLike,
        viewPostData

    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}