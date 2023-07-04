package services

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/utils"
)

func CreateAccessToken(user_id string, expTime time.Duration) (string, error) {
	user, err := database.ReadUser(user_id)
	if err != nil {
		return "", fmt.Errorf(err.Error())
	}

	var roles []string
	for _, role := range user.Roles{
		roles = append(roles, role.Rolename)
	}
	
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
	jwt.MapClaims{
		"user_id": user_id,
		"roles": roles,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(expTime).Unix(),
	})

	// Sign the token with the secret key
	signedToken, err := token.SignedString([]byte(utils.GetEnvVariable("SECRET")))
	if err != nil {
		return "", fmt.Errorf("failed to sign token: %v", err)
	}

	return signedToken, nil
}

func CreateRefreshToken(user_id string, expTime time.Duration) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
	jwt.MapClaims{
		"user_id": user_id,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(expTime).Unix(),
	})

	// Sign the token with the secret key
	signedToken, err := token.SignedString([]byte(utils.GetEnvVariable("SECRET")))
	if err != nil {
		return "", fmt.Errorf("failed to sign token: %v", err)
	}

	return signedToken, nil
}

func CreateTokenPair(user_id string) (string, string, error) {
	// Create access token
	accessToken, err := CreateAccessToken(user_id, time.Minute*15)
	if err != nil {
		return "" ,"", fmt.Errorf(err.Error())
	}

	// Create refresh token
	refreshToken, err := CreateRefreshToken(user_id, time.Hour*24*7)
	if err != nil {
		return "", "", fmt.Errorf(err.Error())
	}

	return accessToken, refreshToken, nil
}

type RefreshTokenClaims struct {
	User_Id string `json:"user_id"`
	Exp int64 `json:"exp"`
	jwt.RegisteredClaims
}

// validateRefreshToken validates the refresh token and returns the claims
func ValidateRefreshToken(refreshToken string) (*RefreshTokenClaims, error) {
	// Parse the refresh token
	token, err := jwt.ParseWithClaims(refreshToken, &RefreshTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.GetEnvVariable("SECRET")), nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to parse refresh token: %v", err)
	}

	// Verify token signature
	if !token.Valid {
		return nil, fmt.Errorf("refresh token is invalid")
	}

	// Extract and validate custom claims
	claims, ok := token.Claims.(*RefreshTokenClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("refresh token claims are invalid")
	}

	// Check if the token is expired
	if claims.Exp < time.Now().UTC().Unix() {
		return nil, fmt.Errorf("refresh token has expired")
	}

	return claims, nil
}

type AccessTokenClaims struct {
	User_Id string `json:"user_id"`
	Roles []string `json:"roles"`
	Exp int64 `json:"exp"`
	jwt.RegisteredClaims
}

// validateAccessToken validates the access token and returns the claims
func ValidateAccessToken(accessToken string) (*AccessTokenClaims, error) {
	// Parse the access token
	token, err := jwt.ParseWithClaims(accessToken, &AccessTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.GetEnvVariable("SECRET")), nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to parse refresh token: %v", err)
	}

	// Verify token signature
	if !token.Valid {
		return nil, fmt.Errorf("refresh token is invalid")
	}

	// Extract and validate custom claims
	claims, ok := token.Claims.(*AccessTokenClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("refresh token claims are invalid")
	}

	// Check if the token is expired
	if claims.Exp < time.Now().UTC().Unix() {
		return nil, fmt.Errorf("access token has expired")
	}

	return claims, nil
}