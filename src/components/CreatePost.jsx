import ProfileButton from "./ProfileButton";
import { useLoading, useUser } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { createPost } from "../../utils/post.utils";
import axios from "axios";
import { generatePlaceholder } from "../../utils/placeholder.utils";
export default function CreatePost() {
  const { user } = useUser();
  const { setIsLoading } = useLoading();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  async function handleCreatePost() {
    setIsLoading(true);

    try {
      if (!text.length || !image) return false;
      const image_response = await handleFileUpload();
      if (image_response) {
        const post_response = await createPost(
          text,
          image_response.url,
          image_response.blurUrl
        );
        return post_response;
      }
    } catch (error) {
      throw Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileUpload() {
    const upload_server = import.meta.env.VITE_CDN_URL;
    const upload_server_instance = axios.create({
      baseURL: upload_server,
      withCredentials: false,
    });
    try {
      if (!image) return;
      const formData = new FormData();
      const blur_image = await handleBlurImage(imageUrl);
      formData.append("image", image);
      formData.append("blurimage", blur_image, "blurimage.png");

      return await upload_server_instance
        .post("/upload-image", formData)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          throw Error(error);
        });
    } catch (error) {
      throw Error(error);
    }
  }
  async function handleBlurImage(imageUrl) {
    try {
      let res = await generatePlaceholder(imageUrl);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (image) {
      const newImageUrl = URL.createObjectURL(image);
      setImageUrl(newImageUrl);
    }
  }, [image]);

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreatePost();
      }}
    >
      <div className="flex gap-3 w-full p-2">
        <div className="">
          <ProfileButton userdata={user} />
        </div>

        <div className="w-full  h-12 rounded-lg overflow-hidden border border-gray-300 flex items-center bg-white">
          <input
            placeholder="What's happening?"
            type="text"
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full border-none outline-none rounded-lg p-2"
          />
          <button className="w-10 h-10 text-gray-500 relative p-1 cursor-pointer">
            <input
              type="file"
              className="absolute h-full w-full left-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              onClick={() => {
                setImage(null);
              }}
            />
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.5 1.25C18.9142 1.25 19.25 1.58579 19.25 2V4.75H22C22.4142 4.75 22.75 5.08579 22.75 5.5C22.75 5.91421 22.4142 6.25 22 6.25H19.25V9C19.25 9.41421 18.9142 9.75 18.5 9.75C18.0858 9.75 17.75 9.41421 17.75 9V6.25H15C14.5858 6.25 14.25 5.91421 14.25 5.5C14.25 5.08579 14.5858 4.75 15 4.75H17.75V2C17.75 1.58579 18.0858 1.25 18.5 1.25Z" />
              <path d="M12 1.25L11.9426 1.25C9.63423 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63423 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C21.0667 17.4377 21.0596 17.4882 21.0522 17.5378L18.2782 15.0412C16.9788 13.8718 15.0437 13.7553 13.6134 14.7605L13.3152 14.9701C12.8182 15.3193 12.1421 15.2608 11.7125 14.8313L7.42282 10.5415C6.28741 9.40612 4.46613 9.34547 3.25771 10.4028L2.75098 10.8462C2.75552 9.05395 2.78124 7.69302 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C12.4142 2.75 12.75 2.41421 12.75 2C12.75 1.58579 12.4142 1.25 12 1.25ZM2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.2487 19.7617 20.4479 19.4814 20.6096 19.1404C20.5707 19.1166 20.5334 19.089 20.4983 19.0574L17.2747 16.1562C16.4951 15.4545 15.334 15.3846 14.4758 15.9877L14.1776 16.1973C13.0843 16.9657 11.5968 16.8369 10.6519 15.8919L6.36216 11.6022C5.78515 11.0252 4.85958 10.9944 4.24546 11.5317L2.75038 12.8399C2.75296 14.7884 2.77289 16.2448 2.92637 17.3864Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className=" flex justify-between h-16 items-center px-4">
        <div className=" aspect-square h-full overflow-hidden flex justify-center items-center rounded-lg ">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="new-upload"
              className="w-auto h-auto max-h-full max-w-full "
            />
          )}
        </div>
        <div className="flex justify-end gap-3 max-sm:gap-1 font-medium h-10">
          <button className="button-primary-border  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </button>
          <button className="button-primary-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
          <button className="button-primary-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </button>
          <input
            type="submit"
            value="post"
            className="button-primary max-w-40 flex-1 cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
}
