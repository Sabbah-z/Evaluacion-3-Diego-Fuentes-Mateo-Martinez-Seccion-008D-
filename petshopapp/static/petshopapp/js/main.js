$(document).ready(function() {
  $('#contactForm').on('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    function showError(inputId, errorId, message) {
      if ($(inputId).val().trim() === '') {
        $(errorId).text(message);
        isValid = false;
      } else {
        $(errorId).text('');
      }
    }

    showError('#nombre', '#nombreError', 'Por favor ingrese su nombre.');
    showError('#apellido', '#apellidoError', 'Por favor ingrese su apellido.');

    if ($('#email').val().trim() === '') {
      $('#emailError').text('Por favor ingrese su email.');
      isValid = false;
    } else if (!validateEmail($('#email').val().trim())) {
      $('#emailError').text('El correo debe tener el formato abc@dominio.etc.');
      isValid = false;
    } else {
      $('#emailError').text('');
    }

    showError('#mensaje', '#mensajeError', 'Por favor ingrese el mensaje que desee enviar.');

    if (isValid) {
      $('#successMessage').text('Formulario enviado con éxito!! :D.');
    } else {
      $('#successMessage').text('');
    }
  });

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  $('.añadir_al_carro').click(function(event) {
    event.preventDefault();
    const url = $(this).attr('href');
    
    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        const message = $('<div class="alert alert-success">Producto agregado :D</div>').hide().fadeIn(300).delay(1500).fadeOut(300);
        $('body').append(message);
      },
      error: function() {
        const message = $('<div class="alert alert-danger">Error al agregar el producto :(. Intente de nuevo.</div>').hide().fadeIn(300).delay(1500).fadeOut(300);
        $('body').append(message);
      }
    });
  });


  $('body').on('click', '.eliminar_producto', function(event) {
    event.preventDefault();
    const url = $(this).attr('href');
    const row = $(this).closest('tr');

    $.ajax({
      url: url,
      type: 'GET',
      success: function(response) {
        row.remove();
        actualizarTotal();
      },
      error: function() {
        alert('Error al eliminar el producto. Intente de nuevo.');
      }
    });
  });

  function actualizarTotal() {
    let total = 0;
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const price = parseFloat(row.cells[1].textContent.replace('$', '').replace('.', ''));
      const quantity = parseInt(row.cells[2].textContent);
      total += price * quantity;
    });
    document.querySelector('thead th[scope="col"]').textContent = 'Total: $' + total.toLocaleString('de-DE');
  }

});