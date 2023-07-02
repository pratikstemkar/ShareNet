package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/transport/rest/handler"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", handler.Home)

	// USER
	r.POST("/api/v1/user", handler.PostUser)
	r.GET("/api/v1/user/:id", handler.GetUser)
	r.GET("/api/v1/user", handler.GetUserList)
	r.PUT("/api/v1/user", handler.PutUser)
	r.DELETE("/api/v1/user/:id", handler.DeleteUser)

	return r
}