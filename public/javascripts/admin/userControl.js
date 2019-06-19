
var form = $('#deleteUser');


form.submit = function(e){

    e.preventDefault();

    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        success: function(){
            alert("User Successfully Deleted.")
        }
    })
};