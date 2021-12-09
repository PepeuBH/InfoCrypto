function validacao() {
    var asterisco;

    //Verificar os campos do formulário das perguntas individualmente
    const fields = document.querySelectorAll("[required]");

    function validateField(field) {
        //Lógica para verificar se existem erros
        function verifyErrors() {
            let foundError = false;

            for (key in field.validity) {
                if (field.validity[key] && !field.validity.valid)
                    foundError = key;
            }

            return foundError;
        }

        function setCustomMessage(message) {
            if (message) {
                $(field).attr('placeholder', field.placeholder + message);
            }
        }

        return function() {
            if (verifyErrors()) {
                field.style.border = "1px solid red";

                if (!asterisco) {
                    setCustomMessage("*");
                    asterisco = true;
                }
            } else {
                field.style.border = "1px solid rgb(0, 201, 0)";
                setCustomMessage();
            }
        }
    }

    function customValidation(event) {
        const field = event.target;
        const validation = validateField(field);
        if (field.placeholder == "Primeiro nome" || field.placeholder == "Adicionar email" || field.placeholder == "Alterar senha")
            asterisco = false;
        else asterisco = true;
        validation();
    }

    for (field of fields) {
        field.addEventListener("invalid", event => {
            //Tirar o bubble
            event.preventDefault();

            customValidation(event);
        })

        field.addEventListener("blur", customValidation);
    }
}



function salvaPerfil(event) {

    event.preventDefault();


    validacaoForm();

    // // Verfica se o formulário está preenchido corretamente
    if (!$('#form-configPerfil')[0].checkValidity()) {
        return;
    }


    let nome = $("#txtnome").val();
    let sobrenome = $("#txtsobrenome").val();
    let address = $("#txtaddress").val();
    let email = $("#txtemail").val();
    let senha = $("#txtsenha").val();
    let userInfos = {
        nome: nome,
        sobrenome: sobrenome,
        address: address,
        email: email,
        senha: senha
    }

    // Adiciona o usuário no banco de dados
    updateUser(userInfos);
}

// Associar salvamento ao botao
document.getElementById('profile-button').addEventListener('click', salvaPerfil);

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
    const perfilCorrente = {};
    localStorage.setItem('usuario', JSON.stringify(perfilCorrente));
    window.location.href = LOGIN_URL;
}

const usuario = JSON.parse(localStorage.getItem('usuario'));
const usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

function updateUser(data) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = usuariosJSON.user.map(obj => obj.id).indexOf(usuario.id);

    // Altera os dados do objeto no array
    usuariosJSON.user[index].nome = data.nome,
        usuariosJSON.user[index].sobrenome = data.sobrenome,
        usuariosJSON.user[index].address = data.address,
        usuariosJSON.user[index].email = data.email,
        usuariosJSON.user[index].senha = data.senha

    const perfilCorrente = {};
    localStorage.setItem('usuario', JSON.stringify(perfilCorrente));

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
    localStorage.setItem('usuario', JSON.stringify(usuariosJSON.user[index]));

    //Recarregar a página
    location.reload();
}