const { default: tsJest } = require('ts-jest');

module.exports = {
    createTransformer: (...args) => {
        const transformer = tsJest.createTransformer(...args);
        const process = transformer.process.bind(transformer);
        transformer.process = (...args) => {
            let result = process(...args);

            // Ignore decorators on methods and properties
            result.code = result.code.replace(
                /__decorate/g,
                '/* istanbul ignore next */__decorate',
            );

            // When constructor parameters have decorated properties (eg @inject), TS adds
            // a typeof branch check, which we don't want to instrument
            result.code = result.code.replace(
                /(?<=__metadata\("design:paramtypes".*?)(typeof \(_\w\s*=)/g,
                '/* istanbul ignore next */$1',
            );
            return result;
        };
        return transformer;
    },
};
