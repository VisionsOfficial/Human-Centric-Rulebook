module.exports = {
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