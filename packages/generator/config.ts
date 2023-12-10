export default {
  zod: {
    outputPath: '/server/src/constants/zodSchema/modelSchema',
  },
  trpc: {
    outputPath: '/generator/output/trpc',
    zodImportPath: '@server/constants/zodSchema/modelSchema',
  },
  umi: {
    outPutPath: '/generator/output/umi',
  },
};
