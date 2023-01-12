module.exports = function (eleventyConfig, pluginNamespace) {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addShortcode('respimg', (path, alt, sizes, classList, lightbox=false) => {
      const fetchBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/fetch/`;
      const src = `${fetchBase}q_auto,f_auto,w_${eleventyConfig.fallbackWidth}/${path}`;
      const srcset = eleventyConfig.srcsetWidths.map(w => {
        return `${fetchBase}q_auto,f_auto,w_${w}/${path} ${w}w`;
      }).join(', ');

      if (lightbox) {
        return `<a href="${path}"><img src="${src}" srcset="${srcset}" sizes="${sizes ? sizes : '100vw'}" alt="${alt ? alt : ''}" ${classList ? 'class="' + classList + '"' : ""} ${eleventyConfig.lazyLoad ? 'loading="lazy"' : ""}></a>`;
      }
      return `<img src="${src}" srcset="${srcset}" sizes="${sizes ? sizes : '100vw'}" alt="${alt ? alt : ''}" ${classList ? 'class="' + classList + '"' : ""} ${eleventyConfig.lazyLoad ? 'loading="lazy"' : ""}>`;
    });
  });
};
