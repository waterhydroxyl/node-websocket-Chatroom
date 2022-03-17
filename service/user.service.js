const connection = require('../app/database');

class UserService {
  async create(user) {
    const { name, password, avatar_url } = user;
    const statement = `INSERT INTO user (name, password, avatar_url) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [name, password, avatar_url]);

    return result[0];
  }

  async getUserByName(name, cellphone, status) {
    const statement = `SELECT * FROM user WHERE WHERE name LIKE '%(?)%' AND cellphone LIKE '%?%' AND status LIKE'%?';`;
    const result = await connection.execute(statement, [name, cellphone, status]);

    return result[0];
  }

  async getUserList() {
    const statement = `SELECT * FROM user;`;
    const result = await connection.execute(statement);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }

  async updateBan(ban, userid) {
    const statement = `UPDATE user SET ban = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [ban, userid]);
    return result;
  }
}

module.exports = new UserService();
