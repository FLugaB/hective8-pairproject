"use strict";
const fs = require("fs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    const dataCourses = JSON.parse(fs.readFileSync("./data/courses.json", "utf8"));
    dataCourses.forEach((e) => {
      delete e.id;
      (e.createdAt = new Date()), (e.updatedAt = new Date());
    });
    return queryInterface.bulkInsert("Courses", dataCourses, {});
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
    return queryInterface.bulkDelete("Courses", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
