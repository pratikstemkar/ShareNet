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
	r.POST("/api/v1/user", handler.AuthMiddleware(), handler.PostUser)
	r.GET("/api/v1/user/:id", handler.AuthMiddleware(), handler.GetUser)
	r.GET("/api/v1/profile/:id", handler.GetPublicUser)
	r.GET("/api/v1/user/email/:email", handler.AuthMiddleware(), handler.GetUserByEmail)
	r.GET("/api/v1/user", handler.AuthMiddleware(), handler.GetUserList)
	r.PUT("/api/v1/user", handler.AuthMiddleware(), handler.PutUser)
	r.DELETE("/api/v1/user/:id", handler.AuthMiddleware(), handler.DeleteUser)

	// ROLE
	r.POST("/api/v1/role", handler.AuthMiddleware(), handler.PostRole)
	r.GET("/api/v1/role/:id", handler.AuthMiddleware(), handler.GetRole)
	r.GET("/api/v1/role", handler.AuthMiddleware(), handler.GetRoleList)
	r.PUT("/api/v1/role", handler.AuthMiddleware(), handler.PutRole)
	r.DELETE("/api/v1/role/:id", handler.AuthMiddleware(), handler.DeleteRole)

	// AUTH
	r.POST("/api/v1/login", handler.Login)
	r.POST("/api/v1/register", handler.Register)
	r.POST("/api/v1/refresh", handler.RefreshToken)

	// POST
	r.POST("/api/v1/post", handler.PostPost)
	r.GET("/api/v1/post/:id", handler.GetPost)
	r.GET("/api/v1/post", handler.GetPostList)
	r.GET("/api/v1/post/user/:id", handler.GetPostListByUser)
	r.PUT("/api/v1/post", handler.PutPost)
	r.DELETE("/api/v1/post/:id", handler.DeletePost)

	// COMMENT
	r.POST("/api/v1/comment", handler.PostComment)
	r.GET("/api/v1/comment/:id", handler.GetComment)
	r.GET("/api/v1/comment", handler.GetCommentList)
	r.GET("/api/v1/comment/user/:id", handler.GetCommentListByUser)
	r.GET("/api/v1/comment/post/:id", handler.GetCommentListByPost)
	r.PUT("/api/v1/comment", handler.PutComment)
	r.DELETE("/api/v1/comment/:id", handler.DeleteComment)

	return r
}