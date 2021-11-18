"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Courses", "CategoryId", {
      type: Sequelize.INTEGER,
      reference: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Courses", "CategoryId", Sequelize.INTEGER, {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
