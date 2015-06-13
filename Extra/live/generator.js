$(document).ready(function () {
    function check_for_captcha($html, $captcha) {
        if ($captcha == 1) {
            $random_1 = Math.ceil(Math.random() * 5);
            $random_2 = Math.ceil(Math.random() * 4);
            $random_3 = Math.ceil(Math.random() * 5);
            $random_4 = Math.ceil(Math.random() * 4);
            $answer = $random_1 + $random_2;
            $html = '\n\t\t<li>';
            $html += '\n\t\t\t<span>' + $random_1 + ' + ' + $random_2 + ' =</span>';
            $html += '\n\t\t\t<div>';
            $html += '\n\t\t\t\t<input class="captcha" type="text" name="captcha" answer="' + $random_3 + $answer + $random_4 + '" message="Security question is incorrect." validation="captcha" />';
            $html += '\n\t\t\t</div>';
            $html += '\n\t\t</li>';
            return $html;
        } else {
            return '';
        }
    }
 	$('.form.generator input').on('keypress',function(e){
		if((e.keyCode ? e.keyCode : e.which)==13){
			validate_form($(this).parents('.form').children('ul').children('li').children('button'));
		}
	});
    $('.form.generator button').on('click', function () {
		validate_form($(this));
	});
	function validate_form($this){
        var $form = $this.parents('.form');
        if ($form.children('ul').children('li').children('div').children('input[name="captcha"]').length != 0) {
            var $answer = $form.children('ul').children('li').children('div').children('input[name="captcha"]').attr('answer').substring(1, 2);
        }
        var $data = [];
        var $error = false;
        var $fade_time = $('input[name="hidden_duration"]').val();
        $form.children('ul').children('li').each(function () {
            var $message = 'Field is required.';
            var $div = $(this).children('div');
            if ($div.children('input').attr('validation') == 'empty') {
                if ($div.children('input').val() == '') {
                    $error = true;
                    if ($div.children('input').attr('message')) $message = $div.children('input').attr('message');
                    if ($div.children('p').length == 0) {
                        $div.append('<p style="display:none;">' + $message + '</p>');
                        $div.children('p').fadeIn($fade_time);
                    } else {
                        $div.children('p').css('display', 'none').html($message);
                        $div.children('p').fadeIn($fade_time);
                    }
                } else {
                    $div.children('p').remove();
                }
            }
            if ($div.children('textarea').attr('validation') == 'empty') {
                if ($div.children('textarea').val() == '') {
                    $error = true;
                    if ($div.children('textarea').attr('message')) $message = $div.children('textarea').attr('message');
                    if ($div.children('p').length == 0) {
                        $div.append('<p style="display:none;">' + $message + '</p>');
                        $div.children('p').fadeIn($fade_time);
                    } else {
                        $div.children('p').css('display', 'none').html($message);
                        $div.children('p').fadeIn($fade_time);
                    }
                } else {
                    $div.children('p').remove();
                }
            }
            if ($div.children('input').attr('validation') == 'email') {
                if (($div.children('input').val().length < 4) || (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($div.children('input').val()))) {
                    $error = true;
                    if ($div.children('input').attr('message')) $message = $div.children('input').attr('message');
                    if ($div.children('p').length == 0) {
                        $div.append('<p style="display:none;">' + $message + '</p>');
                        $div.children('p').fadeIn($fade_time);
                    } else {
                        $div.children('p').css('display', 'none').html($message);
                        $div.children('p').fadeIn($fade_time);
                    }
                } else {
                    $div.children('p').remove();
                }
            }
            if ($div.children('input').attr('validation') == 'numeric') {
                var $regex = /^\d+$/;
                var $float = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
                var $value = $div.children('input').val();
                if (!$regex.test($value) || !$float.test($value)) {
                    $error = true;
                    if ($div.children('input').attr('message')) $message = $div.children('input').attr('message');
                    if ($div.children('p').length == 0) {
                        $div.append('<p style="display:none;">' + $message + '</p>');
                        $div.children('p').fadeIn($fade_time);
                    } else {
                        $div.children('p').css('display', 'none').html($message);
                        $div.children('p').fadeIn($fade_time);
                    }
                } else {
                    $div.children('p').remove();
                }
            }
            if ($div.children('input').attr('validation') == 'phone') {
                var $regex = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;
                var $value = $div.children('input').val();
                var $numbers = $value.split("").length;
                if (10 <= $numbers && $numbers <= 20 && $regex.test($value)) {
                    $div.children('p').remove();
                } else {
                    $error = true;
                    if ($div.children('input').attr('message')) $message = $div.children('input').attr('message');
                    if ($div.children('p').length == 0) {
                        $div.append('<p style="display:none;">' + $message + '</p>');
                        $div.children('p').fadeIn($fade_time);
                    } else {
                        $div.children('p').css('display', 'none').html($message);
                        $div.children('p').fadeIn($fade_time);
                    }
                }
            }
            if ($div.children('input').attr('validation') == 'captcha') {
                if ($div.children('input').val() != $answer) {
                    $error = true;
                    if ($div.children('input').attr('message')) $message = $div.children('input').attr('message');
                    if ($div.children('p').length == 0) {
                        $div.append('<p style="display:none;">' + $message + '</p>');
                        $div.children('p').fadeIn($fade_time);

                    } else {
                        $div.children('p').css('display', 'none').html($message);
                        $div.children('p').fadeIn($fade_time);
                    }
                } else {
                    $div.children('p').remove();
                }
            }
            if ($div.children('input').length != 0) {
                var $name = $div.children('input').attr('name');
                var $value = $div.children('input').val();
            }
            if ($div.children('select').length != 0) {
                var $name = $div.children('select').attr('name');
                var $value = $div.children('select').val();
            }
            if ($div.children('textarea').length != 0) {
                var $name = $div.children('textarea').attr('name');
                var $value = $div.children('textarea').val();
            }
            if ($name) {
                $data.push({
                    'title': $name,
                    'value': $value
                });
            }
        });
        if ($error == false) {
            var $ul = $form.children('ul');
            var $li = $ul.children('li');
            var $div = $li.children('div');
            var $type = $div.children('select[name="type"]').val();
            var $theme = $div.children('select[name="theme"]').val();
            var $captcha = $div.children('select[name="captcha"]').val();
            var $fade = $div.children('select[name="fade"]').val();
            var $duration = $div.children('input[name="duration"]').val();
            var $receiver = $div.children('input[name="receiver"]').val();
            var $subject = $div.children('input[name="subject"]').val();
            var $thanks_title = $div.children('input[name="thanks_title"]').val(); //Thank you title after submitting the form
            var $thanks_message = $div.children('input[name="thanks_message"]').val(); //Thank you message after submitting the form
            var $button = $div.children('input[name="button"]').val();

            if ($type == 'contact') {
                var $html = '<div class="form ' + $theme + ' contact_form">';
                $html += '\n\t<h1>Contact form:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Name:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Name" message="Your name is empty." validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Email:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Email address" message="Email address is incorrect." validation="email" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Question:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<textarea name="Question" message="You did not enter any question." validation="empty"></textarea>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
				$html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
            }
            if ($type == 'call') {
                var $html = '<div class="form ' + $theme + ' call_form">';
                $html += '\n\t<h1>Call me back form:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Phone:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Phone number" message="Your phone number is not valid." validation="phone" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
				$html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
            }
            if ($type == 'subscribe') {
                var $html = '<div class="form ' + $theme + ' subscribe_form">';
                $html += '\n\t<h1>Subscribtion form:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Email:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Email address" message="Your email address is not valid." validation="email" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
				$html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
            }
            if ($type == 'survey') {
                var $html = '<div class="form ' + $theme + ' survey_form">';
                $html += '\n\t<h1>Survey form:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Do you love this form generator?</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Yes" />Yes</label><br />';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="No" />No</label>';
                $html += '\n\t\t\t\t<input type="hidden" name="Loves it" value="" message="You forgot this question!" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Are you willing to buy it?</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question2" value="Yes" />Yes</label><br />';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question2" value="Maybe" />Maybe</label><br />';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question2" value="No" />No</label>';
                $html += '\n\t\t\t\t<input type="hidden" name="Wants to buy" value="" message="You forgot this question!" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>If you do not buy it please let us know why:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<textarea name="Why not"></textarea>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
				$html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
            }
            if ($type == 'vote') {
                var $html = '<div class="form ' + $theme + ' vote_form">';
                $html += '\n\t<h1>Vote / Poll form:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Vote for your favorite music:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Alternative Music" />Alternative Music</label><br />';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Blues" />Blues</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Classical Music" />Classical Music</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Country Music" />Country Music</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Dance Music" />Dance Music</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Easy Listening" />Easy Listening</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Electronic Music" />Electronic Music</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Hip Hop / Rap" />Hip Hop / Rap</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Electronic" />Electronic</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Indie Pop" />Indie Pop</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Jazz" />Jazz</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Latin Music" />Latin Music</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Opera" />Opera</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Pop (Popular music)" />Pop (Popular music)</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="R&B / Soul" />R&B / Soul</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Reggae" />Reggae</label>';
                $html += '\n\t\t\t\t<label><input class="radio" type="radio" name="question1" value="Rock" />Rock</label>';
                $html += '\n\t\t\t\t<input type="hidden" name="Favorite music" value="" message="You did not select your favorit music!" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
				$html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
            }
            if ($type == 'book') {
                var $html = '<div class="form ' + $theme + ' book_form">';
                $html += '\n\t<h1>Book a room:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li class="select clear_inherit">';
                $html += '\n\t\t\t<span>Date:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="day" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Day</option>';
                $html += '\n\t\t\t\t\t<option value="01">01</option>';
                $html += '\n\t\t\t\t\t<option value="02">02</option>';
                $html += '\n\t\t\t\t\t<option value="03">03</option>';
                $html += '\n\t\t\t\t\t<option value="04">04</option>';
                $html += '\n\t\t\t\t\t<option value="05">05</option>';
                $html += '\n\t\t\t\t\t<option value="06">06</option>';
                $html += '\n\t\t\t\t\t<option value="07">07</option>';
                $html += '\n\t\t\t\t\t<option value="08">08</option>';
                $html += '\n\t\t\t\t\t<option value="09">09</option>';
                $html += '\n\t\t\t\t\t<option value="10">10</option>';
                $html += '\n\t\t\t\t\t<option value="11">11</option>';
                $html += '\n\t\t\t\t\t<option value="12">12</option>';
                $html += '\n\t\t\t\t\t<option value="13">13</option>';
                $html += '\n\t\t\t\t\t<option value="14">14</option>';
                $html += '\n\t\t\t\t\t<option value="15">15</option>';
                $html += '\n\t\t\t\t\t<option value="16">16</option>';
                $html += '\n\t\t\t\t\t<option value="17">17</option>';
                $html += '\n\t\t\t\t\t<option value="18">18</option>';
                $html += '\n\t\t\t\t\t<option value="19">19</option>';
                $html += '\n\t\t\t\t\t<option value="20">20</option>';
                $html += '\n\t\t\t\t\t<option value="21">21</option>';
                $html += '\n\t\t\t\t\t<option value="22">22</option>';
                $html += '\n\t\t\t\t\t<option value="23">23</option>';
                $html += '\n\t\t\t\t\t<option value="24">24</option>';
                $html += '\n\t\t\t\t\t<option value="25">25</option>';
                $html += '\n\t\t\t\t\t<option value="26">26</option>';
                $html += '\n\t\t\t\t\t<option value="27">27</option>';
                $html += '\n\t\t\t\t\t<option value="28">28</option>';
                $html += '\n\t\t\t\t\t<option value="29">29</option>';
                $html += '\n\t\t\t\t\t<option value="30">30</option>';
                $html += '\n\t\t\t\t\t<option value="31">31</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="select clear_inherit">';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="month" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Month</option>';
                $html += '\n\t\t\t\t\t<option value="01">January</option>';
                $html += '\n\t\t\t\t\t<option value="02">February</option>';
                $html += '\n\t\t\t\t\t<option value="03">March</option>';
                $html += '\n\t\t\t\t\t<option value="04">April</option>';
                $html += '\n\t\t\t\t\t<option value="05">May</option>';
                $html += '\n\t\t\t\t\t<option value="06">June</option>';
                $html += '\n\t\t\t\t\t<option value="07">July</option>';
                $html += '\n\t\t\t\t\t<option value="08">August</option>';
                $html += '\n\t\t\t\t\t<option value="09">September</option>';
                $html += '\n\t\t\t\t\t<option value="10">October</option>';
                $html += '\n\t\t\t\t\t<option value="11">November</option>';
                $html += '\n\t\t\t\t\t<option value="12">December</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="select clear_inherit">';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="year" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Year</option>';
                $html += '\n\t\t\t\t\t<option value="2013">2013</option>';
                $html += '\n\t\t\t\t\t<option value="2014">2014</option>';
                $html += '\n\t\t\t\t\t<option value="2015">2015</option>';
                $html += '\n\t\t\t\t\t<option value="2016">2016</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="select clear_inherit">';
                $html += '\n\t\t\t<span>Time:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="hour" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">H</option>';
                $html += '\n\t\t\t\t\t<option value="08">08</option>';
                $html += '\n\t\t\t\t\t<option value="09">09</option>';
                $html += '\n\t\t\t\t\t<option value="10">10</option>';
                $html += '\n\t\t\t\t\t<option value="11">11</option>';
                $html += '\n\t\t\t\t\t<option value="12">12</option>';
                $html += '\n\t\t\t\t\t<option value="13">13</option>';
                $html += '\n\t\t\t\t\t<option value="14">14</option>';
                $html += '\n\t\t\t\t\t<option value="15">15</option>';
                $html += '\n\t\t\t\t\t<option value="16">16</option>';
                $html += '\n\t\t\t\t\t<option value="17">17</option>';
                $html += '\n\t\t\t\t\t<option value="18">18</option>';
                $html += '\n\t\t\t\t\t<option value="19">19</option>';
                $html += '\n\t\t\t\t\t<option value="20">20</option>';
                $html += '\n\t\t\t\t\t<option value="21">21</option>';
                $html += '\n\t\t\t\t\t<option value="22">22</option>';
                $html += '\n\t\t\t\t\t<option value="23">23</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="select clear_inherit">';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="minute" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">M</option>';
                $html += '\n\t\t\t\t\t<option value="00">00</option>';
                $html += '\n\t\t\t\t\t<option value="05">05</option>';
                $html += '\n\t\t\t\t\t<option value="10">10</option>';
                $html += '\n\t\t\t\t\t<option value="15">15</option>';
                $html += '\n\t\t\t\t\t<option value="20">20</option>';
                $html += '\n\t\t\t\t\t<option value="25">25</option>';
                $html += '\n\t\t\t\t\t<option value="30">30</option>';
                $html += '\n\t\t\t\t\t<option value="35">35</option>';
                $html += '\n\t\t\t\t\t<option value="40">40</option>';
                $html += '\n\t\t\t\t\t<option value="45">45</option>';
                $html += '\n\t\t\t\t\t<option value="50">50</option>';
                $html += '\n\t\t\t\t\t<option value="55">55</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
                $html += '\n\t\t<li class="select">';
                $html += '\n\t\t\t<span>Title:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="Title" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Title</option>';
                $html += '\n\t\t\t\t\t<option value="Mr">Mr</option>';
                $html += '\n\t\t\t\t\t<option value="Mrs">Mrs</option>';
                $html += '\n\t\t\t\t\t<option value="Miss">Miss</option>';
                $html += '\n\t\t\t\t\t<option value="Dr">Dr</option>';
                $html += '\n\t\t\t\t\t<option value="Prof">Prof</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>First name:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="First name" message="You did not enter your First name." validation="empty">';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>Last name:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Last name" message="You did not enter your Last name." validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Email address:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Email address" message="Invalid email address." validation="email" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Phone number:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Phone number" message="Invalid phone number." validation="phone" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>Address line 1:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Address line 1" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>Address line 2:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Address line 2" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>City / Town:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="City / Town" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>Zipcode:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Zipcode" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Comments:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<textarea name="Comments"></textarea>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
                $html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
            }
            if($type == 'order')
			{
                var $html = '<div class="form ' + $theme + ' order_form">';
                $html += '\n\t<h1>Place an order:</h1>';
                $html += '\n\t<ul>';
                $html += '\n\t\t<li class="select">';
                $html += '\n\t\t\t<span>Credit Card:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="Credit Card" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Please Select Card</option>';
                $html += '\n\t\t\t\t\t<option value="Visa">Visa</option>';
                $html += '\n\t\t\t\t\t<option value="MasterCard">MasterCard</option>';
                $html += '\n\t\t\t\t\t<option value="Discover">Discover</option>';
                $html += '\n\t\t\t\t\t<option value="American Express">American Express</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Card number:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Card number" maxlength="13" validation="numeric" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer invisable"></li>';
                $html += '\n\t\t<li class="select clear_inherit left">';
                $html += '\n\t\t\t<span>Expiration date:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="month" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Month</option>';
                $html += '\n\t\t\t\t\t<option value="01">01</option>';
                $html += '\n\t\t\t\t\t<option value="02">02</option>';
                $html += '\n\t\t\t\t\t<option value="03">03</option>';
                $html += '\n\t\t\t\t\t<option value="04">04</option>';
                $html += '\n\t\t\t\t\t<option value="05">05</option>';
                $html += '\n\t\t\t\t\t<option value="06">06</option>';
                $html += '\n\t\t\t\t\t<option value="07">07</option>';
                $html += '\n\t\t\t\t\t<option value="08">08</option>';
                $html += '\n\t\t\t\t\t<option value="09">09</option>';
                $html += '\n\t\t\t\t\t<option value="10">10</option>';
                $html += '\n\t\t\t\t\t<option value="11">11</option>';
                $html += '\n\t\t\t\t\t<option value="12">12</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="select clear_inherit">';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<select name="year" message="!" validation="empty">';
                $html += '\n\t\t\t\t\t<option value="" selected="selected">Year</option>';
                $html += '\n\t\t\t\t\t<option value="2013">2013</option>';
                $html += '\n\t\t\t\t\t<option value="2014">2014</option>';
                $html += '\n\t\t\t\t\t<option value="2015">2015</option>';
                $html += '\n\t\t\t\t\t<option value="2016">2016</option>';
                $html += '\n\t\t\t\t\t<option value="2017">2017</option>';
                $html += '\n\t\t\t\t\t<option value="2018">2018</option>';
                $html += '\n\t\t\t\t\t<option value="2019">2019</option>';
                $html += '\n\t\t\t\t</select>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Verification number:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Verification number" maxlength="4" validation="numeric" /><i style="display:block;float:left;margin:3px 0px 0px 5px;">3 or 4 digits</i>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
				$html += '\n\t\t<li class="spacer"></li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>First name:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="First name" message="You did not enter your First name." validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="clear_inherit">';
                $html += '\n\t\t\t<span>Last name:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Last name" message="You did not enter your Last name." validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Billing address:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="Billing address" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>City:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="City" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>State:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="State" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>ZIP Code:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<input type="text" name="ZIP Code" validation="empty" />';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span>Comments:</span>';
                $html += '\n\t\t\t<div>';
                $html += '\n\t\t\t\t<textarea name="Comments"></textarea>';
                $html += '\n\t\t\t</div>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<li class="spacer"></li>';
                $html += check_for_captcha($html, $captcha);
                $html += '\n\t\t<li>';
                $html += '\n\t\t\t<span></span>';
                $html += '\n\t\t\t<button>' + $button + '</button>';
                $html += '\n\t\t</li>';
                $html += '\n\t\t<input type="hidden" name="hidden_receiver" value="' + $receiver + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_subject" value="' + $subject + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_duration" value="' + $duration + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_title" value="' + $thanks_title + '">';
                $html += '\n\t\t<input type="hidden" name="hidden_thanks_message" value="' + $thanks_message + '">';
                $html += '\n\t</ul>';
                $html += '\n</div>';
			}
            $('.form.html').children('textarea').val($html);

            $('.form.code').children('textarea').on('click', function () {
                $(this).select();
            });
        }
	}
    $('body').on('keyup', '.form input[type="text"]', function () {
        update_title($(this));
    });
    $('body').on('change', '.form input[type="text"]', function () {
        update_title($(this));
    });
	function trim($this) {
		return $this.replace(/^s*(S*(s+S+)*)s*$/, "$1");
	}
    function update_title($this) {
        var $url = $this.val().replace('>', '').replace('<', '');
        $this.val($url);
    }
});