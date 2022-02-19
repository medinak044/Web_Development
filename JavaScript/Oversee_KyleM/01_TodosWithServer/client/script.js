const baseUrl = "http://localhost:3000";

// How to READ our data
$(document).ready(function () {
  let route = "users";
  let endpoint = `${baseUrl}/${route}`;
  fetch(endpoint)
    .then(function (response) {
      if (!response.ok) throw Error("Not able to get response from server");
      else return response.json();
    })
    .then(function (dataArray) {
      $("ul").empty();
      dataArray.forEach(function (user) {
        let online = user.isOnline ? "online" : "";
        $("ul").append(
          `<li data-id=${user._id} class=${online}>
            ${user.userName}
            <span><i class='far fa-trash-alt'></i></span>
          </li>`
        );
      });
    })
    .catch(function (error) {
      console.error("Issues READING from the database: ", error);
    });
});

// CREATE
$("input").keypress(function (event) {
  if (event.which === 13 && $(this).val() !== "") {
    let newUserItem = {
      userName: $(this).val(),
    };
    let endpoint = `${baseUrl}/users`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserItem),
    })
      .then(function (response) {
        if (!response.ok) throw Error("No response creating data");
        else return response.json();
      })
      .then(function (newUser) {
        $("ul").append(
          `<li data-id=${newUser._id}>${newUser.userName}<span><i class='far fa-trash-alt'></i></span></li>`
        );
        $("input").val("");
      })
      .catch(function (err) {
        console.error("Error creating data to server: ", err);
      });
  }
});



// UPDATE
$("ul").on("click", "li", function () {
  let thisId = $(this).data("id");
  let endpoint = `${baseUrl}/users/${thisId}`
  let self = this;
  fetch(endpoint, { method: "PUT" })
    .then(function (response) {
      if (!response.ok) {
        throw Error("Issues getting data from server")
      } else {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data)
      $(self).toggleClass("online");
    })
    .catch(function (error) {
      console.error("Error updating user on front end: ", error)
    })

});



// DELETE
$("ul").on("click", "span", function (event) {
  event.stopPropagation(); // needed to stop bubbling
  let thisId = $(this).parent().data("id");
  let endpoint = `${baseUrl}/users/${thisId}`
  let self = this;
  fetch(endpoint, { method: "DELETE" })
    .then(function (response) {
      if (!response.ok) throw Error("Cannot delete an item from server")
      else return response.json()
    })
    .then(function (data) {
      $(self).parent().remove();
    })
    .catch(function (error) {
      console.error("Error deleting:", error)
    })
});
