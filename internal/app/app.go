package app

import (
	"fmt"

	"github.com/pratikstemkar/matchup/internal/transport/rest"
	"github.com/pratikstemkar/matchup/internal/utils"
)

func App() {
	fmt.Println("This is app")

	r := rest.SetupRouter()
	r.Run(":"+utils.GetEnvVariable("PORT"))
}