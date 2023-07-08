package database

import (
	"errors"

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
	res := DB.Find(&post, "post_id = ?", post_id)
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
	res := DB.Model(&updatePost).Where("post_id = ?", post.Id).Updates(post)
	if res.RowsAffected == 0 {
		return &models.Post{}, errors.New("post not updated")
	}
	return &updatePost, nil
}

func DeletePost(post_id string) error {
	var deletePost models.Post
	res := DB.Model(&deletePost).Where("post_id = ?", post_id).Delete(&deletePost)
	if res.RowsAffected == 0 {
		return errors.New("post not deleted")
	}
	return nil
}