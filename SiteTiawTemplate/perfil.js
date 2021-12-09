var user = JSON.parse(localStorage.getItem('usuario'));

window.addEventListener('load', function() {
    perfil(user);
    exibePerfil(user);
});




function exibePerfil(user) {
    let nome = `${user.nome}`;
    let sobrenome = `${user.sobrenome}`;
    let email = `${user.email}`;
    let address = `${user.address}`

    // Substitui as linhas do corpo dos inputs
    $('#txtnome').val(nome);
    $('#txtsobrenome').val(sobrenome);
    $('#txtaddress').val(address);
    $('#txtemail').val(email);
}