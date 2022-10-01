'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE RolePermissions (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      roleId INT NOT NULL,
      permissionId INT NOT NULL,

      updatedDate DATETIME,
      deletedDate DATETIME,
      createdDate DATETIME NOT NULL,

      CONSTRAINT Foreign_Key_Roles FOREIGN KEY (roleId) REFERENCES Roles(id),
      CONSTRAINT Foreign_Key_Permissions FOREIGN KEY (permissionId) REFERENCES Permissions(id)
    )
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DROP TABLE RolePermissions
  `);
};

exports._meta = {
  "version": 1
};
