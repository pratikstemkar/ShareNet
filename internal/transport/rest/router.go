package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/transport/rest/handlers"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", handlers.Home)

	return r
}