var showErrorMessage = function (error) {
    if (error.status == 400) {
        bootbox.alert('Bad request. Unable to process!');

    } else {
        if (error && error.data && error.data.details && error.data.details[0]) 
            bootbox.alert(error.data.details[0]
                ? error.data.details[0]
                : 'Something went wrong with server!');
        else 
            bootbox.alert('Something went wrong with server!');
        }
    }
