module.exports = () => ({
    plugins: [
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require("postcss-nesting")(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require("postcss-color-function")(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require("autoprefixer")(),
    ],
});
