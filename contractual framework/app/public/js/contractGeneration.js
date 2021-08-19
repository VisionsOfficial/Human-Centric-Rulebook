const confirmRequest = (serviceImportId, serviceExportId, purposeId, length, purposeName) => {
    const checkedId = `checked_${purposeId}_`;
    
    let datatypes = [];

    for (let i = 0; i < length; i++) {
        const element = document.getElementById(checkedId + i);
        const checked = element.checked;
        datatypes.push({ checked, id: element.dataset.id })
    }

    const data = {
        serviceImportId,
        serviceExportId,
        purposeId,
        datatypes,
    };

    $.post({
        url: "/api/contracts/datasharing",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success(response) {
        },
        error(jqXHR, status, err) {
        }
    });

    simulateContract(purposeId, length, purposeName);
};