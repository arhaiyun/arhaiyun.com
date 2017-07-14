$(function () {
    $('.comment').click(function (e) {
        var target = $(this)
        var toId = target.data('tid')
        var commentId = target.data('cid')

        $('input[name="comment[tid]"], input[name="comment[cid]"]', $('#commentForm')).remove()

        $('<input>').attr({
            type: 'hidden',
            name: 'comment[tid]',
            value: toId
        }).appendTo('#commentForm')

        $('<input>').attr({
            type: 'hidden',
            name: 'comment[cid]',
            value: commentId
        }).appendTo('#commentForm')
    })
});