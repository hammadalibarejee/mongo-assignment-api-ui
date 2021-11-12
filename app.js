function createUser() {
    let name = document.getElementById("inputName").value
    let email = document.getElementById("inputEmail").value
    let address = document.getElementById("inputAddress").value

    axios.post('https://assignment-api-mongo.herokuapp.com/user', {
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


}
function getAllUser() {

    axios.get('https://assignment-api-mongo.herokuapp.com/users')
        .then(function (response) {
            console.log(response);

            let users = response.data;

            document.getElementById("tableBody").innerHTML = ""

            users.map((eachUser, index) => {
                document.getElementById("tableBody").innerHTML +=
                    `<tr>
                                <th scope="row">${eachUser._id}</th>
                                <td><input id='${eachUser._id}inpn' style="display:none;"><span id='${eachUser._id}n'>${eachUser.name}</span></td>
                                <td><input id='${eachUser._id}inpe' style="display:none;"><span id='${eachUser._id}e'>${eachUser.email}</span></td>
                                <td><input id='${eachUser._id}inpa' style="display:none;"><span id='${eachUser._id}a'>${eachUser.address}</span></td>
                                <td>
                                    <button type="button" onclick="deleteUser('${eachUser._id}')" id="delete" class="btn btn-danger hid">delete</button>
                                    <button type="button" class="btn btn-danger hid" id="${eachUser._id}edit" onclick="editInfo('${eachUser._id}')" >Edit</button>
                                    <button type="button" style="display:none;" class="btn btn-danger" id="${eachUser._id}update" onclick="updateInfo('${eachUser._id}',${index})"  >Update</button>
                                </td>
                            </tr>`
            })
        })

}

function deleteUser(_id) {
    // alert("sgdgfg");

    axios.delete(`https://assignment-api-mongo.herokuapp.com/user/${_id}`)
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
function editInfo(id) {

    var name = document.getElementById(id + "n").innerHTML;
    document.getElementById(id + "inpn").style.display = "";
    document.getElementById(id + "inpn").value = name;
    document.getElementById(id + "n").style.display = "none";

    var email = document.getElementById(id + "e").innerHTML;
    document.getElementById(id + "inpe").style.display = "";
    document.getElementById(id + "inpe").value = email;
    document.getElementById(id + "e").style.display = "none";

    var address = document.getElementById(id + "a").innerHTML;
    document.getElementById(id + "inpa").style.display = "";
    document.getElementById(id + "inpa").value = address;
    document.getElementById(id + "a").style.display = "none";

    document.getElementById(id + "edit").style.display = "none";
    document.getElementById("delete").style.display = "none";
    document.getElementById(id + "update").style.display = "inherit";

}

function updateInfo(id, index) {
    console.log(index)
    console.log(id)


    var name = document.getElementById(id + "n").value;
    var email = document.getElementById(id + "e").value;
    var address = document.getElementById(id + "a").value;

    // if (name) { axios.put(`http://assignment-api-mongo.herokuapp.com/user/${id}`, {
    //        name
    //      })
    //      .then(res => location.reload()); }
    // if (email) { axios.put(`http://assignment-api-mongo.herokuapp.com/user/${id}`, {
    //      email }).then(res => location.reload()); }
    // if (address) { axios.put(`http://assignment-api-mongo.herokuapp.com/user/${id}`, { 
    //     address }).then(res => location.reload()); }

    axios.get("https://assignment-api-mongo.herokuapp.com/users").then((res)=>{
        document.getElementById(id + "n").value = res.data[index].name;
        document.getElementById(id + "e").value = res.data[index].email;
        document.getElementById(id + "a").value = res.data[index].address;

    updateUser(id);

    })


    axios.put(`https://assignment-api-mongo.herokuapp.com/user/${id}` ,{
    
        name,
        email,
        address
    
    }).then((res)=>{
      
        
        console.log(res)
        getAllUser();
    }).catch((e)=>{
        console.log(e)

    })

}


getAllUser();
