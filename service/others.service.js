const connection = require('../app/database');

class UserService {
  async getUserList() {
    const statement = `SELECT * FROM words;`;
    const result = await connection.execute(statement);
    return result[0];
  }

  async addWord(word) {
    console.log(word);
    const result1 = await this.getUserList();
    const words = result1[0].words;

    const statement = `UPDATE words SET words = ? WHERE id = 1;`;
    const [result] = await connection.execute(statement, [words + '、' + word]);

    // const result = await connection.execute(statement1, [word]);

    // console.log(words);
    return result[0];
  }
}

module.exports = new UserService();
