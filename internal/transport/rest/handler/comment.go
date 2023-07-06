package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/models"
)

// @route POST /api/v1/comment
// @desc Create a new comment
// @access Public
func PostComment(c *gin.Context) {
	var comment models.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.CreateComment(&comment)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"comment": res,
	})
}

// @route GET /api/v1/comment/:id
// @desc Read a comment by id
// @access Public
func GetComment(c *gin.Context) {
	id := c.Param("id")
	comment, err := database.ReadComment(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "comment not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"comment": comment,
	})
}

// @route GET /api/v1/comment/user/:id
// @desc Read all comments by user
// @access Public
func GetCommentListByUser(c *gin.Context) {
	id := c.Param("id")
	commentList, count, err := database.ReadCommentByUser(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"comment_list": commentList,
		"count": count,
	})
}

// @route GET /api/v1/comment/post/:id
// @desc Read all comments by post
// @access Public
func GetCommentListByPost(c *gin.Context) {
	id := c.Param("id")
	commentList, count, err := database.ReadCommentByPost(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"comment_list": commentList,
		"count": count,
	})
}

// @route GET /api/v1/comment
// @desc Read all comments
// @access Public
func GetCommentList(c *gin.Context) {
	commentList, err := database.ReadCommentList()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"comment_list": commentList,
	})
}

// @route PUT /api/v1/comment/:id
// @desc Update comment by id
// @access Public
func PutComment(c *gin.Context) {
	var comment models.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.UpdateComment(&comment)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"updated_comment": res,
	})
}

// @route DELETE /api/v1/comment/:id
// @desc Delete a comment by id
// @access Public
func DeleteComment(c *gin.Context) {
	id := c.Param("id")
	err := database.DeleteComment(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "comment not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "comment deleted successfuly",
	})
}