package models

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	Post_Id    uuid.UUID `json:"post_id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	User_Id  uuid.UUID `json:"user_id" gorm:"type:uuid;default:uuid_generate_v4()"`
	User     User      `gorm:"foreignKey:User_Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Score      int       `json:"score"`
	Upvotes    int       `json:"upvotes"`
	Downvotes  int       `json:"downvotes"`
	CreatedAt  time.Time  
	UpdatedAt  time.Time  
	Comments   []Comment `json:"comments" gorm:"foreignkey:Post_Id;constraint:OnDelete:CASCADE;"`
	CommentCount int       `json:"comment_count"`
	IsDeleted  bool      `json:"is_deleted"`
}

type Comment struct {
	Comment_Id uuid.UUID `json:"comment_id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Content    string    `json:"content"`
	User_Id  uuid.UUID `json:"user_id" gorm:"type:uuid;default:uuid_generate_v4()"`
	User     User      `gorm:"foreignKey:User_Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Post_Id    uuid.UUID `json:"post_id" gorm:"type:uuid;default:uuid_generate_v4()"`
	Post       Post      `gorm:"foreignKey:Post_Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Parent_Id  uuid.UUID `json:"parent_id" gorm:"type:uuid;default:uuid_generate_v4()"`
	CreatedAt  time.Time  
	UpdatedAt  time.Time  
	Upvotes    int       `json:"upvotes"`
	Downvotes  int       `json:"downvotes"`
	ReplyCount int       `json:"reply_count"`
	IsDeleted  bool      `json:"is_deleted"`
}