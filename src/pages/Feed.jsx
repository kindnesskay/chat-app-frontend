import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { getAllPosts } from "../../utils/post.utils";
export default function Feed() {
  const [posts, setPosts] = useState(undefined);
  const handleFetchAllPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
  };
  useEffect(() => {
    handleFetchAllPosts();
  }, []);
  return (
    <article className=" w-full max-w-4xl flex flex-col gap-5 p-3 bg-transparent">
      <CreatePost />
      <div className="flex flex-col gap-5  pt-4">
        {posts === undefined && <p>Loading....</p>}
        <>
          {posts ? (
            posts.map((post) => {
              return <Post key={post._id} postData={post} />;
            })
          ) : (
            <p className="text-center">No post from contacts </p>
          )}
        </>
      </div>
    </article>
  );
}
