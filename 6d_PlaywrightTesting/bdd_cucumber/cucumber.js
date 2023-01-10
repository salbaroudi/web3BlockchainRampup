const common = `
    --require setup/assertions.js
    --require setup/hooks.js
    --require step-defitions/**/*.step.js
`
//NGL, Cucumber setup and running looks kinda ugly. But its a one time thing.
module.exports = {
  default: `${common} features/**/*.feature`,
}
