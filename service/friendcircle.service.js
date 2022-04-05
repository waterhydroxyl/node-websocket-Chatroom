const connection = require('../app/database');

class FriendService {
  async create(name, picUrl, content) {
    const statement = `INSERT INTO friendCircle (name, picUrl, content) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [name, picUrl, content]);
    return result;
  }

  async updateLike(id) {
    console.log(id);
    const statement = `UPDATE friendCircle SET like = like + 1 WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getFriendCircleList() {
    console.log('getFriendCircleList');
    const statement = `SELECT *, friendCircle.id AS id, friendCircle.createAt AS createAt FROM friendCircle Left JOIN user ON user.name = friendCircle.name ORDER BY friendCircle.createAt DESC;`;

    const [result] = await connection.execute(statement);
    return result;
  }
}

module.exports = new FriendService();
