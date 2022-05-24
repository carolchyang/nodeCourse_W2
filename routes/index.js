const HttpControllers = require("../controllers/http");
const PostsControllers = require("../controllers/posts");

const routes = async (req, res) => {
  const { method, url } = req;
  console.log(method, url);

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  // 取得所有貼文
  if (url === "/posts" && method === "GET") {
    PostsControllers.getPosts({ req, res });

    // 取得單一貼文
  } else if (url.startsWith("/posts") && method === "GET") {
    PostsControllers.getPost({ req, res });

    // 新增貼文
  } else if (url === "/posts" && method === "POST") {
    req.on("data", () => {
      PostsControllers.createPost({ body, req, res });
    });

    // 修改貼文
  } else if (url.startsWith("/posts") && method === "PATCH") {
    req.on("data", () => {
      PostsControllers.createPost({ body, req, res });
    });

    // 刪除所有貼文
  } else if (url === "/posts" && method === "DELETE") {
    PostsControllers.delAllPosts({ req, res });

    // 刪除單一貼文
  } else if (url.startsWith("/posts") && method === "DELETE") {
    PostsControllers.delPost({ req, res });
  } else if (method === "OPTIONS") {
    HttpControllers.cors();
  } else {
    HttpControllers.notFound();
  }
};

module.exports = routes;
