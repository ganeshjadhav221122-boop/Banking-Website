// ================= LOGIN =================

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        let username =
            document.getElementById("username").value.trim();

        let password =
            document.getElementById("password").value;


        let message =
            document.getElementById("loginMessage");


        // Empty validation

        if (username === "" || password === "") {

            message.innerText =
                "Please enter username and password.";

            message.style.color = "red";

            return;
        }


        // Demo credentials

        if (
            username === "demoUser" &&
            password === "Demo@123"
        ) {

            document
                .getElementById("loginPage")
                .classList.add("hidden");


            document
                .getElementById("bankingApp")
                .classList.remove("hidden");


            message.innerText = "";

        } else {

            message.innerText =
                "Invalid username or password.";

            message.style.color = "red";

        }

});


// ================= BALANCE =================

let balance = 75000;


function refreshBalance() {

    document
        .getElementById("balanceMessage")
        .innerText =
        "Balance updated successfully.";

    document
        .getElementById("balanceMessage")
        .style.color =
        "green";


    updateBalanceDisplay();

}


// ================= UPDATE BALANCE =================

function updateBalanceDisplay() {

    document
        .getElementById("balance")
        .innerText =
        balance.toLocaleString("en-IN");


    document
        .getElementById("balance2")
        .innerText =
        balance.toLocaleString("en-IN");

}


// ================= FUND TRANSFER =================

document
    .getElementById("transferForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        let beneficiary =
            document
            .getElementById("beneficiary")
            .value
            .trim();


        let accountNumber =
            document
            .getElementById("accountNumber")
            .value
            .trim();


        let confirmAccountNumber =
            document
            .getElementById("confirmAccountNumber")
            .value
            .trim();


        let ifsc =
            document
            .getElementById("ifsc")
            .value
            .trim();


        let amount =
            Number(
                document
                .getElementById("amount")
                .value
            );


        let transferType =
            document
            .getElementById("transferType")
            .value;


        let message =
            document
            .getElementById("transferMessage");


        // Beneficiary validation

        if (beneficiary === "") {

            showTransferError(
                "Please enter beneficiary name."
            );

            return;
        }


        // Account number validation

        if (accountNumber === "") {

            showTransferError(
                "Please enter account number."
            );

            return;
        }


        // Confirm account number

        if (
            accountNumber !==
            confirmAccountNumber
        ) {

            showTransferError(
                "Account numbers do not match."
            );

            return;
        }


        // IFSC validation

        if (ifsc === "") {

            showTransferError(
                "Please enter IFSC code."
            );

            return;
        }


        // Amount validation

        if (amount <= 0 || isNaN(amount)) {

            showTransferError(
                "Please enter a valid amount."
            );

            return;
        }


        // Balance validation

        if (amount > balance) {

            showTransferError(
                "Insufficient balance."
            );

            return;
        }


        // Transfer type

        if (transferType === "") {

            showTransferError(
                "Please select transfer type."
            );

            return;
        }


        // Confirmation

        let confirmation =
            confirm(
                "Are you sure you want to transfer ₹"
                + amount
                + "?"
            );


        if (!confirmation) {

            return;

        }


        // Deduct amount

        balance =
            balance - amount;


        updateBalanceDisplay();


        // Add transaction

        addTransaction(
            beneficiary,
            amount
        );


        // Success

        message.innerText =
            "Fund transfer successful!";

        message.style.color =
            "green";


        // Reset form

        document
            .getElementById("transferForm")
            .reset();

});


// ================= ERROR MESSAGE =================

function showTransferError(text) {

    let message =
        document
        .getElementById("transferMessage");


    message.innerText = text;

    message.style.color = "red";

}


// ================= ADD TRANSACTION =================

function addTransaction(
    beneficiary,
    amount
) {

    let table =
        document.getElementById(
            "transactionTable"
        );


    let transactionId =
        "TXN"
        + Math.floor(
            1000 + Math.random() * 9000
        );


    let row =
        document.createElement("tr");


    row.innerHTML = `

        <td>${transactionId}</td>

        <td>Transfer to ${beneficiary}</td>

        <td class="debit">
            Debit
        </td>

        <td>₹${amount.toLocaleString("en-IN")}</td>

        <td>Success</td>

    `;


    table.appendChild(row);


    document
        .getElementById("lastTransaction")
        .innerText =
        "₹" + amount.toLocaleString("en-IN");

}


// ================= SEARCH TRANSACTIONS =================

function searchTransactions() {

    let searchText =
        document
        .getElementById("transactionSearch")
        .value
        .toLowerCase();


    let rows =
        document.querySelectorAll(
            "#transactionTable tr"
        );


    rows.forEach(function(row) {

        let text =
            row.innerText.toLowerCase();


        if (
            text.includes(searchText)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


// ================= RESET TRANSFER =================

function resetTransfer() {

    document
        .getElementById("transferForm")
        .reset();


    document
        .getElementById("transferMessage")
        .innerText = "";

}


// ================= LOGOUT =================

document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {

        let confirmation =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmation) {

            return;

        }


        document
            .getElementById("bankingApp")
            .classList.add("hidden");


        document
            .getElementById("loginPage")
            .classList.remove("hidden");


        document
            .getElementById("loginForm")
            .reset();


        document
            .getElementById("loginMessage")
            .innerText =
            "Logged out successfully.";

        document
            .getElementById("loginMessage")
            .style.color =
            "green";

});