
var params = new URLSearchParams(window.location.search);
var divUSer=$('#divUsuarios');
var form=$('#formENviar');
var input=$('#txtMensaje');
function renderizarUsuarios(personas){
    var cad='<li><a href="javascript:void(0)" class="active"> Chat de <span>'+params.get('sala')+' </span></a></li>';

    for(var i=0;i<personas.length;i++)
        cad+=' <li><a data-id="'+personas[i].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+personas[i].nombre+'<small class="text-success">online</small></span></a>\n </li>';

    divUSer.html(cad);
    $('h3.box-title').text('Sala de chat '+params.get('sala'));
    $('#divUsuarios li a').on('click',function(){
        console.log('id'+$(this).attr('data-id'));
    });
}

function redenrizarMEnsajes(mensaje,yo){
    //mensajes azules otras persona, mis mensajes blancos
    var fecha=new Date(mensaje.fecha);
    var hora=fecha.getHours()+':'+fecha.getMinutes();
    var adminCLass='info';
    if(mensaje.nombre==='Administrador'){
        adminCLass='danger';
    }
    var cad='';
    if(yo){
        cad=' <li class="reverse">' +

            '<div class="chat-content">' +
            '<h5>'+mensaje.nombre+'</h5>' +
            '<div class="box bg-light-inverse">'+mensaje.mensaje+'</div>' +
            '</div>' +
            '<div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>' +
            '<div class="chat-time">'+hora+'</div>' +
            '</li>';
    }else{
        cad='      <li class="animated fadeIn">' +
            ' <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>' +
            '<div class="chat-content">' +
            '<h5>'+mensaje.nombre+'</h5>' +
            '<div class="box bg-light'+adminCLass+'">'+mensaje.mensaje+'</div>' +
            '</div>' +
            '<div class="chat-time">'+hora+'</div>' +
            '</li>';

    }

    $('#divChatbox').append(cad);

}
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}
$('button').on('click',function(){
    if(input.val().trim().length===0){
        return;
    }
    socket.emit('crearMensaje', {
    nombre: params.get('nombre'),
     mensaje: input.val()
}, function(resp) {
     input.val('').focus();
        redenrizarMEnsajes(resp,true);
        scrollBottom();
 });

});