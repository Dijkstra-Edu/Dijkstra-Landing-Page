/**
 * Specialization icons shared with Dijkstra Web (public/specializations/**).
 * The leaf GitHub teams map one-to-one onto Dijkstra Web's career paths
 * (Dijkstra-Web/data/career-paths.ts), so both use the same artwork.
 */
const base = "/specializations";

export const SPECIALIZATION_ICONS = {
  FRONTEND: `${base}/Developers/FRONTEND.png`,
  BACKEND: `${base}/Developers/BACKEND.png`,
  FULLSTACK: `${base}/Developers/FULLSTACK.png`,
  DATA_ENGINEERING: `${base}/AIML/DATA_ENGINEERING.png`,
  DATA_SCIENCE_ANALYSIS: `${base}/AIML/DATA_SCIENCE_ANALYSIS.png`,
  ML_ENGINEERING: `${base}/AIML/ML_ENGINEERING.png`,
  ML_RESEARCH: `${base}/AIML/ML_RESEARCH.png`,
  GAME_DEV: `${base}/PC/GAME_DEV.png`,
  CROSS_PLATFORM_PC: `${base}/PC/CROSS_PLATFORM_PC.png`,
  LINUX: `${base}/PC/LINUX.png`,
  MACOS: `${base}/PC/MACOS.png`,
  WINDOWS: `${base}/PC/WINDOWS.png`,
  ANDROID: `${base}/Mobile/ANDROID.png`,
  IOS: `${base}/Mobile/IOS.png`,
  CROSS_PLATFORM_MOBILE: `${base}/Mobile/CROSS_PLATFORM_MOBILE.png`,
  COMPILERS: `${base}/Systems/COMPILERS.png`,
  COMPUTER_SYSTEMS: `${base}/Systems/COMPUTER_SYSTEMS.png`,
  EMBEDDED_IOT: `${base}/Systems/EMBEDDED_IOT.png`,
  SOFTWARE_INFRASTRUCTURE: `${base}/Infrastructure/SOFTWARE_INFRASTRUCTURE.png`,
  CI_CD: `${base}/Infrastructure/CI_CD.png`,
  CLOUD: `${base}/Infrastructure/CLOUD.png`,
  DEVOPS: `${base}/Infrastructure/DEVOPS.png`,
  MLOPS: `${base}/Infrastructure/MLOPS.png`,
  SITE_RELIABILITY: `${base}/Infrastructure/SITE_RELIABILITY.png`,
  APPLICATION_SECURITY: `${base}/Security/APPLICATION_SECURITY.png`,
  PLATFORM_SECURITY: `${base}/Security/PLATFORM_SECURITY.png`,
  DEVSECOPS: `${base}/Security/DEVSECOPS.png`,
  QUALITY_ASSURANCE: `${base}/Testers/QUALITY_ASSURANCE.png`,
  SDE_TEST: `${base}/Testers/SDE_TEST.png`,
  TEST_AUTOMATION: `${base}/Testers/TEST_AUTOMATION.png`,
  UI_UX: `${base}/Alternatives/UI_UX.png`,
  TECHNICAL_WRITING: `${base}/Alternatives/TECHNICAL_WRITING.png`,
  PRODUCT_MANAGEMENT: `${base}/Alternatives/PRODUCT_MANAGEMENT.png`,
  PRODUCT_ENGINEERING: `${base}/Alternatives/PRODUCT_ENGINEERING.png`,
} as const;
