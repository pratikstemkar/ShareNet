package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/utils"
)

// @route GET /
// @desc Hello World!
// @access Public
func Home(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H {
		"message": "Welcome to MatchUp! Server running on PORT:" + utils.GetEnvVariable("PORT"),
	})
}