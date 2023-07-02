package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/models"
)

// TODO: Make al routes private

// @route POST /api/v1/role
// @desc Create a new role
// @access Public
func PostRole(c *gin.Context) {
	var role models.Role
	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.CreateRole(&role)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"role": res,
	})
}

// @route GET /api/v1/role/:id
// @desc Read a role by id
// @access Public
func GetRole(c *gin.Context) {
	id := c.Param("id")
	role, err := database.ReadRole(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "role not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"role": role,
	})
}

// @route GET /api/v1/role
// @desc Read all roles
// @access Public
func GetRoleList(c *gin.Context) {
	roleList, err := database.ReadRoleList()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"role_list": roleList,
	})
}

// @route PUT /api/v1/role/:id
// @desc Update role by id
// @access Public
func PutRole(c *gin.Context) {
	var role models.Role
	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	res, err := database.UpdateRole(&role)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"updated_role": res,
	})
}

// @route DELETE /api/v1/role/:id
// @desc Delete a role by id
// @access Public
func DeleteRole(c *gin.Context) {
	id := c.Param("id")
	err := database.DeleteRole(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "role not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "role deleted successfuly",
	})
}