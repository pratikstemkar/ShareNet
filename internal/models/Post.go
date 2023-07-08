package models

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	Id    uuid.UUID `json:"id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	UserId  string `json:"userId"`
	User     User      `gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Upvotes    int       `json:"upvotes"`
	Downvotes  int       `json:"downvotes"`
	CreatedAt  time.Time  
	UpdatedAt  time.Time  
	Comments   []Comment `json:"comments" gorm:"foreignkey:Post_Id;constraint:OnDelete:CASCADE;"`
	CommentCount int       `json:"comment_count"`
	IsDeleted  bool      `json:"isDeleted"`
}

type Comment struct {
	Id uuid.UUID `json:"id" gorm:"primary_key;type:uuid;default:uuid_generate_v4()"`
	Content    string    `json:"content"`
	UserId  string `json:"userId"`
	User     User      `gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	PostId    uuid.UUID `json:"postId" gorm:"type:uuid;"`
	Post       Post      `gorm:"foreignKey:Post_Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ParentId  uuid.UUID `json:"parentId" gorm:"type:uuid;"`
	CreatedAt  time.Time  
	UpdatedAt  time.Time  
	Upvotes    int       `json:"upvotes"`
	Downvotes  int       `json:"downvotes"`
	ReplyCount int       `json:"replyCount"`
	IsDeleted  bool      `json:"isDeleted"`
}