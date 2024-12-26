/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@scure|@noble|@ethereumjs)/)", // Ensure relevant modules are transformed
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore build artifacts
  collectCoverage: true, // Optional: Collect code coverage
  coverageDirectory: "coverage",
  preset: "ts-jest", // Use ts-jest preset for TypeScript
};
