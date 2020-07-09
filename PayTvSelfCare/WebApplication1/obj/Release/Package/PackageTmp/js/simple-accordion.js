(function () {
    //STYLE ONE AND TWO
    var dd = $('dd');
    dd.filter(':nth-child(n+4)').hide();
    $('dl.accordion').on('click', 'dt', function () {
        $(this)
            .addClass('active')
            .siblings('dt')
            .removeClass('active');

        $(this)
            .next()
            .slideDown(200)
            .siblings('dd')
            .slideUp(300);
    });

    //STYLE THREE AND FOUR
    $('dl.accordion.style3, dl.accordion.style4').on('mouseenter', 'dt', function () {
        $(this)
            .addClass('active')
            .siblings('dt')
            .removeClass('active');

        $(this)
            .next()
            .slideDown(100)
            .siblings('dd')
            .slideUp(200);
    });
})();