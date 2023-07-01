package app

import (
	"fmt"

	"github.com/pratikstemkar/matchup/internal/database"
	"github.com/pratikstemkar/matchup/internal/transport/rest"
	"github.com/pratikstemkar/matchup/internal/utils"
)

func init(){
	database.ConnectDB()
}

func App() {
	fmt.Println("This is app")

	r := rest.SetupRouter()
	r.Run(":"+utils.GetEnvVariable("PORT"))
}