
$(document).ready(function() {
     $.ajax({
                    url: siteUrl + 'assignToken',
                    method: 'POST',
                    data: {},
                    type: JSON,
                    success: function(response) 
                    {
                        $('meta[name="csrf-token"]').attr('content',response);
                        $('input[name=_token]').val(response);
                    }
                });
 });               
