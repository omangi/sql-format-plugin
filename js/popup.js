var main = {
    init: function () {
        var self = this;

        $("#format").click(function() {
            var url = "http://sqlformat.org/api/v1/format";
            var content = {reindent: 1, sql: $("#simpleSql").val()};

            $.ajax({
                url : url,
                data: content,
                type: "POST",
                dataType: "json",
                crossDomain: true,
                success: function (data) {
                    self.insertResult(data);
                }
            });
        });
    },

    insertResult: function(data) {
        $("#formatSql").html(data.result);
    }
}

$(document).ready(function() {
    main.init();
});
