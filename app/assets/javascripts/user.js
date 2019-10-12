$(document).on('turbolinks:load', function(){
  $(function() {

    var search_list = $("#user-search-result");
    var member_list = $("#member_search_result");

    function appendUsers(user) {
      var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.user_id }" data-user-name="${ user.name }">追加</div>
                </div>`

      search_list.append(html);
    }

    function appendMembers(user_name, user_id) {
      var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-users'>
                  <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</divi>
                </div>`
      member_list.append(html);
    }

    function appendNoUsers() {
      var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">検索結果はありません。</p>
                </div>`

      search_list.append(html);
    }

    $(function(){
      $("#user-search-field").on("keyup", function() {
        var input = $("#user-search-field").val();
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json',
        })

        .done(function(users) {
          $("#user-search-result").empty();
            if (users.length !== 0) {
              users.forEach(function(user){
              appendUsers(user);
              });
            }
            else {
              appendNoUsers()("一致するユーザーはいません");
            }
          })
        .fail(function() {
          alert('ユーザー検索に失敗しました');
        })
      });

      $(function(){
        $(document).on('click', '.user-search-add', function() {
          var name = $(this).data("user-name");
          var user_id = $(this).data("user-id");
          $(this).parent().remove();
          appendMembers(name, user_id);
        });

  　    $(document).on("click", '.user-search-remove', function() {
          $(this).parent().remove();
        });
      });
    });
  });
});