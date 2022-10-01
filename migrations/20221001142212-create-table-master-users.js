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
    CREATE TABLE MasterUsers (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

      email VARCHAR(255),
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,

      useType VARCHAR(10),
      lastName VARCHAR(255),
      firstName VARCHAR(255),

      status VARCHAR(10) DEFAULT 'inactive',

      updatedDate DATETIME,
      deletedDate DATETIME,
      createdDate DATETIME NOT NULL
    )
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DROP TABLE MasterUsers
  `);
};

exports._meta = {
  "version": 1
};
