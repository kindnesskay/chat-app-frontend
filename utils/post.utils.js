import axios from "axios";
export const getAllPosts = async () => {
  try {
    return await axios
      .get("/posts")
      .then((res) => {
        if (!res.data.length) return null;
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  } catch (error) {}
};

export const createPost = async (text, imageUrl, blurImageUrl) => {
  try {
    return await axios
      .post("/posts/create", { text, imageUrl, blurImageUrl })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw Error(error);
      });
  } catch (error) {
    throw Error(error);
  }
};

export const likePost = async (postId) => {
  try {
    if (!postId) throw Error("PostId is not defined");
    return await axios
      .post("/posts/like", { liked: true, postId })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw Error(error);
      });
  } catch (error) {
    throw Error(error);
  }
};
export const unLikePost = async (postId) => {
  try {
    if (!postId) throw Error("PostId is not defined");
    return await axios
      .post("/posts/unlike", { unliked: true, postId })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw Error(err);
      });
  } catch (error) {
    throw Error(error);
  }
};
