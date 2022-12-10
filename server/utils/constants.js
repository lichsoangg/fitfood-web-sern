
const RolePermissions = {
    Employee: {
        Get: ["Admin"],
        Update: ["Admin"],
        Add: ["Admin"]
    },
    ProductType: {
        Update: ["Admin"],
        Add: ["Admin"],
        Delete: ["Admin"],
    },
    Product: {
        Add: ["Admin", "Kinh doanh"],
        Update: ["Admin", "Kinh doanh"],
        Delete: ["Admin", "Kinh doanh"],
    }
}

module.exports = RolePermissions