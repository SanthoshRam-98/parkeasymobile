const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const blacklist = require("metro-config/src/defaults/exclusionList");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.sourceExts.push("cjs");
  const { transformer, resolver } = config;

  // Detect if building for web or mobile
  const isWeb = process.env.EXPO_PLATFORM === "web";

  if (!isWeb) {
    // Only apply the svg transformer when not building for web
    config.transformer = {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };
    config.resolver = {
      ...resolver,
      assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...resolver.sourceExts, "svg"],
    };
  }

  return config;
})();
