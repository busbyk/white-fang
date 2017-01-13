$( document ).ready(function() {
  var avatarContainerOpen = false;

  // dynamically set width and height of avatar container element
  var avatarContainerWidth = $(window).width() * .7;
  var avatarContainerHeight = $(window).height() * .7;
  $('#avatar-container').width(avatarContainerWidth);
  $('#avatar-container').height(avatarContainerHeight);

  var avatarImgHeight = $('#avatar-container').height() - $('#avatar-header').height() - 20; //it's slightly off -_-
  $('#avatar-img').height(avatarImgHeight);

  // handle toggle of avatar container element
  $('#avatar-container-toggle').click(function() {
    if(avatarContainerOpen) { //hide it
      $('#avatar-container').animate({'right': ($(window).width() * -.7)}, 300, function() {
        $(this).css({'box-shadow':'none'});
      });
      avatarContainerOpen = false;
    } else { //show it
      $('#avatar-container').css({'box-shadow':'-5px 5px 2px #888888'}).animate({'right':'0'}, 300);
      avatarContainerOpen = true;
    }
  });
});

function showWhiteFang() {

}
