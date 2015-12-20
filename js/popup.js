const API_FORMAT_URL = 'http://sqlformat.org/api/v1/format';

var init = function(){

    $("#format").click(function() {
        format();
    });

    $("#copy").click(function() {
        copyToClipboard();
    });
};

var format = function (){

    var content = {reindent: 1, sql: $("#simpleSql").val()};

    $.ajax({
        url : API_FORMAT_URL,
        data: content,
        type: "POST",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            highlightWords(data);
            $("#copy").show();
        }
    });
};

var highlightWords = function (data){
        
    var sqlColor = replace(data.result);
    insertResult(sqlColor);
        
};

var insertResult = function(data) {

    $("#formatSql").html(data);

};

var copyToClipboard = function (){

    var clipboard = new Clipboard(document.getElementById('copy'));

    clipboard.on('success', function(e) {
        $("#copySuccess").show();
    });

    clipboard.on('error', function(e) {
        $("#copyError").show();
    });
};

var replace = function(data) {

        var reserved = [
            "add ",
            "all ",
            "alter ",
            "analyze ",
            "and ",
            "as ",
            "asc ",
            "asensitive ",
            "before ",
            "between ",
            "bigint ",
            "binary ",
            "blob ",
            "both ",
            "by ",
            "call ",
            "cascade ",
            "case ",
            "change ",
            "char ",
            "character ",
            "check ",
            "collate ",
            "column ",
            "condition ",
            "connection ",
            "constraint ",
            "continue ",
            "convert ",
            "create ",
            "cross ",
            "current_date ",
            "current_time ",
            "current_timestamp ",
            "current_user ",
            "cursor ",
            "database ",
            "databases ",
            "day_hour ",
            "day_microsecond ",
            "day_minute ",
            "day_second ",
            "dec ",
            "decimal ",
            "declare ",
            "default ",
            "delayed ",
            "delete ",
            "desc ",
            "describe ",
            "deterministic ",
            "distinct ",
            "distinctrow ",
            "div ",
            "double ",
            "drop ",
            "dual ",
            "each ",
            "else ",
            "elseif ",
            "enclosed ",
            "escaped ",
            "exists ",
            "exit ",
            "explain ",
            "false ",
            "fetch ",
            "float ",
            "for ",
            "force ",
            "foreign ",
            "from ",
            "fulltext ",
            "goto ",
            "grant ",
            "group ",
            "having ",
            "high_priority ",
            "hour_microsecond ",
            "hour_minute     ",
            "hour_second ",
            "if ",
            "ignore ",
            "in ",
            "index ",
            "infile ",
            "inner ",
            "inout ",
            "insensitive ",
            "insert ",
            "int ",
            "integer ",
            "interval ",
            "into ",
            "is ",
            "iterate ",
            "join ",
            "key ",
            "keys ",
            "kill ",
            "leading ",
            "leave ",
            "left ",
            "like ",
            "limit ",
            "lines ",
            "load ",
            "localtime ",
            "localtimestamp ",
            "lock ",
            "long ",
            "longblob ",
            "longtext ",
            "loop ",
            "low_priority ",
            "match ",
            "mediumblob ",
            "mediumint ",
            "mediumtext ",
            "middleint ",
            "minute_microsecond ",
            "minute_second ",
            "mod ",
            "modifies ",
            "natural ",
            "not ",
            "no_write_to_binlog ",
            "null ",
            "numeric ",
            "on optimize ",
            "option ",
            "optionally ",
            "or ",
            "order ",
            "out ",
            "outer ",
            "outfile ",
            "precision ",
            "primary ",
            "procedure ",
            "purge ",
            "read ",
            "reads ",
            "real ",
            "references ",
            "regexp ",
            "rename ",
            "repeat ",
            "replace ",
            "require ",
            "restrict ",
            "return ",
            "revoke ",
            "right ",
            "rlike ",
            "schema ",
            "schemas ",
            "second_microsecond ",
            "select ",
            "sensitive ",
            "separator ",
            "set ",
            "show ",
            "smallint ",
            "soname ",
            "spatia ",
            "specific ",
            "sql ",
            "sqlexception ",
            "sqlstate ",
            "sqlwarning ",
            "sql_big_result ",
            "sql_calc_found_rows ",
            "sql_small_result ",
            "ssl ",
            "starting ",
            "straight_join ",
            "table ",
            "terminated ",
            "then ",
            "tinyblob ",
            "tinyint ",
            "tinytext ",
            "to ",
            "trailing ",
            "trigger ",
            "true ",
            "undo ",
            "union ",
            "unique ",
            "unlock ",
            "unsigned ",
            "update ",
            "usage ",
            "use ",
            "using ",
            "utc_date ",
            "utc_time ",
            "utc_timestamp ",
            "values ",
            "varbinary ",
            "varchar ",
            "varcharacter ",
            "varying ",
            "when ",
            "where ",
            "while ",
            "with ",
            "write ",
            "xor ",
            "year_month ",
            "zerofil "
        ];

        var qtdReservedWord = reserved.length;

        for (i = 0; i < qtdReservedWord; i++) {
            data = data.replace(reserved[i].toUpperCase(), "<span>"+reserved[i].toUpperCase()+"</span>");
            data = data.replace(reserved[i], "<span>"+reserved[i]+"</span>");
        }

        return data;
};

$(document).ready(function() {
    $("#copy").hide();
    $("#copySuccess").hide();
    $("#copyError").hide();

    init();
});
