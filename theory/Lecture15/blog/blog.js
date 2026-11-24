const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: String, required: true },
  text: { type: String, required: true, maxlength: 300 },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

async function main() {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/backend_lecture15");
  await Post.init(); // make sure the unique index exists
  await Post.deleteMany({});
  await Comment.deleteMany({});

  const post = await Post.create({ title: "Mongoose", slug: "Mongoose", content: "Schemas and models", status: "published" });
  await Comment.create({ post: post._id, author: "Diya", text: "Useful post" });

  const comment = await Comment.findOne().populate("post", "title");
  console.log(`${comment.author} commented on "${comment.post.title}"`);

  try {
    await Post.create({ title: "Bad", slug: "bad", content: "x", status: "unknown" });
  } catch (error) {
    console.log("Enum check:", error.errors.status.message);
  }
  try {
    await Post.create({ title: "Again", slug: "mongoose", content: "x" });
  } catch (error) {
    console.log("Unique check: error code", error.code);
  }
}

main()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
