package models

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	Id    uuid.UUID `json:"id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	User_Id  uuid.UUID `json:"user_id" gorm:"type:uuid"`
	User     User      `gorm:"foreignKey:User_Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Upvotes    int       `json:"upvotes"`
	Downvotes  int       `json:"downvotes"`
	CreatedAt  time.Time  
	UpdatedAt  time.Time  
	Comments   []Comment `json:"comments" gorm:"foreignkey:Post_Id;constraint:OnDelete:CASCADE;"`
	Comment_Count int       `json:"comment_count"`
	Is_Deleted  bool      `json:"isDeleted"`
}

type Comment struct {
	Id uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Content    string    `json:"content"`
	User_Id  uuid.UUID `json:"user_id" gorm:"type:uuid"`
	User     User      `gorm:"foreignKey:user_id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post_Id    uuid.UUID `json:"post_id" gorm:"type:uuid;"`
	Post       Post      `gorm:"foreignKey:post_id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Parent_Id  uuid.UUID `json:"parent_id" gorm:"type:uuid;"`
	CreatedAt  time.Time  
	UpdatedAt  time.Time  
	Upvotes    int       `json:"upvotes"`
	Downvotes  int       `json:"downvotes"`
	Reply_Count int       `json:"reply_count"`
	Is_Deleted  bool      `json:"is_deleted"`
}