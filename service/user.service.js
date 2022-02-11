const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password, avatar_url } = user;
    const statement = `INSERT INTO user (name, password, avatar_url) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [name, password, avatar_url]);

    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
