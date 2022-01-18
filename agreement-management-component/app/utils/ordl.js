module.exports = {

    /**
     * Builds the permission object matching the json-ld format
     * @param {string} type The permission @type property
     * @param {string} dataset The UID of the dataset
     * @param {string} provider The UID of the data provider
     * @param {string} consumer The UID of the data consumer
     * @param {string} action The action of the permission, ex: use, play, display...
     * @param {string} purpose The UID of the purpose acting as refinement of the action
     * @returns {object} The built permission
     */
    buildPermission: async (type = "Agreement", dataset, provider, consumer, action, purpose) => {
        let permission = {
					"@context": "http://www.w3.org/ns/odrl.jsonld",
                    "@type": type                    
				};

        if (dataset)
            permission.target = dataset.uid;

        if (provider)
            permission.assigner = provider.uid;

        if (consumer)
            permission.assignee = provider.uid;

        permission.action = [{
            action: action,
        }]

        if (purpose)
            permission.action.refinement = [{
                "leftOperand": "purpose",
                "operator": "eq",
                "rightOperand": purpose.uid
            }]

        console.log(permission)

        return permission;
    }
}