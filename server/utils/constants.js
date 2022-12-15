
const RolePermissions = {
    Employee: {
        Get: ["Admin"],
        Update: ["Admin"],
        Add: ["Admin"]
    }
}

module.exports = RolePermissions