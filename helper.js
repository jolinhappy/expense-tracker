//add helper for index page's category
const Handlebars = require('handlebars')
Handlebars.registerHelper('ifEquals', function (category, selectedCategory, options) {
  if (category === selectedCategory) {
    return options.fn(this)
  }
  return options.inverse(this)
})