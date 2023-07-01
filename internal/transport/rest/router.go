package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/transport/rest/handlers"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", handlers.Home)

	// USER
	r.POST("/api/v1/user", handlers.PostUser)
	r.GET("/api/v1/user/:id", handlers.GetUser)
	r.GET("/api/v1/user", handlers.GetUserList)
	r.PUT("/api/v1/user", handlers.PutUser)
	r.DELETE("/api/v1/user/:id", handlers.DeleteUser)

	return r
}