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
    CREATE TABLE UserSessions (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,

      token VARCHAR(255) NOT NULL,
      tokenExpireDate DATETIME NOT NULL,

      refreshToken VARCHAR(255) NOT NULL,
      refreshTokenExpireDate VARCHAR(255) NOT NULL,

      userAgent VARCHAR(255) NOT NULL,
      status VARCHAR(10) DEFAULT 'exprired',

      updatedDate DATETIME,
      deletedDate DATETIME,
      createdDate DATETIME NOT NULL,

      CONSTRAINT Foreign_Key_UserSession FOREIGN KEY (userId) REFERENCES Users(id) 
    );

    CREATE INDEX UserSessions_Indexes ON UserSessions (
      status,
      userId
    );
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DROP TABLE UserSessions
  `);
};

exports._meta = {
  "version": 1
};
