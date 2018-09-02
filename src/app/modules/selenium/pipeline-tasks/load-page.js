const loadPage = (pipeline, url, options) => {
  pipeline.add(
    async (ctx, next) => {
      ctx.pipeline.logger.info(ctx.options.name);

      ctx.pipeline.logger.info(`Loading page: ${url}`);

      await ctx.pipeline.driver.get(url);

      ctx.pipeline.logger.info(`Page loaded`);

      next();
    },
    { name: options.name }
  );
}

export default loadPage;
