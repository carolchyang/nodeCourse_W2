const handleSuccess = require("../service/handleSuccess");
const handleErrors = require("../service/handleErrors");
const Post = require("../models/post");

const posts = {
  async getPosts({ req, res }) {
    const posts = await Post.find();
    handleSuccess(res, posts);
  },
  async getPost({ req, res }) {
    try {
      const id = req.url.split("/").pop();
      const post = await Post.findOne({ _id: id });

      if (post) {
        handleSuccess(res, post);
      } else {
        handleErrors(res, "查無此貼文");
      }
    } catch (err) {
      handleErrors(res, err);
    }
  },
  async createPost({ body, req, res }) {
    try {
      const { name, tags, type, image, content, likes, comments } =
        JSON.parse(body);
      const newPost = await Post.create({
        name,
        tags,
        type,
        image,
        content,
        likes,
        comments,
      });
      handleSuccess(res, newPost);
    } catch (err) {
      handleErrors(res, err);
    }
  },
  async updatePost({ body, req, res }) {
    try {
      const { name, tags, type, image, content, likes, comments } =
        JSON.parse(body);
      const id = req.url.split("/").pop();
      const isExist = User.findById(id).exec();

      if (isExist == null) {
        handleErrors(res, "查無此貼文");
      } else {
        const newPost = await Post.findByIdAndUpdate(
          id,
          {
            name,
            tags,
            type,
            image,
            content,
            likes,
            comments,
          },
          {
            // 回傳更新後的值
            new: true,
            // 使 findByIdAndUpdate 跑 Schema 驗證規則
            runValidators: true,
          }
        );

        handleSuccess(res, newPost);
      }
    } catch (err) {
      handleErrors(res, err);
    }
  },
  async delAllPosts({ req, res }) {
    await Post.deleteMany({});
    const posts = await Post.find();
    handleSuccess(res, posts);
  },
  async delPost({ req, res }) {
    try {
      const id = req.url.split("/").pop();

      const delPost = await Post.findByIdAndDelete(id, {
        // 回傳刪除後的值
        new: true,
      });

      if (delPost) {
        handleSuccess(res, delPost);
      } else {
        handleErrors(res, "查無此貼文");
      }
    } catch (err) {
      handleErrors(res, err);
    }
  },
};

module.exports = posts;
