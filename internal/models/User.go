package models

import (
	"time"

	"github.com/google/uuid"
)

// User Model
type User struct {
	Id uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name string `json:"name"`
	Bio string `json:"bio"`
	Username string `json:"username" gorm:"unique"`
	Email string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	Image string `json:"image"`
	Roles []Role `json:"roles" gorm:"many2many:user_roles;constraint:OnDelete:CASCADE;"`
	Posts []Post `json:"posts" gorm:"foreignKey:user_id"`
	Comments []Comment `json:"comments" gorm:"foreignKey:user_id"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Role Model
type Role struct {
	Id uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name string `json:"name" gorm:"unique"`
	Users      []User `json:"users" gorm:"many2many:user_roles;"`
    CreatedAt  time.Time
	UpdatedAt time.Time
}