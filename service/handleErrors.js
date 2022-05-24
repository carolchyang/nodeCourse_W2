const headers = require("./headers");

const handleErrors = (res, err) => {
  res.writeHead(400, headers);
  let message = "";
  if (err) {
    message = err.message || err;
  } else {
    message = "欄位未填寫正確或無此 id";
  }
  res.write(
    JSON.stringify({
      status: "false",
      message,
    })
  );
  res.end();
};

module.exports = handleErrors;
