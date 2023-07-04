package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pratikstemkar/matchup/internal/services"
)

// Middleware to authenticate routes
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Perform authentication logic here
		// For example, check if the user is logged in or if a valid token is present

		// If authentication fails, abort the request with an error response
		if !isUserAuthenticated(c) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
			c.Abort()
			return
		}

		// Authentication successful, continue to the next middleware or route handler
		c.Next()
	}
}

// Function to check if the user is authenticated
func isUserAuthenticated(c *gin.Context) bool {
	// Example: Check if the user is logged in or if a valid token is present
	// You can implement your authentication logic here

	// For demonstration purposes, assume authentication is successful if the request contains a valid token
	token := c.GetHeader("Authorization")

	_, err := services.ValidateAccessToken(token)
	return err == nil
}
