package app

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/transport/rest"
	"github.com/pratikstemkar/matchup/internal/utils"
)

var DB *gorm.DB

func init(){
	DB = database.ConnectDB()
}

func App() {
	fmt.Println("This is app")

	r := rest.SetupRouter()
	r.Run(":"+utils.GetEnvVariable("PORT"))

	defer DB.Close()
}