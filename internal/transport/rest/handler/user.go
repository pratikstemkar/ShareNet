package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/models"
)

// TODO: Make all routes private

// @route POST /api/v1/user
// @desc Create a new user
// @access Public
func PostUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}
	
	res, err := database.CreateUser(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"user": res,
	})
}

// @route GET /api/v1/user/:id
// @desc Read a user by id
// @access Public
func GetUser(c *gin.Context) {
	id := c.Param("id")
	user, err := database.ReadUser(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

// @route GET /api/v1/user/email/:id
// @desc Read a user by email
// @access Public
func GetUserByEmail(c *gin.Context) {
	email := c.Param("email")
	user, err := database.ReadUserByEmail(email)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

// @route GET /api/v1/user
// @desc Read all users
// @access Public
func GetUserList(c *gin.Context) {
	userList, err := database.ReadUserList()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"user_list": userList,
	})
}

// @route PUT /api/v1/user/:id
// @desc Update user by id
// @access Public
func PutUser(c *gin.Context) {
	// var user models.User
	// if err := c.ShouldBindJSON(&user); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{
	// 		"error": err,
	// 	})
	// 	return
	// }
	var updates map[string]interface{}
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	fmt.Println(updates)
	res, err := database.UpdateUser(updates)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"updated_user": res,
	})
}

// @route DELETE /api/v1/user/:id
// @desc Delete a user by id
// @access Public
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	err := database.DeleteUser(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "user deleted successfuly",
	})
}