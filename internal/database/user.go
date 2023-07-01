package database

import (
	"errors"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/pratikstemkar/matchup/internal/models"
)

func CreateUser(user *models.User) (*models.User, error) {
	res := DB.Create(user)
	if res.RowsAffected == 0 {
		return &models.User{}, errors.New("user not created")
	}
	return user, nil
}

func ReadUser(user_id string) (*models.User, error) {
	var user models.User
	res := DB.First(&user, "user_id = ?", user_id)
	if res.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func ReadUserList() ([]*models.User, error) {
	var userList []*models.User
	res := DB.Find(&userList)
	if res.Error != nil {
		return nil, errors.New("user list not found")
	}
	return userList, nil
}

func UpdateUser(user *models.User) (*models.User, error) {
	var updateUser models.User
	res := DB.Model(&updateUser).Where("user_id = ?", user.User_Id).Updates(user)
	if res.RowsAffected == 0 {
		return &models.User{}, errors.New("user not updated")
	}
	return &updateUser, nil
}

func DeleteUser(user_id string) error {
	var deleteUser models.User
	res := DB.Model(&deleteUser).Where("user_id = ?", user_id).Delete(&deleteUser)
	if res.RowsAffected == 0 {
		return errors.New("user not deleted")
	}
	return nil
}