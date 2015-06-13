$(document).ready(function()
{
	$('body').on('click','.form button',function()
	{
		var $form = $(this).parents('.form');
		if($form.children('ul').children('li').children('div').children('input[name="captcha"]').length!=0)
		{
			var $answer = $form.children('ul').children('li').children('div').children('input[name="captcha"]').attr('answer').substring(1,2);
		}
		var $data = [];
		var $error = false;
		var $fade_time = $('input[name="hidden_duration"]').val();
		$form.children('ul').children('li').each(function()
		{
			var $message = 'Field is required.';
			var $div = $(this).children('div');
			if($div.children('input').attr('validation')=='empty')
			{
				if($div.children('input').val()=='')
				{
					$error = true;
					if($div.children('input').attr('message')) $message = $div.children('input').attr('message');
					if($div.children('p').length==0)
					{
						$div.append('<p style="display:none;">'+$message+'</p>');
						$div.children('p').fadeIn($fade_time);
					}
					else
					{
						$div.children('p').css('display','none').html($message);
						$div.children('p').fadeIn($fade_time);
					}
				}
				else
				{
					$div.children('p').remove();
				}
			}
			if($div.children('textarea').attr('validation')=='empty')
			{
				if($div.children('textarea').val()=='')
				{
					$error = true;
					if($div.children('textarea').attr('message')) $message = $div.children('textarea').attr('message');
					if($div.children('p').length==0)
					{
						$div.append('<p style="display:none;">'+$message+'</p>');
						$div.children('p').fadeIn($fade_time);
					}
					else
					{
						$div.children('p').css('display','none').html($message);
						$div.children('p').fadeIn($fade_time);
					}
				}
				else
				{
					$div.children('p').remove();
				}
			}
			if($div.children('input').attr('validation')=='email')
			{
				if(($div.children('input').val().length < 4)||(!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($div.children('input').val())))
				{
					$error = true;
					if($div.children('input').attr('message')) $message = $div.children('input').attr('message');
					if($div.children('p').length==0)
					{
						$div.append('<p style="display:none;">'+$message+'</p>');
						$div.children('p').fadeIn($fade_time);
					}
					else
					{
						$div.children('p').css('display','none').html($message);
						$div.children('p').fadeIn($fade_time);
					}
				}
				else
				{
					$div.children('p').remove();
				}
			}
			if($div.children('input').attr('validation')=='numeric')
			{
				var $regex = /^\d+$/;
				var $float = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
				var $value = $div.children('input').val();
				if(!$regex.test($value) || !$float.test($value))
				{
					$error = true;
					if($div.children('input').attr('message')) $message = $div.children('input').attr('message');
					if($div.children('p').length==0)
					{
						$div.append('<p style="display:none;">'+$message+'</p>');
						$div.children('p').fadeIn($fade_time);
					}
					else
					{
						$div.children('p').css('display','none').html($message);
						$div.children('p').fadeIn($fade_time);
					}
				}
				else
				{
					$div.children('p').remove();
				}
			}
			if($div.children('input').attr('validation')=='phone')
			{
				var $regex = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;
				var $value = $div.children('input').val();
				var $numbers = $value.split("").length;
				if (10 <= $numbers && $numbers <= 20 && $regex.test($value))
				{
					$div.children('p').remove();
				}
				else
				{
					$error = true;
					if($div.children('input').attr('message')) $message = $div.children('input').attr('message');
					if($div.children('p').length==0)
					{
						$div.append('<p style="display:none;">'+$message+'</p>');
						$div.children('p').fadeIn($fade_time);
					}
					else
					{
						$div.children('p').css('display','none').html($message);
						$div.children('p').fadeIn($fade_time);
					}
				}
			}
			if($div.children('input').attr('validation')=='captcha')
			{
				if($div.children('input').val()!=$answer)
				{
					$error = true;
					if($div.children('input').attr('message')) $message = $div.children('input').attr('message');
					if($div.children('p').length==0)
					{
						$div.append('<p style="display:none;">'+$message+'</p>');
						$div.children('p').fadeIn($fade_time);
						
					}
					else
					{
						$div.children('p').css('display','none').html($message);
						$div.children('p').fadeIn($fade_time);
					}
				}
				else
				{
					$div.children('p').remove();
				}
			}
			if($div.children('input').length!=0)
			{
				var $name = $div.children('input').attr('name');
				var $value = $div.children('input').val();
			}
			if($div.children('select').length!=0)
			{
				var $name = $div.children('select').attr('name');
				var $value = $div.children('select').val();
			}
			if($div.children('textarea').length!=0)
			{
				var $name = $div.children('textarea').attr('name');
				var $value = $div.children('textarea').val();
			}
			if($name)
			{
				$data.push({'title':$name, 'value':$value});
			}
		});
		if($error==false)
		{
			var $send = '';
			if($form.hasClass('contact_form')) $send = 'send/contact.php';
			if($form.hasClass('call_form')) $send = 'send/call.php';
			if($form.hasClass('book_form')) $send = 'send/book.php';
			if($form.hasClass('subscribe_form')) $send = 'send/subscribe.php';
			if($form.hasClass('survey_form')) $send = 'send/survey.php';
			if($form.hasClass('vote_form')) $send = 'send/vote.php';
			var $duration = $('input[name="hidden_duration"]').val();
			var $receiver = $('input[name="hidden_receiver"]').val();
			var $subject = $('input[name="hidden_subject"]').val();
			var $thanks_title = $('input[name="hidden_thanks_title"]').val();
			var $thanks_message = $('input[name="hidden_thanks_message"]').val();
			$.ajax({
				url: $send,
				type: 'post',
				data: {data:$data,receiver:$receiver,subject:$subject},
				success: function(result)
				{
					$form.children('ul').fadeOut($duration,function()
					{
						$form.append('<p>'+$thanks_message+'</p>');
						$form.children('h1').css('display','none').html($thanks_title).fadeIn($duration);
						$form.children('p').css('display','none').fadeIn($duration);
					});
				},
				error: function (xhr, ajaxOptions, thrownError)
				{
					$this.html('Failed, please try again');
				}
			});
		}				
	});
});