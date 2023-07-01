package models

import (
	"time"

	"github.com/google/uuid"
)

// Users Model
type User struct {
	User_Id uuid.UUID `json:"user_id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Username string `json:"username"`
	Password string `json:"password"`
	Pfp_Url string `json:"pfp_url"`
	Roles []Role `json:"roles" gorm:"many2many:user_roles;"`
	CreatedAt time.Time
}

// Role Model
type Role struct {
	Role_Id uuid.UUID `json:"role_id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Rolename string `json:"rolename"`
}