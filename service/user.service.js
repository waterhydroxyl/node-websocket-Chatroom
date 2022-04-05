const connection = require('../app/database');

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

  async getUserList(name, cellphone, status, createAtB, createAtE) {
    console.log(createAtB, createAtE);
    if (!createAtB || !createAtE) {
      createAtB = '1970-01-01 00:00:00';
      createAtE = '2099-01-01 00:00:00';
    }
    // const statement = `SELECT * FROM user WHERE name LIKE '%?%' AND cellphone LIKE '%?%' AND status LIKE'%?;`;
    const statement = `SELECT * FROM user WHERE name LIKE '%${name}%' AND cellphone LIKE '%${cellphone}%' AND status LIKE'%${status}' AND (createAt BETWEEN  '${createAtB}' AND '${createAtE}');`;
    console.log(statement);
    const result = await connection.execute(statement);

    return result[0];
  }

  // async getUserList() {
  //   const statement = `SELECT * FROM user;`;
  //   const result = await connection.execute(statement);
  //   return result[0];
  // }

  async updateUserInfoById(name, cellphone, password, userId, status) {
    console.log(name, cellphone, password, userId, status);
    // const statement = `UPDATE user SET name = ?,  WHERE id = ?;`;
    const statement = `UPDATE user SET name = ?, cellphone = ?, password = ? , status = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [
      name,
      cellphone,
      password,
      status,
      userId,
    ]);
    return result;
  }

  async updateBan(ban, userid) {
    const statement = `UPDATE user SET ban = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [ban, userid]);
    return result;
  }
}

module.exports = new UserService();
