package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/securecookie"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/models"
	"github.com/pratikstemkar/matchup/internal/services"
	"github.com/pratikstemkar/matchup/internal/utils"
	"golang.org/x/crypto/bcrypt"
)

// @route /api/v1/register
// @desc Register new user & get Token
// @access Public
func Register(c *gin.Context) {
	var body struct {
		Email string
		Password string
		Roles []models.Role
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body.",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash Password.",
		})
		return
	}

	user := models.User{Username: utils.ExtractUsername(body.Email), Email: body.Email, Password: string(hash), Roles: body.Roles, Image: utils.GetEnvVariable("PFP")}
	_, err = database.CreateUser(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create User.",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User Created",
	})
}

var cookieHandler = securecookie.New(
    securecookie.GenerateRandomKey(64),
    securecookie.GenerateRandomKey(32),
)


func setAccessTokenCookie(c *gin.Context, accessToken string) {
    value := map[string]string{
        "access_token": accessToken,
    }
    encodedValue, err := cookieHandler.Encode("cookie-name", value)
    if err != nil {
        // Handle the error
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
        return
    }

    cookie := &http.Cookie{
        Name:     "cookie-name",
        Value:    encodedValue,
        Path:     "/",
        HttpOnly: true,
    }
    http.SetCookie(c.Writer, cookie)
}


// @route /api/v1/login
// @desc Authenticate user & get Token
// @access Public
func Login(c *gin.Context) {
	// Get the email & pass
	var body struct {
		Email string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body.",
		})
		return
	}

	// Look up user
	user, err := database.ReadUserByEmail(body.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email/password.",
		})
		return
	}

	// Compare pass & hash
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email/password 2.",
		})
		return
	}

	accessTokenString, err := services.CreateAccessToken(user.Id.String(), time.Minute*15)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "access token not generated",
		})
		return
	}
	refreshTokenString, err := services.CreateRefreshToken(user.Id.String(), time.Hour*24*7)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "refresh token not generated",
		})
		return
	}

	c.SetCookie("access_token", accessTokenString, 3600*24, "/", "localhost", false, true)

	// Send it back
	c.JSON(http.StatusOK, gin.H{
		"access_token": accessTokenString,
		"refresh_token": refreshTokenString,
	})
}

type MyCustomClaims struct {
	User_Id string `json:"user_id"`
	Exp int64 `json:"exp"`
	jwt.RegisteredClaims
}

// @route /api/v1/refresh
// @desc Get access token by Refresh Token
// @access Public
func RefreshToken(c *gin.Context) {
	// Get Refresh Token
	var body struct {
		Refresh_Token string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body.",
		})
		return
	}

	fmt.Println(body.Refresh_Token)

	claims, err := services.ValidateRefreshToken(body.Refresh_Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "token validation failed",
		})
		return
	}

	accessToken, refreshToken, err := services.CreateTokenPair(claims.User_Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Send it back
	c.JSON(http.StatusOK, gin.H{
		"access_token": accessToken,
		"refresh_token": refreshToken,
	})

}