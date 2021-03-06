$(function(){
  function buildHTML(message){

    message.image? image_tag = message.image : image_tag = "";

    var html = `<div class="message">
                  <div class="message__info">
                    <div class="message__info__user-name">
                      <p>
                        ${message.user_name}
                      </p>
                    </div>
                    <div class="message__info__date">
                       ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                  <img class="lower-message__image" src=${image_tag}>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html)
    $('.form_text').val('')
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
  })
  .fail(function(){
    alert("メッセージを入力してください");
  })
  .always(function(){
    $('.submit-btn').prop('disabled', false);
  })
})
});