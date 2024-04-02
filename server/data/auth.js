import SQ, { TEXT } from 'sequelize';
import { db, sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: TEXT,
      allowNull: true,
    },
  },
  { timestamps: false }
);

export async function findByUsername(username) {
  return User.findOne({ where: { username: username } });
}

export async function findById(id) {
  return User.findByPk(id);
}
export async function createUser(user) {
  return User.create(user).then(data => data.dataValues.id);
}
