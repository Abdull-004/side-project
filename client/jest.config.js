export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};
