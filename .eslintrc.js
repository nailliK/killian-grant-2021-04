module.exports = {
	root: true,
	env: {
		node: true
	},
	parser: "vue-eslint-parser",
	parserOptions: {
		project: "./tsconfig.json",
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		ecmaVersion: 2018
	},
	plugins: [
		"vue"
	],
	extends: [
		"plugin:vue/vue3-essential",
		"@vue/typescript",
		"plugin:@typescript-eslint/recommended-requiring-type-checking"
	],
	rules: {
		"brace-style": [
			"error",
			"1tbs"
		],
		"comma-dangle": [
			"error",
			"never"
		],
		"comma-spacing": [
			"error",
			{
				"before": false,
				"after": true
			}
		],
		"computed-property-spacing": [
			"error",
			"never"
		],
		"eqeqeq": [
			"error",
			"always"
		],
		"func-style": [
			"error",
			"expression"
		],
		"multiline-ternary": [
			"error",
			"never"
		],
		"no-var": "error",
		"object-property-newline": "error",
		"quote-props": [
			"error",
			"consistent"
		],
		"quotes": [
			"error",
			"double",
			{"allowTemplateLiterals": true}
		],
		"semi": [
			"error",
			"always"
		],
		"@typescript-eslint/consistent-type-definitions": [
			"error",
			"interface"
		],
		// All functions need return type
		"@typescript-eslint/explicit-function-return-type": "error",
		// Allow unknown return types
		"@typescript-eslint/no-unsafe-return": "off",
		// Allow object['property'] access
		"@typescript-eslint/no-unsafe-member-access": "off",
		// Allow object['property'] assignment
		"@typescript-eslint/no-unsafe-assignment": "off",
		// Allow `${variables} in strings`
		"@typescript-eslint/restrict-template-expressions": "off",
		// Allow access to functions on native objects, arrays, etc
		"@typescript-eslint/no-unsafe-call": "off",
		// Allow floating promises (for now)
		"@typescript-eslint/no-floating-promises": "off",
		// Allow + operands
		"@typescript-eslint/restrict-plus-operands": "off",
		// Enforce assertion style
		"@typescript-eslint/consistent-type-assertions": [
			"error",
			{
				assertionStyle: "angle-bracket",
				objectLiteralTypeAssertions: "allow"
			}
		],
		// Enforce type definition on variables
		"@typescript-eslint/typedef": [
			"error",
			{
				"arrowParameter": true,
				"variableDeclaration": true
			}
		],

		// Allow returning computed refs based off of component properties
		"vue/no-dupe-keys": "off",

		// we should always disable console logs and debugging in production
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
	}
};
