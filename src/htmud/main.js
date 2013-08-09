var $ = self.jQuery;

require('../magic/jquery');

var focus = $('.command input[type="text"]').event('focus');
var value = $('.command input[type="text"]').field('value');
var submit = $('.command input[type="submit"]').event('click');

focus();

submit(function () {
    console.log(value());
    
    value('');
});
