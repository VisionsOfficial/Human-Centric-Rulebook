// Sample data for examples
const serviceImport = {
    name: "Import service name",
    governance: {
        registration: "Registration info (Import)",
        registeredOfficeAddress: "Registered address info (Import)",
        legalRepresentative: {
            name: "Legal representative name (Import)",
            email: "Legal representative email (Import)",
            profession: "Legal representative profession (Import)",
        },
        dataProtectionOfficer: {
            name: "Data protection officer name (Import)",
            email: "Data protection officer email (Import)",
        }
    }
}

const serviceExport = {
    name: "Export service name",
    governance: {
        registration: "Registration info (Export)",
        registeredOfficeAddress: "Registered address info (Export)",
        legalRepresentative: {
            name: "Legal representative name (Export)",
            email: "Legal representative email (Export)",
            profession: "Legal representative profession (Export)",
        },
        dataProtectionOfficer: {
            name: "Data protection officer name (Export)",
            email: "Data protection officer email (Export)",
        }
    }
}


const simulateContract = (purposeId, length, purposeName) => {

    $("#modalContract").modal({show: true});

    $("#i-name").text($("#serviceImportName").val());
    $("#i-reg").text(serviceImport.governance.registration);
    $("#i-addr").text(serviceImport.governance.registeredOfficeAddress);
    $("#i-lg-name").text(serviceImport.governance.legalRepresentative.name);
    $("#i-lg-email").text(serviceImport.governance.legalRepresentative.email);
    $("#i-lg-profession").text(serviceImport.governance.legalRepresentative.profession);
    $("#i-dpo-name").text(serviceImport.governance.dataProtectionOfficer.name);
    $("#i-dpo-email").text(serviceImport.governance.dataProtectionOfficer.email);

    $("#e-name").text($("#serviceExportName").val());
    $("#e-reg").text(serviceExport.governance.registration);
    $("#e-addr").text(serviceExport.governance.registeredOfficeAddress);
    $("#e-lg-name").text(serviceExport.governance.legalRepresentative.name);
    $("#e-lg-email").text(serviceExport.governance.legalRepresentative.email);
    $("#e-lg-profession").text(serviceExport.governance.legalRepresentative.profession);
    $("#e-dpo-name").text(serviceExport.governance.dataProtectionOfficer.name);
    $("#e-dpo-email").text(serviceExport.governance.dataProtectionOfficer.email);

    $("#p-name").text(purposeName);

    const dt_container = document.getElementById("datatypes");
    dt_container.innerHTML = "";
    const checkedId = `checked_${purposeId}_`;

    for (let i = 0; i < length; i++) {
        const element = document.getElementById(checkedId + i);

        if(element.checked) {
            const td = document.createElement("td");
            td.innerText = element.dataset.name;
            dt_container.appendChild(td);
        }
    }
};