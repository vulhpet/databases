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
    CREATE TABLE Roles (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      roleType VARCHAR(50) NOT NULL,
      resource VARCHAR(50) NOT NULL,

      updatedDate DATETIME,
      deletedDate DATETIME,
      createdDate DATETIME NOT NULL
    );

    CREATE INDEX Roles_Indexs ON Roles (
      roleType
    )
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DROP TABLE Roles
  `);
};

exports._meta = {
  "version": 1
};
