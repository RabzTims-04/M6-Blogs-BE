import express from "express";
import createError from "http-errors";
import blogModel from "./schema.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await blogModel.find();
    res.send(blogs);
  } catch (error) {
    next(
      createError(500, "An error occurred while creating getting blogs list")
    );
  }
});

blogsRouter.get("/:blogId", async (req, res, next) => {
    try {
      const blogId = req.params.blogId
      const blog = await blogModel.findById(blogId)
      if(blog){
          res.send(blog);
      }else{
          next(createError(404, `blog with id: ${blogId} not found`))
      }
    } catch (error) {
      next(
        createError(500, `An error occurred while finding blog with id: ${req.params.blogId}`)
      );
    }
  });

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new blogModel(req.body);
    const { _id } = await newBlog.save();
    res.status(201).send({ _id });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      next(createError(500, `An error occurred while creating new blog`));
    }
  }
});

blogsRouter.put("/:blogId", async (req, res, next) => {
    try {
      const blogId = req.params.blogId
      const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, {
          new: true,
          runValidators: true
      })

      if(updatedBlog){
          res.send(updatedBlog)
      }else{
          next(createError(404, `Blog with id: ${blogId} not found`))
      }
    } catch (error) {

        next(createError(500, `An error occurred while updating blog with id: ${req.params.blogId}`));
    }
  });

  blogsRouter.delete("/:blogId", async (req, res, next) => {
    try {
      const blogId = req.params.blogId
      const deleteBlog = await blogModel.findByIdAndDelete(blogId)
      if(deleteBlog){
          res.status(204).send()
      }
      else{
          next(createError(404, `Blog with id: ${blogId} not found`))
      }

    } catch (error) {
        next(createError(500, `An error occurred while deleting blog with id: ${req.params.blogId}`));
    }
  })

export default blogsRouter;
