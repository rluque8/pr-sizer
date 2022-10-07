const { LABEL_CONFIG } = require("./config");

async function createLabelsIfNotExists(tools, labelConfig) {
    for (let { name, color } of labelConfig) {
        await createLabelIfNotExists(tools, name, { color });
    }
};

async function createLabelIfNotExists(tools, labelName, options = {}) {
    const alreadyExistsLabelToCreate = await checkIfLabelExists(tools, labelName);
    if (alreadyExistsLabelToCreate) {
        return;
    }

    try {
        tools.log.info(`Creating the label: ${labelName}`);
        await tools.github.issues.createLabel({
            ...tools.context.repo,
            name: labelName,
            color: options.color || '000000',
            request: { retries: 0 },
        });
    } catch (error) {
        tools.log.fatal(`Error while creating the label: ${error.message}`);
    }
};

async function checkIfLabelExists(tools, labelName) {
    try {
        const {
            data: repositoryLabels,
        } = await tools.github.issues.listLabelsForRepo({
            ...tools.context.repo,
        });

        return repositoryLabels.find(label => label.name === labelName);
    } catch (error) {
        tools.log.fatal(`Error checking repo labels: ${error.message}`);
        return false;
    }
};

async function isLabelAdded(tools, labelName) {
    try {
        const { data: labelsOnIssue } = await tools.github.issues.listLabelsOnIssue(
            {
                ...tools.context.repo,
                issue_number: tools.context.issue.number,
            },
        );

        return labelsOnIssue.find(labelOnIssue => labelOnIssue.name === labelName);
    } catch (error) {
        tools.log.fatal(
            `Error while checking if the label "${labelName}" was added to the repository: ${error.message}`,
        );
        return false;
    }
};

async function removeLabel(tools, labelName) {
    if (!(await isAddedLabel(tools, labelName))) {
        tools.log.info(`The label "${labelName}" was not in the issue, we don't need to remove it`);
        return;
    }
    try {
        tools.log.info(`Removing the label "${labelName}"`);
        await tools.github.issues.removeLabel({
            ...tools.context.repo,
            issue_number: tools.context.issue.number,
            name: labelName,
        });
    } catch (error) {
        tools.log.fatal(`Error while removing the label "${labelName}": ${error.message}`);
    }
};

function getLabelConfig(tools) {
    return LABEL_CONFIG(tools);
};

async function assignLabelBasedOnLineChanges(tools, lines, labelsConfig) {
    for (let { name } of labelsConfig) {
        if (await checkIfLabelExists(tools, name)) {
            await removeLabel(tools, name);
        }
    }

    // Find the label adequate for the number of line changes
    const element = labelsConfig.find((elem) => lines <= elem.size);
    if (element) {
        await addLabel(tools, element.name);
    }
};


module.exports = {
    createLabelsIfNotExists,
    createLabelIfNotExists,
    checkIfLabelExists,
    isLabelAdded,
    removeLabel,
    getLabelConfig,
    assignLabelBasedOnLineChanges
};
