package rest

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/transport/rest/handler"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/", handler.Home)

	// USER
	r.POST("/api/v1/user", handler.PostUser)
	r.GET("/api/v1/user/:id", handler.GetUser)
	r.GET("/api/v1/user", handler.GetUserList)
	r.PUT("/api/v1/user", handler.PutUser)
	r.DELETE("/api/v1/user/:id", handler.DeleteUser)

	// ROLE
	r.POST("/api/v1/role", handler.PostRole)
	r.GET("/api/v1/role/:id", handler.GetRole)
	r.GET("/api/v1/role", handler.AuthMiddleware(), handler.GetRoleList)
	r.PUT("/api/v1/role", handler.PutRole)
	r.DELETE("/api/v1/role/:id", handler.DeleteRole)

	// AUTH
	r.POST("/api/v1/login", handler.Login)
	r.POST("/api/v1/register", handler.Register)
	r.POST("/api/v1/refresh", handler.RefreshToken)

	return r
}