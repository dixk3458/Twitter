import SQ from 'sequelize';

import { User } from '../data/auth.js';
import { db, sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// 존속된다. 자동으로 user의 primary key인 userid를 외래키로 사용한다.
Post.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: { model: User, attributes: [] },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};
// 두개의 연관있는 테이블을 조인해서 읽어야한다.
export async function getAll() {
  return Post.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
  });
}

export async function getAllByUsername(username) {
  return Post.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: { ...INCLUDE_USER.include, where: { username: username } },
  });
}

export async function getById(id) {
  return Post.findOne({
    ...INCLUDE_USER,
    where: { id: id },
  });
}

export async function create(text, userId) {
  return Post.create({ text, userId }).then(data =>
    getById(data.dataValues.id)
  );
}

export async function update(id, text) {
  // return Post.findByPk(id, INCLUDE_USER).then(post => {
  //   post.text = text;
  //   return post.save(); // 업데이트된 post 자신을 반환해준다.
  // });

  return Post.update(
    {
      text: text,
    },
    {
      where: {
        id: id,
      },
    }
  ).then(() => getById(id));
}

export async function remove(id) {
  // return Post.findByPk(id).then(post => {
  //   post.destroy();
  // });
  return Post.destroy({
    where: {
      id: id,
    },
  });
}
