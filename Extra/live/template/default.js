$(document).ready(function () {
    $('input[name="captcha"]').each(function () {
        $random_1 = Math.ceil(Math.random() * 5);
        $random_2 = Math.ceil(Math.random() * 4);
        $random_3 = Math.ceil(Math.random() * 5);
        $random_4 = Math.ceil(Math.random() * 4);
        $answer = $random_1 + $random_2;
        $(this).attr('answer', $random_3 + '' + $answer + '' + $random_4);
        $(this).parents('li').children('span').html($random_1 + ' + ' + $random_2);
    });
    $('select[name="type"]').on('change', function () {
        $('#location').text($(this).val());
    });
    $('input[type="radio"]').on('click', function () {
        $(this).parent('label').parent('div').children('input[type="hidden"]').val($(this).val());
    });
});