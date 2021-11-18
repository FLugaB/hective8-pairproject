"use strict";
const fs = require("fs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    const dataCategories = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"));
    dataCategories.forEach((e) => {
      delete e.id;
      (e.createdAt = new Date()), (e.updatedAt = new Date());
    });
    return queryInterface.bulkInsert("Categories", dataCategories, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
