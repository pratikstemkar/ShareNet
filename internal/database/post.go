package database

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/pratikstemkar/matchup/internal/models"
)

func CreatePost(post *models.Post) (*models.Post, error) {
	res := DB.Create(post)
	if res.RowsAffected == 0 {
		return &models.Post{}, errors.New("post not created")
	}
	return post, nil
}

func ReadPost(post_id string) (*models.Post, error) {
	var post models.Post
	res := DB.Find(&post, "id = ?", post_id)
	if res.RowsAffected == 0 {
		return nil, errors.New("post not found")
	}
	return &post, nil
}

func ReadPostByUser(user_id string) ([]*models.Post, int, error) {
	var postList []*models.Post
	res := DB.Order("created_at desc").Find(&postList, "user_id = ?", user_id)
	if res.RowsAffected == 0 {
		return nil, 0, errors.New("post not found")
	}
	var count int
	err := DB.Model(&models.Post{}).Where("user_id = ?", user_id).Count(&count).Error
	if err != nil {
		return nil, 0, err
	}
	return postList, count, nil
}

func ReadPostList() ([]*models.Post, error) {
	var postList []*models.Post
	res := DB.Model(&models.Post{}).Order("created_at desc").Find(&postList)
	if res.Error != nil {
		return nil, errors.New("post list not found")
	}
	return postList, nil
}

func UpdatePost(post *models.Post) (*models.Post, error) {
	var updatePost models.Post
	res := DB.Model(&updatePost).Where("id = ?", post.Id).Updates(post)
	if res.RowsAffected == 0 {
		return &models.Post{}, errors.New("post not updated")
	}
	return &updatePost, nil
}

func UpvotePost(upvote *models.Upvote) (*models.Upvote, error) {
	res := DB.Create(upvote)
	if res.RowsAffected == 0 {
		return &models.Upvote{}, errors.New("upvote not created")
	}
	err := DB.Model(&models.Post{}).Where("id = ?", upvote.Post_Id).UpdateColumn("upvotes", gorm.Expr("upvotes + ?", 1)).Error
	if err != nil {
		return nil, err
	}
	return upvote, nil
}

func DownvotePost(downvote *models.Downvote) (*models.Downvote, error) {
	res := DB.Create(downvote)
	if res.RowsAffected == 0 {
		return &models.Downvote{}, errors.New("downvote not created")
	}
	err := DB.Model(&models.Post{}).Where("id = ?", downvote.Post_Id).UpdateColumn("downvotes", gorm.Expr("downvotes + ?", 1)).Error
	if err != nil {
		return nil, err
	}
	return downvote, nil
}

func DeletePost(post_id string) error {
	var deletePost models.Post
	res := DB.Model(&deletePost).Where("id = ?", post_id).Delete(&deletePost)
	if res.RowsAffected == 0 {
		return errors.New("post not deleted")
	}
	return nil
}