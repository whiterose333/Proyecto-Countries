const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
    },
    duration: {
        type: DataTypes.STRING,
    },
    season: {
        type: DataTypes.ENUM('Summer','Autumn', 'Winter', 'Spring'), 
    },
    
  },{timestamps: false});
};


