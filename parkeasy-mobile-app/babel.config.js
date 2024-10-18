module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      "nativewind/babel",
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
    ],
    overrides: [
      {
        test: (fileName) =>
          !fileName.includes("node_modules/react-native-maps"),
        plugins: [["@babel/plugin-transform-private-methods", { loose: true }]],
      },
    ],
  };
};
