package database

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/pratikstemkar/matchup/internal/models"
	"github.com/pratikstemkar/matchup/internal/utils"
)

var DB *gorm.DB
var err error

func ConnectDB() *gorm.DB {
	var (
		host     = utils.GetEnvVariable("DB_HOST")
		port     = utils.GetEnvVariable("DB_PORT")
		user     = utils.GetEnvVariable("DB_USER")
		dbname   = utils.GetEnvVariable("DB_NAME")
		password = utils.GetEnvVariable("DB_PASSWORD")
	)

	conn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
       host,
       port,
       user,
       dbname,
       password,
   )

   DB, err = gorm.Open("postgres", conn)
   if err != nil {
	log.Printf("Postgres connection failed: %v", err)
   }

   // Execute SQL command to enable the UUID extension
	_ = DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

   fmt.Println("DB connected!")

   DB.AutoMigrate(models.User{}, models.Role{}, models.Post{}, models.Comment{})

   return DB
}