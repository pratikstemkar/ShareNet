package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/models"
)

// @route POST /api/v1/post
// @desc Create a new post
// @access Public
func PostPost(c *gin.Context) {
	var post models.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.CreatePost(&post)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"post": res,
	})
}

// @route GET /api/v1/post/:id
// @desc Read a post by id
// @access Public
func GetPost(c *gin.Context) {
	id := c.Param("id")
	post, err := database.ReadPost(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "post not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"post": post,
	})
}

// @route GET /api/v1/post/user/:id
// @desc Read all posts by user
// @access Public
func GetPostListByUser(c *gin.Context) {
	id := c.Param("id")
	postList, count, err := database.ReadPostByUser(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"post_list": postList,
		"count": count,
	})
}

// @route GET /api/v1/post
// @desc Read all posts
// @access Public
func GetPostList(c *gin.Context) {
	postList, err := database.ReadPostList()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"post_list": postList,
	})
}

// @route PUT /api/v1/post/:id
// @desc Update post by id
// @access Public
func PutPost(c *gin.Context) {
	var post models.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.UpdatePost(&post)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"updated_post": res,
	})
}

// @route PUT /api/v1/post/:id/upvote
// @desc Upvote post by id
// @access Public
func PutUpvotePost(c *gin.Context) {
	var upvote models.Upvote
	if err := c.ShouldBindJSON(&upvote); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.UpvotePost(&upvote)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "post with upvoted",
		"res": res,
	})
}

// @route PUT /api/v1/post/:id/downvote
// @desc Downvote post by id
// @access Public
func PutDownvotePost(c *gin.Context) {
	var downvote models.Downvote
	if err := c.ShouldBindJSON(&downvote); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.DownvotePost(&downvote)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "post with downvoted",
		"res": res,
	})
}

// @route DELETE /api/v1/post/:id
// @desc Delete a post by id
// @access Public
func DeletePost(c *gin.Context) {
	id := c.Param("id")
	err := database.DeletePost(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "post not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "post deleted successfuly",
	})
}