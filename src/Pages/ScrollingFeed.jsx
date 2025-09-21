import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollingFeed() {
    const { scrollingPosts, fetchScrollingPosts, hasMore, loadingScroll, setScrollingPosts,
        setPage,
        setHasMore } = useContext(AppContext);

    const videoRefs = useRef([]);
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const location = useLocation();

    const navigate = useNavigate()

    useEffect(() => {

        setScrollingPosts([]);
        setPage(1);
        setHasMore(true);
        if (scrollingPosts.length === 0){

            fetchScrollingPosts();
        }
    }, [location]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                const nextIndex = Math.min(currentIndex + 1, validPosts.length - 1);
                scrollToPost(nextIndex);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prevIndex = Math.max(currentIndex - 1, 0);
                scrollToPost(prevIndex);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, scrollingPosts]);

    const scrollToPost = (index) => {
        const element = document.getElementById(`post-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setCurrentIndex(index);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
            if (scrollPercentage > 0.8 && hasMore && !loadingScroll) {
                fetchScrollingPosts();
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [hasMore, loadingScroll, fetchScrollingPosts]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    const postIndex = parseInt(video.dataset.index);
                    if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                        video.play().catch(() => { });
                        setCurrentIndex(postIndex);
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: [0.7] }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, [scrollingPosts]);

    const validPosts = scrollingPosts.filter(post => {
        if (!post.expiresAt) return true;
        const now = new Date();
        const expiry = new Date(post.expiresAt);
        return now < expiry;
    });

    return (
        <div className="w-full h-screen bg-black text-white flex justify-center relative overflow-hidden">
            <div
                ref={containerRef}
                className="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/3 h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
                {validPosts.length === 0 && !loadingScroll && (
                    <div className="h-screen flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white/80 text-xl mb-2">No posts available</p>
                            <p className="text-white/40 text-sm">Be the first to create a post!</p>
                        </div>
                    </div>
                )}

                {validPosts.map((post, index) => (
                    <div
                        key={post._id}
                        id={`post-${index}`}
                        className="w-full h-screen flex items-center justify-center snap-start snap-always relative"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            {post.mediaType === "video" && post.content ? (
                                <video
                                    src={post.content}
                                    ref={(el) => (videoRefs.current[index] = el)}
                                    data-index={index}
                                    className="w-full h-full object-contain"
                                    autoPlay
                                    loop
                                    playsInline
                                    controls
                                />
                            ) : post.content ? (
                                <img
                                    src={post.content}
                                    alt={post.title || "Post"}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <span className="text-gray-400">No media available</span>
                                </div>
                            )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                        <div className="absolute bottom-0 left-0 right-4 p-4 z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <span onClick={() => navigate(`/UserProfile/${post.user._id}`)} className="font-bold text-lg cursor-pointer text-white">
                                    @{post.user?.name?.toLowerCase().replace(/\s+/g, "") || "unknown"}
                                </span>
                            </div>
                            <div className="mb-3">
                                <p className="text-white font-medium text-base leading-relaxed">
                                    {post.title || "No title"}
                                </p>
                            </div>
                            {post.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.map((tag, idx) => (
                                        <span key={idx} className="text-white font-semibold text-sm">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {loadingScroll && index === validPosts.length - 1 && (
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-white text-sm">Loading more...</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {loadingScroll && (
                    <div className="h-screen flex items-center justify-center">
                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                )}

                {!hasMore && validPosts.length > 0 && (
                    <div className="h-screen flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white/60">You've reached the end!</p>
                            <p className="text-white/40 text-sm mt-2">No more posts to load</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full sm:right-1/2 sm:transform sm:translate-x-1/2 sm:top-4">
                <span className="text-white text-xs">Use ↑↓ keys to navigate</span>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}

export default ScrollingFeed;
