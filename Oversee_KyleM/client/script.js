const baseUrl = "http://localhost:3000";

// How to READ our data
$(document).ready(function () {
  let route = "todos";
  let endpoint = `${baseUrl}/${route}`;
  fetch(endpoint)
    .then(function (response) {
      if (!response.ok) throw Error("Not able to get response from server");
      else return response.json();
    })
    .then(function (dataArray) {
      $("ul").empty();
      dataArray.forEach(function (todo) {
        let completed = todo.isComplete ? "completed" : "";
        $("ul").append(
          `<li data-id=${todo._id} class=${completed}>
            ${todo.description}
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
    let newTodoItem = {
      description: $(this).val(),
    };
    let endpoint = `${baseUrl}/todos`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoItem),
    })
      .then(function (response) {
        if (!response.ok) throw Error("No response creating data");
        else return response.json();
      })
      .then(function (newTodo) {
        $("ul").append(
          `<li data-id=${newTodo._id}>${newTodo.description}<span><i class='far fa-trash-alt'></i></span></li>`
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
  let endpoint = `${baseUrl}/todos/${thisId}`
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
      $(self).toggleClass("completed");
    })
    .catch(function (error) {
      console.error("Errore updating todo on front end: ", error)
    })

});



// DELETE
$("ul").on("click", "span", function (event) {
  event.stopPropagation(); // needed to stop bubbling
  let thisId = $(this).parent().data("id");
  let endpoint = `${baseUrl}/todos/${thisId}`
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
