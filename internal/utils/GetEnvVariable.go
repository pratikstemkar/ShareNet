package utils

import (
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Not able to read env variables: %v", err)
	}
	return os.Getenv(key)
}

func ExtractUsername(email string) string {
	// Split the email address by the "@" symbol
	parts := strings.Split(email, "@")

	// The username is the first part before the "@" symbol
	username := parts[0]

	return username
}