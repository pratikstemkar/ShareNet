package database

import (
	"errors"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/pratikstemkar/matchup/internal/models"
)

func CreateRole(role *models.Role) (*models.Role, error) {
	res := DB.Create(role)
	if res.RowsAffected == 0 {
		return &models.Role{}, errors.New("role not created")
	}
	return role, nil
}

func ReadRole(role_id string) (*models.Role, error) {
	var role models.Role
	res := DB.First(&role, "role_id = ?", role_id)
	if res.RowsAffected == 0 {
		return nil, errors.New("role not found")
	}
	return &role, nil
}

func ReadRoleList() ([]*models.Role, error) {
	var roleList []*models.Role
	res := DB.Find(&roleList)
	if res.Error != nil {
		return nil, errors.New("role list not found")
	}
	return roleList, nil
}

func UpdateRole(role *models.Role) (*models.Role, error) {
	var updateRole models.Role
	res := DB.Model(&updateRole).Where("role_id = ?", role.Role_Id).Updates(role)
	if res.RowsAffected == 0 {
		return &models.Role{}, errors.New("role not updated")
	}
	return &updateRole, nil
}

func DeleteRole(role_id string) error {
	var deleteUser models.Role
	res := DB.Model(&deleteUser).Where("role_id = ?", role_id).Delete(&deleteUser)
	if res.RowsAffected == 0 {
		return errors.New("role not deleted")
	}
	return nil
}