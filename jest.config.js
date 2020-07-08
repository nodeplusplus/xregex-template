module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/constants.ts",
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
