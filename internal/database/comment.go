package database

import (
	"errors"

	"github.com/jinzhu/gorm"
	"github.com/pratikstemkar/matchup/internal/models"
)

func CreateComment(comment *models.Comment) (*models.Comment, error) {
	res := DB.Create(comment)
	if res.RowsAffected == 0 {
		return &models.Comment{}, errors.New("comment not created")
	}
	err := DB.Model(&models.Post{}).Where("id = ?", comment.Post_Id).UpdateColumn("comment_count", gorm.Expr("comment_count + ?", 1)).Error
	if err != nil {
		return nil, err
	}
	return comment, nil
}

func ReadComment(comment_id string) (*models.Comment, error) {
	var comment models.Comment
	res := DB.Find(&comment, "id = ?", comment_id)
	if res.RowsAffected == 0 {
		return nil, errors.New("comment not found")
	}
	return &comment, nil
}

func ReadCommentByUser(user_id string) ([]*models.Comment, int, error) {
	var commentList []*models.Comment
	res := DB.Order("created_at desc").Find(&commentList, "user_id = ?", user_id)
	if res.RowsAffected == 0 {
		return nil, 0, errors.New("comment not found")
	}
	var count int
	err := DB.Model(&models.Comment{}).Where("user_id = ?", user_id).Count(&count).Error
	if err != nil {
		return nil, 0, err
	}
	return commentList, count, nil
}

func ReadCommentByPost(post_id string) ([]*models.Comment, int, error) {
	var commentList []*models.Comment
	res := DB.Order("created_at desc").Find(&commentList, "post_id = ?", post_id)
	if res.RowsAffected == 0 {
		return nil, 0, errors.New("comment not found")
	}
	var count int
	err := DB.Model(&models.Comment{}).Where("post_id = ?", post_id).Count(&count).Error
	if err != nil {
		return nil, 0, err
	}
	return commentList, count, nil
}

func ReadCommentList() ([]*models.Comment, error) {
	var commentList []*models.Comment
	res := DB.Order("created_at desc").Find(&commentList)
	if res.Error != nil {
		return nil, errors.New("comment list not found")
	}
	return commentList, nil
}

func UpdateComment(comment *models.Comment) (*models.Comment, error) {
	var updateComment models.Comment
	res := DB.Model(&updateComment).Where("id = ?", comment.Id).Updates(comment)
	if res.RowsAffected == 0 {
		return &models.Comment{}, errors.New("comment not updated")
	}
	return &updateComment, nil
}

func DeleteComment(comment_id string) error {
	var deleteComment models.Comment
	res := DB.Model(&deleteComment).Where("id = ?", comment_id).Delete(&deleteComment)
	if res.RowsAffected == 0 {
		return errors.New("comment not deleted")
	}
	return nil
}