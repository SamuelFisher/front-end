function login() {
    var username = $('#username-modal').val();
    var password = $('#password-modal').val();
    $.ajax({
        url: "login",
        type: "GET",
        async: false,
        success: function (data, textStatus, jqXHR) {
            alert("Logged in as " + username);
            console.log('posted: ' + textStatus);
            console.log("logged_in cookie: " + $.cookie('logged_in'));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Problem with your login credentials. " + errorThrown);
            console.log('error: ' + JSON.stringify(jqXHR));
            console.log('error: ' + textStatus);
            console.log('error: ' + errorThrown);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        }
    });
}

function register() {
    var username = $('#register-username-modal').val();
    var email = $('#register-email-modal').val();
    var password = $('#register-password-modal').val();
    var firstName = $('#register-first-modal').val();
    var lastName = $('#register-last-modal').val();
    var postvals = JSON.stringify({
		"username": username,
		"password": password,
		"email": email,
		"firstName": firstName,
		"lastName": lastName
	});
	console.log(postvals);
    $.ajax({
        url: "register",
        type: "POST",
        async: false,
	data: postvals,
        success: function (data, textStatus, jqXHR) {
            alert("Logged in as " + username);
            console.log('posted: ' + textStatus);
            console.log("logged_in cookie: " + $.cookie('logged_in'));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Problem with your registration. " + errorThrown);
            console.log('error: ' + JSON.stringify(jqXHR));
            console.log('error: ' + textStatus);
            console.log('error: ' + errorThrown);
        },
    });
}

function logout() {
    $.removeCookie('logged_in');
    location.reload();
}

function setNewPageSize(value) {
    location.search = $.query.set("page", 1).set("size", value);
}

function setNewPage(value) {
    location.search = $.query.set("page", value);
}

function setNewTags(value) {
    location.search = $.query.set("tags", value);
}

function resetTags() {
    location.search = $.query.remove("tags");
}

function order() {
    if (!$.cookie('logged_in')) {
        alert("You must be logged in to place an order.");
        return false;
    }

    var success = false;
    $.ajax({
        url: "orders",
        type: "POST",
        async: false,
        success: function (data, textStatus, jqXHR) {
            if (jqXHR.status == 201) {
                console.log("Order placed.");
                alert("Order placed!");
                deleteCart();
                success = true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error: ' + JSON.stringify(jqXHR));
            console.log('error: ' + textStatus);
            console.log('error: ' + errorThrown);
            if (jqXHR.status == 406) {
                alert("Error placing order. Payment declined.");
            }
        }
    });
    return success;
}

function deleteCart() {
    $.ajax({
        url: "cart",
        type: "DELETE",
        async: true,
        success: function (data, textStatus, jqXHR) {
            console.log("Cart deleted.");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error: ' + JSON.stringify(jqXHR));
            console.log('error: ' + textStatus);
            console.log('error: ' + errorThrown);
        }
    });
}

function addToCart(id) {
    console.log("Sending request to add to cart: " + id);
    $.ajax({
        url: "cart",
        type: "POST",
        data: JSON.stringify({"id": id}),
        success: function (data, textStatus, jqXHR) {
            console.log('Item added: ' + id + ', ' + textStatus);
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Could not add item: ' + id + ', due to: ' + textStatus + ' | ' + errorThrown);
        }
    });
}

function username(id, callback) {
    console.log("Requesting user account information " + id);
    $.ajax({
        url: "customers/" + id,
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            json = JSON.parse(data);
            if (json.status_code !== 500) {
                callback(json.firstName + " " + json.lastName);
            } else {
                console.error('Could not get user information: ' + id + ', due to: ' + json.status_text + ' | ' + json.error);
                return callback(undefined);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Could not get user information: ' + id + ', due to: ' + textStatus + ' | ' + errorThrown);
        }
    });
}
