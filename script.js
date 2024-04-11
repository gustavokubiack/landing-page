document.addEventListener("DOMContentLoaded", function() {
    var navbarItems = document.querySelectorAll('.nav-link');

    navbarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var sectionId = item.getAttribute('href'); 
            var section = document.querySelector(sectionId);
            var sectionPos = section.offsetTop;

            var offset = 80;
            window.scroll({
                top: sectionPos - offset, 
                behavior: "smooth"
            });
        });
    });
});


document.getElementById('btn-enviar').addEventListener('click', function(e) {
    e.preventDefault();
    
    var btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.disabled = true;
    
    btnEnviar.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

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
                onClose: () => {
                    location.reload();
                }
            }).then(() => {
                document.getElementById('nome').value = '';
                document.getElementById('email').value = '';
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
    })
    .finally(() => {
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = 'Enviar';
    });
});

