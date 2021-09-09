const simulateContract = (contract) => {

    const serviceExport = contract.serviceExport;
    const serviceImport = contract.serviceImport;

    $("#modalContract").modal({show: true});

    $("#i-name").text(serviceImport.name);
    $("#i-reg").text(serviceImport.governance.registration);
    $("#i-addr").text(serviceImport.governance.registeredOfficeAddress);
    $("#i-lg-name").text(serviceImport.governance.legalRepresentative.name);
    $("#i-lg-email").text(serviceImport.governance.legalRepresentative.email);
    $("#i-lg-profession").text(serviceImport.governance.legalRepresentative.profession);
    $("#i-dpo-name").text(serviceImport.governance.dataProtectionOfficer.name);
    $("#i-dpo-email").text(serviceImport.governance.dataProtectionOfficer.email);

    $("#e-name").text(serviceExport.name);
    $("#e-reg").text(serviceExport.governance.registration);
    $("#e-addr").text(serviceExport.governance.registeredOfficeAddress);
    $("#e-lg-name").text(serviceExport.governance.legalRepresentative.name);
    $("#e-lg-email").text(serviceExport.governance.legalRepresentative.email);
    $("#e-lg-profession").text(serviceExport.governance.legalRepresentative.profession);
    $("#e-dpo-name").text(serviceExport.governance.dataProtectionOfficer.name);
    $("#e-dpo-email").text(serviceExport.governance.dataProtectionOfficer.email);

    for (const ds of contract.dataSharing) {
        let html = "";
        html += `
            <h4>Purpose :</h4>
            <h5 class="text-primary">${ds.purpose.name}</h5>
            <hr>
            <h4>DataTypes :</h4>
            <table class="table table-striped">
                <tbody>`;

        for (const datatype of ds.datatypes) {
            html += `
                <td class="text-primary">${datatype.name}</td>
            `;
        }

        html += `</tbody>
            </table>
            <h5><b>Terms of Use</b></h5>
            <table class="table table-striped">
        `;

        for (const condition of ds.termsOfUse) {
            html += `
                <tr>
                    <td><b>Audit</b></td>
                    <td>${condition.audit}</td>
                </tr>
                <tr>
                    <td><b>Confidential Information</b></td>
                    <td>${condition.confidentialInformation}</td>
                </tr>
                <tr>
                    <td><b>Data protection</b></td>
                    <td>${condition.dataProtection}</td>
                </tr>
                <tr>
                    <td><b>Intellectual Property Rights</b></td>
                    <td>${condition.intellectualPropertyRights}</td>
                </tr>
                <tr>
                    <td><b>Reporting</b></td>
                    <td>${condition.reporting}</td>
                </tr>
                <tr>
                    <td><b>Restrictions</b></td>
                    <td>${condition.restrictions}</td>
                </tr>
                <tr>
                    <td><b>Other Terms</b></td>
                    <td>${condition.otherTerms}</td>
                </tr>
            
            `;
        }

        html += `</table>`;


        document.getElementById("agreements").innerHTML += html;
    }

    document.getElementById("sign").addEventListener('click', function() {
        eth_sign(contract._id)
    })

    document.getElementById("view").addEventListener('click', function() {
        location.href = "/contracts/view/"+contract._id;
    })
}