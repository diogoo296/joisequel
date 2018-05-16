const Joi = require('joi')
const _ = require('lodash')

module.exports = {
  name: 'pick',

  params: {
    key: Joi.array().items(Joi.string())
  },

  setup (params) {
    const keys = !Array.isArray(params.key) ? [params.key] : params.key
    this._inner.children = _.intersectionWith(
      this._inner.children,
      keys,
      (child, key) => child.key === key
    )
    console.log(this._inner.children)
  }
}
