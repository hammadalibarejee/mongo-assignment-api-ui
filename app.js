let name = document.getElementById("inputName").value
let email = document.getElementById("inputEmail").value
let address = document.getElementById("inputAddress").value

axios.post('http://assignment-api-mongo.herokuapp.com/user', {
    name, email, address
})
    .then(function (response) {
        console.log(response);

        document.getElementById("inputName").value = ""

        getAllUser()

        document.getElementById("alert").innerHTML =
            `<div class="alert alert-success" role="alert">
                            User Created Success!
                        </div>`

        setTimeout(() => {
            document.getElementById("alert").innerHTML = ""
        }, 3000);

    })

    

function getAllUser() {

    axios.get('http://assignment-api-mongo.herokuapp.com/users')
        .then(function (response) {
            console.log(response);

            let users = response.data;

            document.getElementById("tableBody").innerHTML = ""

            users.map((eachUser, index) => {
                document.getElementById("tableBody").innerHTML +=
                    `<tr>
                                <th scope="row">${eachUser._id}</th>
                                <td>${eachUser.name}</td>
                                <td>${eachUser.email}</td>
                                <td>${eachUser.address}</td>
                                <td>
                                    <button type="button" onclick="deleteUser('${eachUser._id}')" class="btn btn-danger">delete</button>
                                </td>
                            </tr>`
            })
        })

}

function deleteUser(_id) {
    alert("sgdgfg");

    axios.delete(`http://assignment-api-mongo.herokuapp.com/user/${_id}`)
        .then(function (response) {
            console.log(response);

            getAllUser();

            document.getElementById("alert").innerHTML =
                `<div class="alert alert-danger" role="alert">
                            User Deleted Success!
                        </div>`

            setTimeout(() => {
                document.getElementById("alert").innerHTML = ""
            }, 3000);

        })
}



getAllUser();
