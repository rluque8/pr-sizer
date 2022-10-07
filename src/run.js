const {
    assignLabelBasedOnLineChanges,
    createLabelsIfNotExists,
    getLabelConfig
} = require("./label");

async function run(tools) {
    const { inputs } = tools;

    const labelsConfig = getLabelConfig(inputs);
    await createLabelsIfNotExists(tools, labelsConfig);

    const lines = await getLinesChanged(tools);

    await assignLabelBasedOnLineChanges(tools, lines, labelsConfig);
}

async function getLinesChanged(tools) {
    try {
        const { data: filesChanged } = await tools.github.pulls.listFiles({
            ...tools.context.repo,
            pull_number: tools.context.payload.pull_request.number,
        });
        
        const numberOfLines = filesChanged.reduce((accumulator, file) => {
            return accumulator + file.changes;
        }, 0);
        tools.log.info(`Total number of lines changed: ${numberOfLines}`);

        return numberOfLines;
    } catch (error) {
        tools.log.fatal(`Error while counting lines changed: ${error.messsage}`);
    }
}

module.exports = {
    run,
};