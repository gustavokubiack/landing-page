document.addEventListener("DOMContentLoaded", function() {
    var navbarItems = document.querySelectorAll('.nav-link');

    navbarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            var section = document.querySelector(item.getAttribute('href'));
            var sectionPos = section.offsetTop;

            window.scroll({
                top: sectionPos,
                behavior: "smooth"
            });
        });
    });
});

document.getElementById('btn-enviar').addEventListener('click', function(e) {
    e.preventDefault()
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;

    var formData = new FormData();
    formData.append('name', nome);
    formData.append('email', email);

    fetch('http://localhost:8000/send-email/', {
        method: 'POST',
        body: formData, 
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Seu e-mail foi enviado com sucesso.',

            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Houve um erro ao enviar o e-mail. Por favor, tente novamente mais tarde.',

            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Houve um erro ao enviar o e-mail. Por favor, tente novamente mais tarde.',
        });
    });
});
