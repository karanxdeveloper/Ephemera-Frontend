import { useEffect, useState } from "react";


function CommentModal({ post, onClose, fetchComments, addComment }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (post?._id) {
      fetchComments(post._id).then(setComments);
    }
  }, [post]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(post._id, newComment);
    const updated = await fetchComments(post._id);
    setComments(updated);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end">
   
      <div className="w-full sm:w-1/2 md:w-1/3 bg-gray-900 rounded-t-2xl max-h-[80vh] overflow-y-auto p-4">
       
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold">Comments</h3>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold px-2"
          >
            ✕
          </button>
        </div>

        
        <div className="flex flex-col gap-2 mb-4">
          {comments.length === 0 && (
            <p className="text-gray-400 text-sm">No comments yet</p>
          )}
          {comments.map((c, i) => (
            <p key={i} className="text-white text-sm">
              <span className="font-bold">{c.user?.name || "User"}: </span>
              {c.text}
            </p>
          ))}
        </div>

     
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 text-white"
          />
          <button
            onClick={handleAddComment}
            className="px-3 py-1 bg-blue-500 rounded text-white font-semibold"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
