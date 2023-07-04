package database

import (
	"errors"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/pratikstemkar/matchup/internal/models"
)

func CreateUser(user *models.User) (*models.User, error) {
	// fmt.Println("User roles:")
	roles_copy := user.Roles
	user.Roles = []models.Role{}
	for _, user_role := range roles_copy {
		// fmt.Println(user_role.Rolename)
		var role models.Role
		DB.FirstOrCreate(&role, user_role)
		user.Roles = append(user.Roles, role)
		// fmt.Print(role)
	}
	// fmt.Print(user)
	res := DB.Create(user)
	if res.RowsAffected == 0 {
		return &models.User{}, errors.New("user not created")
	}
	return user, nil
}

func ReadUser(user_id string) (*models.User, error) {
	var user models.User
	res := DB.Preload("Roles").Find(&user, "user_id = ?", user_id)
	if res.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func ReadUserByEmail(email string) (*models.User, error) {
	var user models.User
	res := DB.Preload("Roles").Find(&user, "email = ?", email)
	if res.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func ReadUserList() ([]*models.User, error) {
	var userList []*models.User
	// res := DB.Find(&userList)
	res := DB.Model(&models.User{}).Preload("Roles").Find(&userList)
	if res.Error != nil {
		return nil, errors.New("user list not found")
	}
	return userList, nil
}

func UpdateUser(user *models.User) (*models.User, error) {
	var updateUser models.User
	// fmt.Println("User roles:")
	roles_copy := user.Roles
	user.Roles = []models.Role{}
	for _, user_role := range roles_copy {
		// fmt.Println(user_role.Rolename)
		var role models.Role
		DB.FirstOrCreate(&role, user_role)
		user.Roles = append(user.Roles, role)
		// fmt.Print(role)
	}
	res := DB.Model(&updateUser).Where("user_id = ?", user.User_Id).Updates(user)
	if res.RowsAffected == 0 {
		return &models.User{}, errors.New("user not updated")
	}
	return &updateUser, nil
}

func DeleteUser(user_id string) error {
	var deleteUser models.User
	res := DB.Model(&deleteUser).Where("user_id = ?", user_id).Delete(&deleteUser)
	_ = DB.Exec("DELETE FROM public.user_roles WHERE user_user_id = ?;", user_id)
	if res.RowsAffected == 0 {
		return errors.New("user not deleted")
	}
	return nil
}