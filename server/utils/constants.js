const Roles = {
  ADMIN: 1,
  CUSTOMER: 2,
};

const RolePermissions = {
  Product: {
    Add: [Roles.ADMIN],
    Update: [Roles.ADMIN],
    Delete: [Roles.ADMIN],
  },
};

module.exports = RolePermissions;
