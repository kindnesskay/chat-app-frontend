import { useEffect, useState } from "react";
import { useUser } from "../../context/AppContext";
import ProfileButton from "./ProfileButton";
import StackedProfile from "./StackedProfile";
import { likePost, unLikePost } from "../../utils/post.utils";
export default function Post({ postData }) {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(undefined);
  const [likesCount, setLikesCount] = useState(postData.likes_count);
  const [likes, setLikes] = useState(postData.likes);

  const like = async () => {
    setIsLiked(true);
    setLikesCount((prev) => prev + 1);
    const res = await likePost(postData._id);
    setLikes(res);
    return true;
  };
  const unLike = async () => {
    setIsLiked(false);
    if (likesCount > 0) {
      setLikesCount((prev) => prev - 1);
    }
    const res = await unLikePost(postData._id);
    setLikes(res);
    return true;
  };

  const handleLike = () => {
    return isLiked ? unLike() : like();
  };

  useEffect(() => {
    postData.likes.forEach((like) => {
      if (like._id == user._id) {
        setIsLiked(true);
      }
    });
  }, [isLiked]);
  return (
    <div className="flex flex-col gap-4 p-3  shadow-sm border  border-gray-200 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <ProfileButton userdata={postData.author} username city />
        </div>
        <p className="text-sm text-gray-400">2 mins ago</p>
      </div>
      <p className="px-1 text-lg text-gray-600 font-medium pl-2">
        {postData.text}
      </p>
      <div className="max-h-96 rounded-xl flex justify-center items-center cursor-pointer  overflow-hidden relative">
        <div className="w-full h-full absolute">
          {postData.blurImageUrl && (
            <img
              src={postData.blurImageUrl}
              alt={postData.alt}
              className="w-full h-full z-10"
            />
          )}
        </div>

        <img
          src={postData.imageUrl}
          alt={postData.alt}
          className="w-auto h-auto max-w-full max-h-full z-10"
        />
      </div>
      <div className="w-full flex justify-between h-8 text-lg font-medium text-gray-500">
        <StackedProfile profiles={likes} />
        <button>{postData.comments.length} comments</button>
        <button className="">{likesCount} likes</button>
      </div>

      <div className="w-full flex justify-between  text-lg font-medium h-12 border-y-2 border-gray-200  ">
        <button
          onClick={handleLike}
          className={`w-12 h-12 transition-colors ${
            isLiked ? "text-red-500" : "text-gray-500"
          }  `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="scale-90 hover:scale-110"
          >
            <path d="M3 9.09918C3 13.3364 6.50224 15.5943 9.06596 17.6154C9.97063 18.3285 10.842 19 11.7133 19C12.5846 19 13.4559 18.3285 14.3606 17.6154C16.9243 15.5943 20.4266 13.3364 20.4266 9.09918C20.4266 4.86196 15.6341 1.85701 11.7133 5.93062C7.79245 1.85701 3 4.86196 3 9.09918Z" />
          </svg>
        </button>
        <button className=" w-12 h-12 transition-colors   text-gray-500 hover:text-blue-500 hover:transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="scale-90 hover:scale-110"
          >
            <path d="M12.7442 12C12.7442 12.411 12.411 12.7442 12 12.7442C11.589 12.7442 11.2558 12.411 11.2558 12C11.2558 11.589 11.589 11.2558 12 11.2558C12.411 11.2558 12.7442 11.589 12.7442 12Z" />
            <path d="M15.7209 12C15.7209 12.411 15.3877 12.7442 14.9767 12.7442C14.5657 12.7442 14.2326 12.411 14.2326 12C14.2326 11.589 14.5657 11.2558 14.9767 11.2558C15.3877 11.2558 15.7209 11.589 15.7209 12Z" />
            <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.2787 4.30043 14.4889 4.83507 15.5623C4.91485 15.7225 4.93178 15.886 4.89496 16.0236L4.45172 17.6802C4.1483 18.8142 5.18576 19.8517 6.31978 19.5483L7.97637 19.105C8.11396 19.0682 8.27751 19.0851 8.43769 19.1649C9.51109 19.6996 10.7213 20 12 20C16.4183 20 20 16.4183 20 12ZM12 5.11628C15.8018 5.11628 18.8837 8.19823 18.8837 12C18.8837 15.8018 15.8018 18.8837 12 18.8837C10.8978 18.8837 9.85764 18.6251 8.93537 18.1657C8.56521 17.9814 8.12259 17.9104 7.68784 18.0267L6.03125 18.4699C5.727 18.5513 5.44866 18.273 5.53006 17.9687L5.97331 16.3122C6.08963 15.8774 6.01864 15.4348 5.83427 15.0646C5.3749 14.1424 5.11628 13.1022 5.11628 12C5.11628 8.19823 8.19823 5.11628 12 5.11628Z" />
          </svg>
        </button>
        <button className="w-12 h-12 transition-colors text-gray-500 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="scale-90 hover:scale-110"
          >
            <path d="M14.5556 4.89609C14.567 4.90625 14.5784 4.91643 14.5899 4.92664L18.1581 8.09832C18.8238 8.69009 19.3758 9.18066 19.7547 9.62599C20.153 10.094 20.4366 10.5979 20.4366 11.2215C20.4366 11.8451 20.153 12.349 19.7547 12.817C19.3758 13.2623 18.8238 13.7529 18.1581 14.3447L14.5899 17.5164C14.5784 17.5266 14.567 17.5368 14.5555 17.5469C14.2671 17.8034 13.998 18.0427 13.7654 18.1962C13.5371 18.347 13.1218 18.566 12.6567 18.3571C12.1915 18.1482 12.0793 17.6924 12.0403 17.4215C12.0006 17.1457 12.0006 16.7855 12.0007 16.3996C12.0007 16.3843 12.0007 16.369 12.0007 16.3536V14.9593C10.7103 15.0482 9.40279 15.3909 8.25905 15.9482C6.91409 16.6035 5.83997 17.5328 5.25704 18.6431C5.11445 18.9147 4.80495 19.054 4.50713 18.9806C4.2093 18.9071 4 18.64 4 18.3332C4 14.1364 5.22799 11.4038 6.98381 9.72381C8.51425 8.25947 10.3795 7.65859 12.0007 7.53284V6.08937C12.0007 6.07401 12.0007 6.05868 12.0007 6.0434C12.0006 5.65747 12.0006 5.29728 12.0403 5.02148C12.0793 4.75064 12.1915 4.29479 12.6567 4.08589C13.1218 3.877 13.5371 4.09601 13.7654 4.24678C13.998 4.40031 14.2671 4.63965 14.5556 4.89609ZM13.3369 5.60055C13.4374 5.68668 13.5574 5.79292 13.704 5.92327L17.2352 9.06213C17.9474 9.69515 18.4279 10.1243 18.7392 10.4902C19.0381 10.8415 19.1031 11.0466 19.1031 11.2215C19.1031 11.3964 19.0381 11.6015 18.7392 11.9528C18.4279 12.3187 17.9474 12.7478 17.2352 13.3809L13.704 16.5197C13.5574 16.6501 13.4374 16.7563 13.3369 16.8425C13.3345 16.7101 13.3341 16.5498 13.3341 16.3536V14.2694C13.3341 13.9012 13.0356 13.6027 12.6674 13.6027C10.9672 13.6027 9.2004 14.0062 7.67496 14.7495C6.85816 15.1475 6.09778 15.6495 5.4525 16.2502C5.78032 13.5415 6.74905 11.7939 7.90566 10.6873C9.34583 9.30931 11.1654 8.84035 12.6674 8.84035C13.0356 8.84035 13.3341 8.54184 13.3341 8.17362V6.08937C13.3341 5.89318 13.3345 5.7329 13.3369 5.60055Z" />
          </svg>
        </button>
      </div>
      <div className="flex gap-3 max-sm:gap-1 ">
        <div className="">
          <ProfileButton userdata={user} />
        </div>
        <form className="w-full  overflow-hidden flex gap-2 max-sm:gap-1 h-12">
          <div className="w-full flex bg-gray-200 rounded-xl items-center p-1 flex-1 gap-1">
            <input
              placeholder="Write a comment"
              type="text"
              className="text-xl  w-full  border-none outline-none rounded-lg p-2 bg-transparent "
            />
            <button className="w-8 h-8 rounded-full text-gray-500 hover:text-gray-700 transition-colors hover:transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-full w-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <button className="text-sm font-semibold text-pink-500 h-8 w-8 hidden max-sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8- h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
            <input
              type="submit"
              value="Comment"
              className="button-primary h-full font-medium w-full max-w-32  float-end cursor-pointer max-sm:hidden"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
