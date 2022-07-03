import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to get articles",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(error);
          return res.status(500).json({
            message: "Articles cannot be returned",
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to get articles",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(error);
          res.status(500).json({
            message: "Articles cannot be deleted",
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "Article not found",
          });
			}
			
			res.json({
				success: true
			})
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to get articles",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Article not built",
    });
  }
};
